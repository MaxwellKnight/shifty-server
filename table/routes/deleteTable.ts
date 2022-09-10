import express from 'express'

const deleteTableRouter = express.Router()

deleteTableRouter.delete('/:id', (req, res) => {
    res.send(`<h1>Table with id: ${req.params.id}, was deleted</h1>`)
})

export default deleteTableRouter