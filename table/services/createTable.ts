import { IBaseShift, IDailyConstraints } from "../../interfaces/IShift"
import { IBaseAgent } from "../../interfaces/IBaseAgent"
import { shuffleArray, sortByShift } from '../../utils'
import constants from '../../constants/index'
import { getShifts } from "../../shifts/repo/getShifts"
import { getAllAgents } from '../../agents/repo/getAgents'
const { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } = constants.weekDays
const { MORNING, NOON, NIGHT } = constants.shiftType

/**
 * Create new arranged shift table
 * input - 
 *  Map : entity that represents the weekly shifts/work days
 *  Agents : Array of BaseAgents 
 * 
 * output - 
 *      Array : with new weekly shifts at indx 0 
 *      Agents array of the team
 */
const createTable = async (): Promise<[Map<String, IBaseShift[]>, IBaseAgent[]]> => {


    const agents: IBaseAgent[] | undefined = await getAllAgents()
    const Table = new Map<String, IBaseShift[]>([
        [SUNDAY, []],
        [MONDAY, []],
        [TUESDAY, []],
        [WEDNESDAY, []],
        [THURSDAY, []],
        [FRIDAY, []],
        [SATURDAY, []],
    ])

    for (const [key, value] of Table) {
        if (!value.length) {
            const Shifts: IBaseShift[] | undefined = await getShifts()
            shuffleArray(agents)

            Shifts?.map((shift, i) => {
                sortByShift(agents!)
                const finalShift = fillShift(key, value, shift, agents!)
                value.push(finalShift)
            })
        }
    }
    //Arranged table and all agents
    return [Table, agents!]
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
        //checks that the we are not iterating through undefined agents
        const cons: IDailyConstraints | undefined = agents[index]?.weeklyConstraints?.get(String(key))
        //if the shift is FULL then mark isFull to true 
        //it will exit the loop and continue to the next shift
        if (shift.agents?.length === shift.limit) {
            shift.isFull = true
        }
        else {
            const [isOnShift, updatedshift]: [boolean, IDailyConstraints | undefined] = validateCons(key, agents[index], cons, shift)
            if (isOnShift) {
                //push new shift to the weekly shifts of the agent
                if (agents[index].weeklyLimit.totalCount < agents[index].weeklyLimit.limit) {
                    shift.agents?.push(String(agents[index]._id))
                    agents[index]?.weeklyShifts?.set(String(key), updatedshift)
                    agents[index].weeklyLimit.totalCount++
                }
            }
        }
        index++
        if (index > agents.length - 1) break
    }
    // New filled shift with available agents
    return shift
}

const validateCons = (key: String, agent: IBaseAgent, cons: IDailyConstraints | undefined, shift: IBaseShift): [boolean, IDailyConstraints | undefined] => {

    const dailyShift: IDailyConstraints | undefined = agent.weeklyShifts!.get(String(key))
    const workShift: IDailyConstraints | undefined = agent.weeklyShifts!.get(String(key))

    const validationMap = new Map<string, string>([
        [SUNDAY, SATURDAY],
        [MONDAY, SUNDAY],
        [TUESDAY, MONDAY],
        [WEDNESDAY, TUESDAY],
        [THURSDAY, WEDNESDAY],
        [FRIDAY, THURSDAY],
        [SATURDAY, FRIDAY],
    ])


    if (shift.agents?.includes(String(agent._id))) return [false, workShift]
    if (shift.type === MORNING) {
        if (!dailyShift?.morning && !dailyShift?.noon && !dailyShift?.night && !cons?.morning) {
            const checkNightBefore: string | undefined = validationMap.get(String(key))
            const toCheck: IDailyConstraints | undefined = agent.weeklyShifts!.get(String(checkNightBefore))
            if (toCheck?.night)
                return [false, workShift]

            workShift!.morning = true
            return [true, workShift]
        }
    }
    else if (shift.type === NOON || shift.type === NIGHT) {
        if (!dailyShift?.morning && !dailyShift?.noon && !dailyShift?.night && !cons?.noon) {

            switch (shift.type) {
                case NOON:
                    workShift!.noon = true
                    break
                case NIGHT:
                    if (agent.weeklyLimit.nightCount >= 2) break
                    agent.weeklyLimit.nightCount++
                    workShift!.night = true
                    break
            }
            return [true, workShift]
        }
    }
    return [false, workShift]
}

export default createTable



