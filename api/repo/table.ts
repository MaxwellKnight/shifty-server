import { IBaseAgent } from "../../interfaces/IBaseAgent"
import { Table } from "../../models/Table"

export const getAllTables = async () => {
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
export const createTableRepo = async (table: any) => {
    try {
        const newTable: any = await Table.create(table)
        return (newTable)
    } catch (err) {
        return err
    }
}

export const getCurrentTable = async () => {
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

export const getTableById = async (id: string) => {
    try {
        const table: any = await Table.findOne({ _id: id })
        if (table) {
            return { data: table }
        }
        else return { error: 'could not complete process' }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteTableById = async (id: string) => {
    try {
        await Table.findByIdAndDelete(id)
    } catch (e: any) {
        console.log(e)
    }
}