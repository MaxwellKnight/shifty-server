require('dotenv').config()
import express from 'express'
import setHeaders from './middleware/set-headers'
import { agentRouter, loginRouter, registerRouter, shiftsRouter, tableRouter } from './api'
import connectDB from './config/mongoose'
const cors = require('cors')


const app = express()
const port = process.env.PORT || 8000



app.use(cors())
app.use(setHeaders)
app.use(express.json())
app.use('/agents', agentRouter)
app.use('/shifts', shiftsRouter)
app.use('/tables', tableRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)

app.listen(port, () => {
    connectDB()
    console.log(`server listening on port ${port}...`)
})

