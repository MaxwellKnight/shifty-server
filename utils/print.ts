
import { IBaseAgent } from "../interfaces/IBaseAgent"
import { IBaseShift, IDailyConstraints } from "../interfaces/IShift"
import constants from '../constants/index'
const { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } = constants.weekDays
const { MORNING, NOON, NIGHT } = constants.shiftType


const printAgentsShiftCount = (agents: IBaseAgent[], table: Map<String, IDailyConstraints>) => {
    agents.map(agent => {
        for (const [key, value] of table) {
            console.log(`TOTAL: ${agent.weeklyLimit.totalCount}, NIGHT: ${agent.weeklyLimit.nightCount}`)
            console.log(`${key} : ${agent.name}, ID: ${agent.teamId}`)
            console.log('\n\n')

        }
    })
}


const printAgentsConstraints = (agents: IBaseAgent[]) => {
    agents.map(agent => {
        if (agent.weeklyShifts) {
            console.log(agent.name)
            console.table(agent?.weeklyConstraints)
        }
    })
}

const printTable = (table: Map<String, IBaseShift[]>) => {
    for (const [key, value] of table) {
        console.log(key)
        value.forEach(val => {
            console.table({
                facility: val.facility,
                type: val.type,
                isFull: val.isFull,
                length: val.length,
                agents: val.agents.length
            })
        })
    }
}

const printAgentSummary = (agents: IBaseAgent[]) => {

    agents.map(agent => {
        if (agent?.weeklyShifts) {
            console.log('=================')
            console.log(`Name: ${agent.name}\nTotal Shift: ${agent.weeklyLimit.totalCount}\nNight Count: ${agent.weeklyLimit.nightCount}`)
            for (const [key, value] of agent?.weeklyShifts) {
                console.log(key, " - ")
                const toPrint = {
                    value: value,
                }
                console.table(toPrint)
            }
        }
    })
}

const printShiftRejection = (DAY: string, shift: IBaseShift, agents: IBaseAgent[]) => {
    const validationMap = new Map<string, string>([
        [SUNDAY, SATURDAY],
        [MONDAY, SUNDAY],
        [TUESDAY, MONDAY],
        [WEDNESDAY, TUESDAY],
        [THURSDAY, WEDNESDAY],
        [FRIDAY, THURSDAY],
        [SATURDAY, FRIDAY],
    ])
    agents.forEach(agent => {
        const day: IDailyConstraints | undefined = agent.weeklyShifts?.get(DAY)
        if (!shift.agents.includes(JSON.stringify(agent._id))) {
            console.log(`Shift count: ${agent.weeklyLimit.totalCount} night count: ${agent.weeklyLimit.nightCount}`)
            console.log(agent.name, DAY, shift.type, shift.facility)

            console.table(agent.weeklyShifts?.get(DAY))
            let shiftbefore: string | undefined = validationMap.get(DAY)
            console.log("Day Before Worked")
            console.table(agent.weeklyShifts?.get(String(shiftbefore)))
        }
    })
}

export { printAgentSummary, printAgentsConstraints, printAgentsShiftCount, printTable, printShiftRejection }
