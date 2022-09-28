import { IBaseShift } from "../../interfaces/IShift"
import { createError } from "../../utils/error"
import { getAllTables, getCurrentTable } from "../repo/table"
import createTable from "../services/table"

export const getAllTablesController = async (req: any, res: any, next: any) => {
    try {
        const tables: any[] | undefined = await getAllTables()
        res.status(200).send(tables)
    } catch (e) {
        console.log(e)
        return next(createError())
    }
}

export const getCurrentTableController = async (req: any, res: any, next: any) => {
    try {
        const table = await getCurrentTable()
        res.status(200).send(table)
    } catch (err) {
        console.log(err)
        return next(createError())

    }
}

export const createTableController = async (req: any, res: any, next: any) => {
    try {
        const table: Map<String, IBaseShift[]> = await createTable()
        res.status(200).send(table)
    } catch (err) {
        console.log(err)
        return next(createError())
    }
}

export const getTableByIdController = (req: any, res: any) => {
    res.send(`<h1>Table with id: ${req.params.id}</h1>`)
}

export const deleteTableByIdController = (req: any, res: any) => {
    res.send(`<h1>Table with id: ${req.params.id}, was deleted</h1>`)
}
