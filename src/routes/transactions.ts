import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { checkSessionIdExist } from '../middlewares/check-session-id-exist'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    { preHandler: [checkSessionIdExist] },
    async (request, response) => {
      const transactions = await knex('transactions').select()

      return { transactions }
    },
  )

  app.get(
    '/:id',
    { preHandler: [checkSessionIdExist] },
    async (request, response) => {
      const createRequestParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = createRequestParamsSchema.parse(request.params)

      const transaction = await knex('transactions').where({ id })

      return { transaction }
    },
  )

  app.get('/summary', { preHandler: [checkSessionIdExist] }, async () => {
    const transactions = await knex('transactions').sum('amount', {
      as: 'amount',
    })

    return { transactions }
  })

  app.post('/', async (request, response) => {
    const createTransactionsSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionsSchema.parse(request.body)
    let { sessionId } = request.cookies

    if (!sessionId) {
      sessionId = randomUUID()

      response.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 60 * 24 * 7, // 7days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return response.status(201).send()
  })
}
