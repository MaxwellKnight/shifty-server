import express from 'express'
import { verifyAdmin, verifyToken } from '../../middleware/auth'
import {
    createShiftController,
    getAllPrevShiftsController,
    getAllShiftsController,
    getShiftByIdController,
    updateSingleShiftController
} from '../controllers/shifts'

const shiftsRouter = express.Router()

//GET ALL SHIFTS
shiftsRouter.get('/', verifyToken, getAllShiftsController)

//GET ALL PREV SHIFTS
shiftsRouter.get('/prev', verifyToken, getAllPrevShiftsController)

//GET SINGLE SHIFT BY ID 
shiftsRouter.get('/:id', verifyToken, getShiftByIdController)

//UPDATE SINGLE SHIFT
shiftsRouter.patch('/:id', verifyToken, verifyAdmin, updateSingleShiftController)

//CREATE SHIFT
shiftsRouter.post('/', verifyToken, verifyAdmin, createShiftController)

export default shiftsRouter