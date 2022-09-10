import express from 'express'

const getShifts = express.Router()

getShifts.get('/', (req, res) => {
    res.send('<h1>All Shifts</h1>')
})

getShifts.get('/:id', (req, res) => {
    res.send(`<h1>Shift: ${req.params.id}</h1>`)
})

getShifts.get('/edit/:id', (req, res) => {
    res.send(`<h1>Edit page for shift: ${req.params.id}</h1>`)
})


export default getShifts