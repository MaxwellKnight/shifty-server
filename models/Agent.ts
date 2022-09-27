import { triggerAsyncId } from 'async_hooks'
import mongoose from 'mongoose'
import { IBaseAgent } from "../interfaces/IBaseAgent"

const ObjectIdType = mongoose.Schema.Types.ObjectId

const BaseAgentSchema = new mongoose.Schema<IBaseAgent>({
    teamId: { type: Number, required: true },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, "name cannot be more than 20 characters"]
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: false,
        default: 'agent'
    },
    isStudent: { type: Boolean, required: true },
    isMobile: { type: Boolean, required: true },
    contact: {
        phone: { type: String, required: true },
        email: { type: String, required: true, lowercase: true },
        emergency: { type: String, required: false },
        addr: {
            street: { type: String, required: false },
            city: { type: String, required: false },
            zip: { type: Number, required: false }
        }
    },
    weeklyLimit: {
        nightCount: { type: Number, required: true },
        totalCount: { type: Number, reqiured: true },
        limit: { type: Number, reqiured: true }
    },
    weeklyConstraints: {
        type: Map
    },
    weeklyShifts: {
        type: Map
    },
    nextShift: {
        type: ObjectIdType,
        required: false,
        default: undefined
    },
    prevShifts: [{ type: ObjectIdType, required: false, ref: 'Shift', default: [] }],
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})


const Agent = mongoose.model('Agent', BaseAgentSchema)

export { BaseAgentSchema, Agent }