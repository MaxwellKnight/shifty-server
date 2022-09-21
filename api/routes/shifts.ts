import express from 'express'
import { IBaseShift } from '../../interfaces/IShift'
import { getAllShifts, getPrevShifts, getSingleShift } from '../repo/shifts'

const shiftsRouter = express.Router()

//get all shifts
shiftsRouter.get('/', async (req, res) => {
    try {
        const shifts: IBaseShift[] | undefined = await getAllShifts()
        if (shifts) res.status(200).send(shifts)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})
shiftsRouter.get('/prev', async (req, res) => {
    try {
        const shifts = await getPrevShifts()
        if (shifts) res.status(200).send(shifts)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

//get single shift
shiftsRouter.get('/:id', async (req, res) => {
    try {
        const shift = await getSingleShift(req.params.id)
        if (shift) res.status(200).send(shift)
        else res.status(404).send('Could not find shift')
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

//update shift
shiftsRouter.patch('/:id', (req, res) => {
    res.send(`<h1>Edit page for shift: ${req.params.id}</h1>`)
})

//create shift
shiftsRouter.post('/', (req, res) => {
    res.send(`post route`)
})

export default shiftsRouter