import { IBaseShift } from "../../interfaces/IShift"
import { createError } from "../../utils/error"
import { getAllShifts, getPrevShifts, getSingleShift } from "../repo/shifts"


export const getAllShiftsController = async (req: any, res: any, next: any) => {
    try {
        const shifts: IBaseShift[] | undefined = await getAllShifts()
        if (shifts) res.status(200).json(shifts)
    } catch (error) {
        next(createError())
    }
}

export const getAllPrevShiftsController = async (req: any, res: any, next: any) => {
    try {
        const shifts = await getPrevShifts()
        if (shifts) res.status(200).json(shifts)
    } catch (error) {
        next(createError())
    }
}

export const getShiftByIdController = async (req: any, res: any, next: any) => {
    try {
        const shift = await getSingleShift(req.params.id)
        if (shift) res.status(200).send(shift)
        else res.status(404).json({ error: 'could not find shift', messgae: 'Not found' })
    } catch (err) {
        next(createError())
    }
}

export const updateSingleShiftController = (req: any, res: any) => {
    res.send(`<h1>Edit page for shift: ${req.params.id}</h1>`)
}

export const createShiftController = (req: any, res: any) => {
    res.send(`post route`)
}