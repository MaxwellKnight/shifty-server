import express from 'express'
import createTableRouter from './routes/createTable'
import deleteTableRouter from './routes/deleteTable'
import getTableRouter from './routes/getTable'

const tableRootRouter = express.Router()

tableRootRouter.use('/', getTableRouter)
tableRootRouter.use('/new', createTableRouter)
tableRootRouter.use('/delete', deleteTableRouter)

export default tableRootRouter

