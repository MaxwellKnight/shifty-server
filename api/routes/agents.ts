import {
    createAgentController,
    deleteAgentByIdController,
    getAgentByIdController,
    getAgentsController,
    updateAgentController,
    updateAllAgentsController
} from '../controllers/agents'
import express from 'express'
const agentRouter = express.Router()


//GET ALL AGENTS
agentRouter.get('/', getAgentsController)

//GET ONE AGENT BY ID
agentRouter.get('/:id', getAgentByIdController)

//UPDATE SIGNLE AGENT
agentRouter.patch('/:id', updateAgentController)

//UPDATE ALL AGENTS
agentRouter.patch('/all', updateAllAgentsController)

//CREATE AGENT
agentRouter.post('/', createAgentController)

//DELETE SINGLE AGENT
agentRouter.delete('/:id', deleteAgentByIdController)

export default agentRouter