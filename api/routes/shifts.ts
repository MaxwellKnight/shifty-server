import express from 'express'
import {
    createShiftController,
    getAllPrevShiftsController,
    getAllShiftsController,
    getShiftByIdController,
    updateSingleShiftController
} from '../controllers/shifts'

const shiftsRouter = express.Router()

//GET ALL SHIFTS
shiftsRouter.get('/', getAllShiftsController)

//GET ALL PREV SHIFTS
shiftsRouter.get('/prev', getAllPrevShiftsController)

//GET SINGLE SHIFT BY ID 
shiftsRouter.get('/:id', getShiftByIdController)

//UPDATE SINGLE SHIFT
shiftsRouter.patch('/:id', updateSingleShiftController)

//CREATE SHIFT
shiftsRouter.post('/', createShiftController)

export default shiftsRouter