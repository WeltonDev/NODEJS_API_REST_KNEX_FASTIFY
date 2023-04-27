import { beforeEach, afterAll, beforeAll, describe, expect, it } from 'vitest'
import supertest from 'supertest'
import { app } from '../app'
import { execSync } from 'node:child_process'

describe('Transactions tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })

  it.skip('O usuário deverá conseguir criar uma transação', async () => {
    const response = await supertest(app.server).post('/').send({
      title: 'New Transaction Test',
      amount: 30000,
      type: 'credit',
    })

    expect(response.status).toEqual(201)
  })

  it('O usuário deverá conseguir listar todas as transações', async () => {
    const response = await supertest(app.server).post('/').send({
      title: 'New Transaction',
      amount: 30000,
      type: 'credit',
    })

    const cookie = response.get('Set-Cookie')

    const listTransactions = await supertest(app.server)
      .get('/')
      .set('Cookie', cookie)

    expect(listTransactions.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 30000,
      }),
    ])
  })
})
