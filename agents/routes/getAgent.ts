import express from 'express'
import { IBaseAgent } from '../../interfaces/IBaseAgent'
import { getAgentById, getAllAgents } from '../repo/getAgents'
const getAgent = express.Router()


getAgent.get('/', async (req, res) => {
    try {
        const agents: IBaseAgent[] | undefined = await getAllAgents()
        res.send(agents)
    } catch (e) {
        console.log(e)
    }
})

getAgent.get('/:id', async (req, res) => {
    const agent: IBaseAgent | null | undefined = await getAgentById(req.params.id)
    if (agent) res.send(agent)
    else res.send('could not find agent')
})

getAgent.get('/edit/:id', (req, res) => {
    res.send(`<h1>Edit for agent: ${req.params.id}</h1>`)
})



export default getAgent