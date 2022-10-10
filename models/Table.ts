import mongoose from 'mongoose'
import { IBaseShift } from '../interfaces/IShift'

const tableSchema = new mongoose.Schema({
    table: { type: Map<String, IBaseShift[]>, required: true },
    startDate: { type: Date, required: true, default: () => new Date() },
    endDate: { type: Date, required: true, default: () => new Date() }
})

const Table = mongoose.model('Table', tableSchema)

export { tableSchema, Table }

