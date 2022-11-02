import { IBaseAgent } from "../../interfaces/IBaseAgent"
import { IDateRange } from "../../interfaces/IDateRange"
import { Agent } from "../../models/Agent"
import { DateRange } from "../../models/Date"
import { formattedDate, getDatesArray } from "../../utils"
import { getAllAgents } from "./agents"


const createDateRange = async (dateRange: IDateRange) => {
    const datesArray = getDatesArray(dateRange.startDate, dateRange.endDate)
    const constraintsMap = new Map<string, {}>()
    for (const date of datesArray) {
        constraintsMap.set(formattedDate(date), { morning: true, noon: true, night: true })
    }
    try {
        const newDate: IDateRange = await DateRange.create(dateRange)
        const agents: IBaseAgent[] | undefined = await getAllAgents()
        if (agents) {
            for (const agent of agents) {
                Promise.all(agents!.map(async (agent: IBaseAgent) => {
                    try {
                        await Agent.findByIdAndUpdate(agent?._id, { weeklyShifts: agent.weeklyShifts, weeklyLimit: agent.weeklyLimit, weeklyConstraints: constraintsMap })
                    } catch (error) {
                        console.log(error)
                    }
                }))
            }
        }
        if (newDate) return newDate
    } catch (error) {
        console.log(error)
        return
    }
}

const getAllDates = async () => {
    try {
        const dates: IDateRange[] = await DateRange.find()
        return dates
    }
    catch (e) {
        console.log(e)
    }
}

export { createDateRange, getAllDates }