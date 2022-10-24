import mongoose from 'mongoose'
import { IDateRange } from '../interfaces/IDateRange'


const DateRangeSchema = new mongoose.Schema<IDateRange>({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    limit: { type: Number, required: true }
})

const DateRange = mongoose.model('DateRange', DateRangeSchema)

export { DateRange }