import {
    deleteAgentByIdController,
    getAgentByIdController,
    getAgentsController,
    updateAgentController,
    updateAllAgentsController
} from '../controllers/agents'
import express from 'express'
import { verifyAdmin, verifyAgent, verifyToken } from '../../middleware/auth'

const agentRouter = express.Router()

//GET ALL AGENTS
agentRouter.get('/', verifyToken, getAgentsController)

//GET ONE AGENT BY ID
agentRouter.get('/:id', verifyToken, getAgentByIdController)

//UPDATE SIGNLE AGENT
agentRouter.patch('/:id', verifyToken, verifyAgent, updateAgentController)

//UPDATE ALL AGENTS
agentRouter.patch('/all', verifyToken, verifyAdmin, updateAllAgentsController)


//DELETE SINGLE AGENT
agentRouter.delete('/:id', verifyToken, verifyAgent, verifyAdmin, deleteAgentByIdController)

export default agentRouter