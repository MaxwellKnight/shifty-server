import mongoose from 'mongoose'
import { IBaseAgent } from "../interfaces/IBaseAgent"
import { IConstraints } from '../interfaces/IConstraints'
import constants from './../constants/index'
import { IDailyConstraints } from './Shift'
const { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } = constants.weekDays

const ObjectIdType = mongoose.Schema.Types.ObjectId

const ConstraintsSchema = new mongoose.Schema<IConstraints>({
    agentId: { type: String, required: true },
    tableId: { type: String, required: true },
    constraints: { type: Map<string, IDailyConstraints>, required: true },
})

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
        type: Map,
        default: new Map([
            [SUNDAY, { morning: true, noon: true, night: true, notes: '' }],
            [MONDAY, { morning: true, noon: true, night: true, notes: '' }],
            [TUESDAY, { morning: true, noon: true, night: true, notes: '' }],
            [WEDNESDAY, { morning: true, noon: true, night: true, notes: '' }],
            [THURSDAY, { morning: true, noon: true, night: true, notes: '' }],
            [FRIDAY, { morning: true, noon: true, night: true, notes: '' }],
            [SATURDAY, { morning: true, noon: true, night: true, notes: '' }],
        ])
    },
    weeklyShifts: {
        type: Map,
        default: new Map([
            [SUNDAY, { morning: false, noon: false, night: false, notes: '' }],
            [MONDAY, { morning: false, noon: false, night: false, notes: '' }],
            [TUESDAY, { morning: false, noon: false, night: false, notes: '' }],
            [WEDNESDAY, { morning: false, noon: false, night: false, notes: '' }],
            [THURSDAY, { morning: false, noon: false, night: false, notes: '' }],
            [FRIDAY, { morning: false, noon: false, night: false, notes: '' }],
            [SATURDAY, { morning: false, noon: false, night: false, notes: '' }],
        ])
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
const Constraints = mongoose.model('Constraints', ConstraintsSchema)

export { BaseAgentSchema, Agent, Constraints, ConstraintsSchema }