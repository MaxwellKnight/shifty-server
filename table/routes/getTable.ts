import express from 'express'

const getTableRouter = express.Router()

getTableRouter.get('/', (req, res) => {
    res.send('<h1>All Tables</h1>')
})

getTableRouter.get('/:id', (req, res) => {
    res.send(`<h1>Table with id: ${req.params.id}</h1>`)
})

export default getTableRouter