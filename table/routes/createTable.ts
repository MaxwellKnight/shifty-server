import express from 'express'
import { IBaseShift } from '../../interfaces/IShift'
import createTable from '../services/createTable'

const createTableRouter = express.Router()

createTableRouter.post('/', async (req, res) => {
    try {
        const table = await createTable()
        const finalTable: IBaseShift[] = []
        let printable: any = []

        for (const [key, value] of table[0]) {
            printable = value.map((val) => {
                const toPrint = {
                    name: val.facility,
                    type: val.type,
                    limit: val.limit,
                    isFull: val.isFull,
                    length: val.length,
                    agents: val.agents?.map(ag => ag.toLocaleLowerCase)
                }
                printable.push(toPrint)
                finalTable.push(val)
                return toPrint
            })
            console.log(`DAY OF WEEK: ${key}`)
            console.table(printable)
        }
        res.send(finalTable)
    } catch (err) {
        console.log(err)
    }
})

export default createTableRouter