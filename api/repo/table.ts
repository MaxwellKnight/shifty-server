import { IBaseAgent } from "../../interfaces/IBaseAgent"
import { Table } from "../../models/Table"

const getAllTables = async () => {
    try {
        const tables: any = await Table.find()
        return tables
    }
    catch (e) {
        console.log(e)
    }
}

const getCurrentTable = async () => {
    try {
        const table: any = await Table.find()
        const ftable: any = table[table.length - 1]
        return ftable
    } catch (err) {
        console.log(err)
        return err
    }
}

export { getAllTables, getCurrentTable }