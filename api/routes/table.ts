import express from 'express'
import { IBaseShift } from '../../interfaces/IShift'
import createTable from '../services/table'

const tableRouter = express.Router()

tableRouter.get('/', (req, res) => {
    res.send('<h1>All Tables</h1>')
})

tableRouter.get('/new', async (req, res) => {
    try {
        const table: Map<String, IBaseShift[]> = await createTable()
        res.status(200).send(Array.from(table))
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

tableRouter.get('/:id', (req, res) => {
    res.send(`<h1>Table with id: ${req.params.id}</h1>`)
})


tableRouter.delete('/:id', (req, res) => {
    res.send(`<h1>Table with id: ${req.params.id}, was deleted</h1>`)
})



export default tableRouter