import { IBaseShift } from "../../interfaces/IShift"
import { createError } from "../../utils/error"
import { getAllShifts, getPrevShifts, getSingleShift } from "../repo/shifts"


export const getAllShiftsController = async (req: any, res: any, next: any) => {
    try {
        const { error, data }: any = await getAllShifts()
        if (data) res.status(200).json(data)
        else if (error) next(createError())
    } catch (error) {
        next(createError())
    }
}

export const getAllPrevShiftsController = async (req: any, res: any, next: any) => {
    try {
        const { error, data } = await getPrevShifts()
        if (data) res.status(200).json(data)
        else if (error) next(createError(400))
    } catch (error) {
        next(createError())
    }
}

export const getShiftByIdController = async (req: any, res: any, next: any) => {
    try {
        const { error, data }: any = await getSingleShift(req.params.id)
        if (data) res.status(200).send(data)
        else if (error) next(createError(400))
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