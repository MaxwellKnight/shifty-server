import express from 'express'
import getShifts from './routes/getShifts'

const shiftRootRouter = express.Router()

shiftRootRouter.use('/', getShifts)

export default shiftRootRouter