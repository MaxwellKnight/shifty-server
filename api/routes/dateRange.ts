import express from 'express'
import { createDatesController, deleteDatesController, getDatesController } from '../controllers/dateRange'
import { verifyAdmin, verifyAgent, verifyToken } from '../../middleware/auth'

const dateRange = express.Router()

//GET DATES
dateRange.get('/', verifyToken, getDatesController)

//CREATE DATE
dateRange.post('/', verifyToken, verifyAdmin, createDatesController)

//DELETE DATE
dateRange.delete('/', verifyToken, verifyAdmin, deleteDatesController)

export default dateRange