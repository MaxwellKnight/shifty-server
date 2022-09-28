require('dotenv').config()
import express from 'express'
import cookie from 'cookie-parser'
import setHeaders from './middleware/setHeaders'
import { agentRouter, authRouter, shiftsRouter, tableRouter } from './api'
import connectDB from './config/mongoose'
import errorHandler from './middleware/errorHandler'
const cors = require('cors')


const app = express()
const port = process.env.PORT || 8000



app.use(cors())
app.use(setHeaders)
app.use(cookie())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/agents', agentRouter)
app.use('/shifts', shiftsRouter)
app.use('/tables', tableRouter)
app.use(errorHandler)

app.listen(port, () => {
    connectDB()
    console.log(`server listening on port ${port}`)
})

