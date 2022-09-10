import express from 'express'

const updateAgentRouter = express.Router()

updateAgentRouter.put('/', (req, res) => {
    res.send(`<h1>Updated Agent</h1>`)
})

export default updateAgentRouter