import express from 'express'
import getAgent from './routes/getAgent'
import updateAgentRouter from './routes/updateAgent'
import deleteAgentRouter from './routes/deleteAgent'
import createAgentRouter from './routes/createAgent'

const agentRootRouter = express.Router()

agentRootRouter.use('/', getAgent)
agentRootRouter.use('/new', createAgentRouter)
agentRootRouter.use('/update', updateAgentRouter)
agentRootRouter.use('/delete', deleteAgentRouter)

export default agentRootRouter