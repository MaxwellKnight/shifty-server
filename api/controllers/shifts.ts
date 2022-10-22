import { Response, Request, NextFunction } from 'express'
import { IBaseShift } from '../../interfaces/IShift'
import { createError } from "../../utils/error"
import { getAllShifts, getPrevShifts, getSingleShift, deleteShiftById, updateShift, createShiftRepo } from "../repo/shifts"


export const getAllShiftsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, data }: any = await getAllShifts()
        if (data) res.status(200).json(data)
        else if (error) next(createError())
    } catch (error) {
        next(createError())
    }
}

export const getAllPrevShiftsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, data } = await getPrevShifts()
        if (data) res.status(200).json(data)
        else if (error) next(createError(400))
    } catch (error) {
        next(createError())
    }
}

export const getShiftByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, data }: any = await getSingleShift(req.params.id)
        if (data) res.status(200).send(data)
        else if (error) next(createError(400))
    } catch (err) {
        next(createError())
    }
}

export const updateSingleShiftController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { error, data } = await updateShift(id, req.body)
        if (error)
            next(createError(400, 'could not update agent'))

        res.status(200).json({ data })
    } catch (error) {
        next(createError(501, JSON.stringify(error)))
    }
}

export const createShiftController = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
        try {
            const shift: IBaseShift = await createShiftRepo(req.body)
            if (shift) res.status(200).json(shift)
            else next(createError(400, 'could not create shift'))
        } catch (error) {
            console.log(error)
            next(createError(500, 'could not complete process'))
        }
    }
    else next(createError(400, 'missing properties'))
}

export const deleteShiftContoller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteShiftById(req.params.id)
        res.status(200).json({ success: true, message: 'agent deleted' })
    }
    catch (error) {
        next(createError())
    }
}