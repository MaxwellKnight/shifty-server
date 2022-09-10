require('dotenv').config()
import express from 'express'
import setHeaders from './middleware/set-headers';
const cors = require('cors');


const app = express()
const port = process.env.PORT || 8000

import agentRootRouter from './agents'
import shiftsRootRouter from './shifts'
import tableRootRouter from './table'

app.use(cors())
app.use(setHeaders)
app.use(express.json())
app.use('/agents', agentRootRouter)
app.use('/shifts', shiftsRootRouter)
app.use('/table', tableRootRouter)

app.listen(port, () => {
    console.log(`server listening on port ${port}...`)
})

