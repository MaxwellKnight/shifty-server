import express from 'express'

const shiftsRouter = express.Router()

shiftsRouter.get('/', (req, res) => {
    res.send('<h1>All Shifts</h1>')
})

shiftsRouter.get('/:id', (req, res) => {
    res.send(`<h1>Shift: ${req.params.id}</h1>`)
})

shiftsRouter.get('/edit/:id', (req, res) => {
    res.send(`<h1>Edit page for shift: ${req.params.id}</h1>`)
})


export default shiftsRouter