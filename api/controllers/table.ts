import { Request, Response, NextFunction } from "express"
import { nextTick } from "process"
import { IBaseShift } from "../../interfaces/IShift"
import { daysCount } from "../../utils"
import { createError } from "../../utils/error"
import { getAllTables, getCurrentTable, getTableById, deleteTableById } from "../repo/table"
import createTable from "../services/table"



export const getAllTablesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, data } = await getAllTables()
        if (data) res.status(200).send(data)
        else if (error) next(createError(400, 'could not complete process'))
    } catch (error) {
        console.log(error)
        return next(createError())
    }
}

export const getCurrentTableController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, data }: any = await getCurrentTable()
        if (data) res.status(200).send(data)
        else if (error) next(createError(400, error))
    } catch (error) {
        console.log(error)
        return next(createError())

    }
}

export const createTableController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { startDate, endDate } = req.body
        if (startDate && endDate) {
            const days = daysCount(new Date(startDate), new Date(endDate))
            if (days > 6 || days <= 0) {
                next(createError(400, 'dates need to be in 7 days range'))
            }
            else {
                const table: Map<String, IBaseShift[]> = await createTable(req.body.startDate, req.body.endDate)
                if (table)
                    res.status(200).json(table)
                else next(createError(400, 'could not create table'))
            }
        }
        else
            next(createError(400, 'missing start or end date'))
    } catch (error) {
        console.log(error)
        return next(createError())
    }
}

export const getTableByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, data }: any = await getTableById(req.params.id)
        if (data) {
            res.status(200).json(data)
        }
        else if
            (error) next(createError(404, 'Not found'))
        else
            next(error)
    } catch (error) {
        next(createError())
    }
}

export const deleteTableByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const res: any = await deleteTableById(req.params.id)
        console.log(res)
        res.status(200).json(res)
    }
    catch (error) {
        next(createError())
    }
}

export const confirmTableController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { isCreated }: any = await getTableById(req.body.id)
        if (isCreated) {
            res.status(201).json({ message: 'table created successfully' })
        }
    } catch (error) {
        console.log(error)
        return next(createError())
    }
}