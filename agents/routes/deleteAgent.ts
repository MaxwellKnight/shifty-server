import express from 'express'
import deleteAgentById from '../repo/deleteAgent'

const deleteAgentRouter = express.Router()

deleteAgentRouter.delete('/:id', async (req, res) => {
    try {
        await deleteAgentById(req.params.id)
        res.send('Agent Deleted')
    }
    catch (e) {
        console.log(e)
    }
})

export default deleteAgentRouter