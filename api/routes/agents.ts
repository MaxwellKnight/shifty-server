import express from 'express'
import { IBaseAgent } from '../../interfaces/IBaseAgent'
import { createAgent, deleteAgentById, getAgentById, getAllAgents } from '../repo/agents'
const agentRouter = express.Router()

agentRouter.get('/', async (req, res) => {
    try {
        const agents: IBaseAgent[] | undefined = await getAllAgents()
        res.status(200).send(agents)
    } catch (e) {
        console.log(e)
    }
})


agentRouter.get('/:id', async (req, res) => {
    const { error, data } = await getAgentById(req.params.id)
    if (data) res.status(200).send(data)
    else if (error) res.status(500).json({ error })
    else res.status(404).send('could not find agent')
})

agentRouter.patch('/', (req, res) => {
    res.send(`<h1>Updated Agent</h1>`)
})


agentRouter.patch('/all', (req, res) => {
    res.send(`<h1>Updated All Agents</h1>`)
})


agentRouter.post('/', async (req, res) => {
    try {
        const newAgent = await createAgent(req.body)
        res.send(newAgent)
    } catch (err) {
        res.send(err)
    }
})


agentRouter.delete('/:id', async (req, res) => {
    try {
        await deleteAgentById(req.params.id)
        res.send('Agent Deleted')
    }
    catch (e) {
        console.log(e)
    }
})

export default agentRouter