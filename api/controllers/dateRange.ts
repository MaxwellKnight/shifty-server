import express, { Request, Response, NextFunction } from 'express'
import { IDateRange } from '../../interfaces/IDateRange'
import { createError } from '../../utils/error'
import { createDateRange, getAllDates } from '../repo/dateRange'

const getDatesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dates: IDateRange[] | undefined = await getAllDates()
        res.status(200).send(dates)
    } catch (error) {
        next(createError(500))
    }
}

const createDatesController = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
        try {
            const date = await createDateRange(req.body)
            if (date) res.status(200).json(date)
            else next(createError(400, 'could not create date'))
        } catch (error) {
            console.log(error)
            next(createError(500, 'could not complete process'))
        }
    }
    else next(createError(400, 'missing properties'))
}

const deleteDatesController = async (req: Request, res: Response, next: NextFunction) => {

}

export { getDatesController, createDatesController, deleteDatesController }

