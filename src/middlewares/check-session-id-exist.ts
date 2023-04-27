import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExist(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { sessionId } = request.cookies

  if (!sessionId) {
    return response.status(401).send({ error: 'User not authorized!' })
  }
}
