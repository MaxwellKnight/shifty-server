import mongoose from "mongoose"
import { IBaseShift, IDailyConstraints } from "../interfaces/IShift"


const BaseShiftSchema = new mongoose.Schema<IBaseShift>({
    title: { type: String, required: true },
    facility: { type: String, required: true },
    type: { type: String, required: true },
    limit: { type: Number, required: true },
    agents: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Agent' }],
    date: { type: Date, required: true },
    length: { type: Number, required: true },
    isFull: { type: Boolean, required: true },
    timeLoss: { type: Number, required: false },
    isFoodSupplied: { type: Boolean, required: false },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
})

const DailyConstraintsSchema = new mongoose.Schema<IDailyConstraints>({
    morning: { type: Boolean, required: true },
    noon: { type: Boolean, required: true },
    night: { type: Boolean, required: true },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

const PrevShiftSchema = new mongoose.Schema({
    title: { type: String, required: true },
    facility: { type: String, required: true },
    type: { type: String, required: true },
    limit: { type: Number, required: true },
    agents: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Agent' }],
    date: { type: Date, required: true },
    length: { type: Number, required: true },
    isFull: { type: Boolean, required: true },
    timeLoss: { type: Number, required: false },
    isFoodSupplied: { type: Boolean, required: false },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
})

const Shift = mongoose.model('Shift', BaseShiftSchema)
const PrevShift = mongoose.model('PrevShift', BaseShiftSchema)

export { IDailyConstraints, BaseShiftSchema, DailyConstraintsSchema, Shift, PrevShift }