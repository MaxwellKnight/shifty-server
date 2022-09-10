import express from 'express'

const createAgentRouter = express.Router()

createAgentRouter.post('/', (req, res) => {
    res.send('<h1>New agent created</h1>')
})

export default createAgentRouter