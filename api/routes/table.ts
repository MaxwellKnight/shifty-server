import express from 'express'
import {
    createTableController,
    deleteTableByIdController,
    getAllTablesController,
    getCurrentTableController,
    getTableByIdController
} from '../controllers/table'

const tableRouter = express.Router()

//GET ALL TABLES
tableRouter.get('/', getAllTablesController)

//GET CURRENT LAST TABLE
tableRouter.get('/new', getCurrentTableController)

//CREATE A NEW TABLE
tableRouter.post('/new', createTableController)

//GET TABLE BY ID
tableRouter.get('/:id', getTableByIdController)

//DELETE ONE TABLE
tableRouter.delete('/:id', deleteTableByIdController)



export default tableRouter