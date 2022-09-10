require('dotenv').config()
import express from 'express'
const cors = require('cors');


const app = express()
const port = process.env.PORT || 3000

import agentRootRouter from './agents'
import shiftsRootRouter from './shifts'
import tableRootRouter from './table'

app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use(express.json())
app.use('/agents', agentRootRouter)
app.use('/shifts', shiftsRootRouter)
app.use('/table', tableRootRouter)

app.listen(port, () => {
    console.log(`server listening on port ${port}...`)
})

