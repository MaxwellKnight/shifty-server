import { IBaseAgent } from "../interfaces/IBaseAgent";
import { printAgentSummary, printAgentsConstraints, printAgentsShiftCount, printTable } from './print'

const shuffleArray = (array: IBaseAgent[] | undefined) => {

    for (var i = array!.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array![i];
        array![i] = array![j];
        array![j] = temp;
    }
}

const sortByShift = (agents: IBaseAgent[]) => {
    let count: number = 0;
    let agent: IBaseAgent

    for (let i = 0; i < agents.length; i++) {
        agent = agents[i]
        for (let j = 1; j < agents.length; j++) {
            if (agents[j - 1].weeklyLimit.totalCount > agents[j].weeklyLimit.totalCount) {
                [agents[j], agents[j - 1]] = [agents[j - 1], agents[j]]
            }
        }
    }
}
const getDatesArray = function (start: Date, end: Date) {
    const arr: Date[] = []
    for (const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }
    return arr;
};

const daysCount = (startDate: Date, endDate: Date) => {
    const difference = endDate.getTime() - startDate.getTime()
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24))
    return TotalDays
}

export { shuffleArray, sortByShift, printAgentSummary, printAgentsConstraints, printAgentsShiftCount, printTable, getDatesArray, daysCount }