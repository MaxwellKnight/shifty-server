
import { IBaseAgent } from "../interfaces/IBaseAgent"
import { IBaseShift, IDailyConstraints } from "../interfaces/IShift"


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
            console.table(agent.weeklyConstraints)
        }
    })
}

const printTable = (table: Map<String, IBaseShift[]>) => {
    for (const [key, value] of table) {
        console.log(key)
        console.table(value)
    }
}

const printAgentSummary = (agents: IBaseAgent[]) => {

    agents.map(agent => {
        if (agent.weeklyShifts) {
            console.log('=================')
            console.log(`Name: ${agent.name}\nTotal Shift: ${agent.weeklyLimit.totalCount}\nNight Count: ${agent.weeklyLimit.nightCount}`)
            for (const [key, value] of agent.weeklyShifts) {
                console.log(key, " - ")
                const toPrint = {
                    value: value,
                }
                console.table(toPrint)
            }
        }
    })
}

export { printAgentSummary, printAgentsConstraints, printAgentsShiftCount, printTable }
