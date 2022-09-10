import express from 'express'
import createAgent from '../repo/createAgent'
const createAgentRouter = express.Router()

createAgentRouter.post('/', async (req, res) => {
    try {
        const newAgent = await createAgent(req.body)
        res.send(newAgent)
    } catch (err) {
        res.send(err)
    }
})

export default createAgentRouter