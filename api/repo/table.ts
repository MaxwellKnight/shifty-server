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

export { getAllTables }