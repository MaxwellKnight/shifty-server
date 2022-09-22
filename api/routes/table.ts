import { table } from 'console'
import express from 'express'
import { IBaseShift } from '../../interfaces/IShift'
import { getAllTables, getCurrentTable } from '../repo/table'
import createTable from '../services/table'

const tableRouter = express.Router()

tableRouter.get('/', async (req, res) => {
    try {
        const tables: any[] | undefined = await getAllTables()
        res.status(200).send(tables)
    } catch (e) {
        console.log(e)
    }
})

tableRouter.route('/new')
    .get(async (req, res) => {
        try {
            const table = await getCurrentTable()
            res.status(200).send(table)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    })
    .post(async (req, res) => {
        try {
            const table: Map<String, IBaseShift[]> = await createTable()
            res.status(200).send(table)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    })

tableRouter.route('/:id')
    .get((req, res) => {
        res.send(`<h1>Table with id: ${req.params.id}</h1>`)
    })
    .delete((req, res) => {
        res.send(`<h1>Table with id: ${req.params.id}, was deleted</h1>`)
    })



export default tableRouter