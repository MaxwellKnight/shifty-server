import mongoose from "mongoose"
import { IDailyConstraints } from "./IShift"

export interface IBaseAgent {
    _id?: mongoose.Schema.Types.ObjectId,
    teamId: number,
    name: string,
    username: string,
    isAdmin: boolean,
    isStudent: boolean,
    isMobile?: boolean
    contact: {
        phone: string,
        email: string,
        emergency?: string,
        addr?: {
            street: string,
            city: string,
            zip: string,
        }
    },
    weeklyLimit: {
        nightCount: number,
        totalCount: number,
        limit: number
    },
    weeklyConstraints?: Map<string, IDailyConstraints | undefined>,
    weeklyShifts?: Map<string, IDailyConstraints | undefined>,
    nextShift?: mongoose.Schema.Types.ObjectId,
    prevShifts?: mongoose.Schema.Types.ObjectId[],
    createdAt: Date,
    updatedAt: Date
}

export interface IAdminAgent extends IBaseAgent {
    adminRank: number
}

export interface IStudentAgent extends IBaseAgent {
    fieldOfStudy: string,
    studySchedule?: string
    isActiveStudent: boolean
}