import express from 'express'
import { verifyToken, verifyAdmin } from '../../middleware/auth'
import {
    createTableController,
    deleteTableByIdController,
    getAllTablesController,
    getCurrentTableController,
    getTableByIdController,
    confirmTableController
} from '../controllers/table'

const tableRouter = express.Router()

//GET ALL TABLES
tableRouter.get('/', verifyToken, getAllTablesController)

//GET CURRENT LAST TABLE
tableRouter.get('/new', verifyToken, getCurrentTableController)

//CREATE A NEW TABLE
tableRouter.post('/new', verifyToken, verifyAdmin, createTableController)

//CONFIRM A NEW TABLE
tableRouter.post('/new/confirm/:id', verifyToken, verifyAdmin, confirmTableController)

//GET TABLE BY ID
tableRouter.get('/:id', verifyToken, getTableByIdController)

//DELETE ONE TABLE
tableRouter.delete('/:id', verifyToken, verifyAdmin, deleteTableByIdController)



export default tableRouter