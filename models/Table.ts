import mongoose from 'mongoose'
import { IBaseShift } from '../interfaces/IShift'

const tableSchema = new mongoose.Schema({
    table: { type: Map<String, IBaseShift[]>, required: true }
})

const Table = mongoose.model('Table', tableSchema)

export { tableSchema, Table }

