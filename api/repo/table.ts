import { IBaseAgent } from "../../interfaces/IBaseAgent"
import { Table } from "../../models/Table"

const getAllTables = async () => {
    try {
        const tables: any = await Table.find()
        if (tables) return { data: tables }
        return { error: 'could not complete process' }
    }
    catch (error) {
        console.log(error)
        return { error }
    }
}

const getCurrentTable = async () => {
    try {
        const table: any = await Table.find().sort({ _id: -1 }).limit(1)
        if (table) {
            return { data: table }
        }
        else return { error: 'could not complete process' }
    } catch (error) {
        console.log(error)
        return error
    }
}

export { getAllTables, getCurrentTable }