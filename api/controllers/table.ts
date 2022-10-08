import { IBaseShift } from "../../interfaces/IShift"
import { createError } from "../../utils/error"
import { getAllTables, getCurrentTable } from "../repo/table"
import createTable from "../services/table"

export const getAllTablesController = async (req: any, res: any, next: any) => {
    try {
        const { error, data } = await getAllTables()
        if (data) res.status(200).send(data)
        else if (error) next(createError(400, 'could not complete process'))
    } catch (error) {
        console.log(error)
        return next(createError())
    }
}

export const getCurrentTableController = async (req: any, res: any, next: any) => {
    try {
        const { error, data }: any = await getCurrentTable()
        if (data) res.status(200).send(data)
        else if (error) next(createError(400, error))
    } catch (error) {
        console.log(error)
        return next(createError())

    }
}

export const createTableController = async (req: any, res: any, next: any) => {
    try {
        const table: Map<String, IBaseShift[]> = await createTable()
        if (table) res.status(200).send(table)
        else next(createError(400, 'could not create table'))
    } catch (error) {
        console.log(error)
        return next(createError())
    }
}

export const getTableByIdController = (req: any, res: any) => {
    res.send(`<h1>Table with id: ${req.params.id}</h1>`)
}

export const deleteTableByIdController = (req: any, res: any) => {
    res.send(`<h1>Table with id: ${req.params.id}, was deleted</h1>`)
}
