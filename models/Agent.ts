import mongoose from 'mongoose'
import { IBaseAgent, IStudentAgent } from "../interfaces/IBaseAgent"
import { IDailyConstraints } from '../interfaces/IShift'

const ObjectIdType = mongoose.Schema.Types.ObjectId

const BaseAgentSchema = new mongoose.Schema<IBaseAgent>({
    teamId: { type: Number, required: true },
    name: { type: String, required: true, lowercase: true },
    username: { type: String, required: true, lowercase: true },
    isAdmin: { type: Boolean, required: true },
    isStudent: { type: Boolean, required: true },
    isMobile: { type: Boolean, required: false },
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
    weeklyConstraints: { type: Map<String, IDailyConstraints>, required: false },
    weeklyShifts: { type: Map<String, Number>, required: false },
    nextShift: { type: ObjectIdType, required: false },
    prevShifts: { type: [ObjectIdType], required: false },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

const StudentAgentSchema = new mongoose.Schema<IStudentAgent>({
    teamId: { type: Number, required: true },
    name: { type: String, required: true, lowercase: true },
    username: { type: String, required: true, lowercase: true },
    isAdmin: { type: Boolean, required: true },
    isStudent: { type: Boolean, required: true },
    isMobile: { type: Boolean, required: false },
    contact: {
        phone: { type: String, required: true },
        email: { type: String, required: true, lowercase: true },
        emergency: { type: String, required: false },
        addr: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            zip: { type: Number, required: false }
        }
    },
    weeklyConstraints: { type: Map<String, IDailyConstraints>, required: false },
    weeklyShifts: { type: Map<String, IDailyConstraints>, required: false },
    nextShift: { type: ObjectIdType, required: false },
    prevShifts: { type: [ObjectIdType], required: false },
    fieldOfStudy: { type: String, required: true },
    studySchedule: { type: String, required: false },
    isActiveStudent: { type: Boolean, requuired: false },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        required: true
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
        required: true
    }
})

const Agent = mongoose.model('Agent', BaseAgentSchema)

export { BaseAgentSchema, StudentAgentSchema, Agent }