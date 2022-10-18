import { IBaseShift, IDailyConstraints } from "../../interfaces/IShift"
import { IBaseAgent } from "../../interfaces/IBaseAgent"
import { formattedDate, getDatesArray, printTable, shuffleArray, sortByShift } from '../../utils'
import { getAllShifts, saveAllShifts } from "../repo/shifts"
import { getAllAgents, updateAllAgents } from '../repo/agents'

import constants from '../../constants/index'
import { createTableRepo } from "../repo/table"
const { MORNING, NOON, NIGHT } = constants.shiftType

/**
 * Create new arranged shift table
 * input - 
 *  Map : entity that represents the weekly shifts/work days
 *  Agents : Array of BaseAgents 
 * 
 * output - 
 *      Array : with new weekly shiftnps at indx 0 
 *     
 */
let datesArray: Date[] = []
const createTable = async (startDate: Date, endDate: Date): Promise<Map<String, IBaseShift[]>> => {

    const table = new Map<String, IBaseShift[]>()
    try {
        const agents: IBaseAgent[] | undefined = await getAllAgents()
        datesArray = getDatesArray(startDate, endDate)
        datesArray.forEach((date: Date) => {
            table.set(formattedDate(date), [])
        })
        let datesIndex: number = 0
        for (const [key, value] of table) {
            if (!value.length) {
                const { error, data: shifts }: any = await getAllShifts()
                shuffleArray(agents)

                const prevShifts = shifts?.map((shift: IBaseShift) => {
                    const day: Date = new Date(key.toString())
                    if (!shift?.isWeekendActive && (day.getDay() === 5 || day.getDay() === 6))
                        return shift
                    sortByShift(agents!)
                    const finalShift = fillShift(key, value, shift, agents!)
                    finalShift.date = new Date(datesArray[datesIndex])
                    value.push(finalShift)
                    return shift
                })
                datesIndex++
                if (datesIndex > datesArray.length - 1) datesIndex = 0
                await saveAllShifts(prevShifts)
            }

        }
        const newTable = await createTableRepo({ startDate, endDate, table })
        await updateAllAgents(agents, String(newTable._id), datesArray)
        //Arranged table and all agents
    } catch (err) {
        console.log(err)
    }
    return table
}

/** 
 * Fill the current shift with available agents
 * input - 
 *  Key : Map iteration key
 *  Shift : current shift to check agents availability
 *  Agents : Array of agents to fill the shift
 *  Agents : Array of BaseAgents 
 * 
 * output - 
 *     Final shift filled with all AVAILABLE agents
 */

const fillShift = (
    key: String, value: IBaseShift[],
    shift: IBaseShift, agents: IBaseAgent[]
): IBaseShift => {

    // Agants array iteration index
    let index: number = 0

    //while the shift is not full keep searching for agents
    while (!shift.isFull) {
        //if the shift is FULL then mark isFull to true 
        //it will exit the loop and continue to the next shift
        if (shift.agents?.length >= shift.limit) {
            shift.isFull = true
            break
        }
        else {
            const [isOnShift, updatedshift]: [boolean, IDailyConstraints | undefined] = validateCons(key, agents[index], shift)
            if (isOnShift) {
                //push new shift to the weekly shifts of the agent
                shift.agents?.push(String(agents[index]._id))
                agents[index]?.weeklyShifts?.set(String(key), updatedshift)
            }
        }
        index++
        if (index > agents.length - 1) break
    }
    // New filled shift with available agents
    return shift
}
/**
 * Validating the weekly constraints of an agent
 * input - 
 *  Key : String which describes the day of the week
 *  Agent : Object which represents the agent to validate for
 *  Shift : The shift which the function validates the agent can work
 * 
 * output - 
 *      Array : 1st index true/false if working or not
 *              2nd index is the shift the agent is working
 *     
 */
const validateCons = (key: String, agent: IBaseAgent, shift: IBaseShift): [boolean, IDailyConstraints] => {

    if (agent.weeklyShifts && (agent.weeklyLimit.totalCount < agent.weeklyLimit.limit)) {
        const workShift: IDailyConstraints | undefined = agent?.weeklyShifts?.get(String(key))
        const cons: IDailyConstraints | undefined = agent?.weeklyConstraints?.get(String(key))
        //Map which helps identifying if the agent worked the day before and which shift he worked
        const validationMap = new Map<string, string>()
        datesArray.forEach((date: Date) => {
            const yesterday = new Date(date)
            yesterday.setDate(date.getDate() - 1)
            validationMap.set(formattedDate(date), formattedDate(yesterday))
        })

        if (workShift) {
            if (shift.agents.includes(String(agent._id))) return [false, workShift]
            /**
             * If the shift we're currenly checking is a morning shift
             * than this segment checks if the user had worked the day before
             */
            if (shift.type === MORNING) {
                if (!workShift?.morning && !workShift?.noon && !workShift?.night && cons?.morning) {
                    const checkNightBefore: string | undefined = validationMap.get(String(key))
                    const toCheck: IDailyConstraints | undefined = agent.weeklyShifts!.get(String(checkNightBefore))
                    if (toCheck?.night)
                        return [false, workShift]

                    agent.weeklyLimit.totalCount++
                    workShift!.notes = shift.title.split("-")[0]
                    workShift!.morning = true
                    return [true, workShift]
                }
            }
            /**
             * If the shift we're currenly checking is a noon or a night shift
             * we need to make sure that if we assign the agent a night shift
             * wee keep track of the weekly night count 
             */
            else if (shift.type === NOON || shift.type === NIGHT) {
                if (!workShift?.morning && !workShift?.noon && !workShift?.night && cons?.noon && cons?.night) {

                    switch (shift.type) {
                        case NOON:
                            agent.weeklyLimit.totalCount++
                            workShift!.noon = true
                            workShift!.notes = shift.title.split("-")[0]
                            break
                        case NIGHT:
                            if (agent.weeklyLimit.nightCount >= 2) break
                            agent.weeklyLimit.totalCount++
                            agent.weeklyLimit.nightCount++
                            workShift!.notes = shift.title.split("-")[0]
                            workShift!.night = true
                            break
                    }
                    return [true, workShift]
                }
            }
        }

        return [false, workShift!]
    }
    return [false, { morning: false, noon: false, night: false }]
}

export default createTable




