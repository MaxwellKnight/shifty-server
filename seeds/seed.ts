import mongoose from "mongoose"
import connectDB from "../config/mongoose"
import { IBaseAgent } from "../interfaces/IBaseAgent"
import { IDailyConstraints, IBaseShift } from "../interfaces/IShift"
import { Agent } from '../models/Agent'
import { Shift, PrevShift } from "../models/Shift"
import { Table } from "../models/Table"

import constants from './../constants/index'
const { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } = constants.weekDays


const fnames: String[] = ['Aviel', 'Dima', 'Matan', 'Imri', 'Maxwell', 'Yuval', 'Lior', 'Yuval', 'Shi', 'Avi', 'Ron', 'Yoni', 'Yael', 'Arnon', 'Gamal', 'Beni', "Michael", "Miguel", "Arthur", "Felix", "Burna", "Yehezkel", "Sapir", "Yael", "Dave", "Jesus", "Avraham"]
const lnames: String[] = ['Elkobi', 'Ivkin', 'Klaiman', 'Elmakayes', 'Knight', 'Haviv', 'Saban', 'Attias', 'Afriat', 'Iluz', 'Yafe', 'Aharoni', 'Yizhak', 'Yeosha', 'Maxwell', 'Yuval', 'Lior', 'Yuval', 'Shi', 'Avi', 'Ron', 'Yoni', 'Martin', 'Arnon', 'Gamal']

const table = new Map<String, IBaseShift[]>([
    [SUNDAY, []],
    [MONDAY, []],
    [TUESDAY, []],
    [WEDNESDAY, []],
    [THURSDAY, []],
    [FRIDAY, []],
    [SATURDAY, []],
])

const getName = (): string => {
    let index = Math.floor(Math.random() * lnames.length)
    return `${fnames[index]} ${lnames[index]}`
}

const getRandomBool = (): boolean => {
    return Math.random() < .76
}

const getWeelyCons = (): Map<string, IDailyConstraints> => {
    return new Map<string, IDailyConstraints>([
        [SUNDAY, { morning: getRandomBool(), noon: getRandomBool(), night: getRandomBool(), notes: 'currently unavailable' }],
        [MONDAY, { morning: getRandomBool(), noon: getRandomBool(), night: getRandomBool(), notes: 'currently unavailable' }],
        [TUESDAY, { morning: getRandomBool(), noon: getRandomBool(), night: getRandomBool(), notes: 'currently unavailable' }],
        [WEDNESDAY, { morning: getRandomBool(), noon: getRandomBool(), night: getRandomBool(), notes: 'currently unavailable' }],
        [THURSDAY, { morning: getRandomBool(), noon: getRandomBool(), night: getRandomBool(), notes: 'currently unavailable' }],
        [FRIDAY, { morning: getRandomBool(), noon: getRandomBool(), night: getRandomBool(), notes: 'currently unavailable' }],
        [SATURDAY, { morning: getRandomBool(), noon: getRandomBool(), night: getRandomBool(), notes: 'currently unavailable' }],
    ])
}

const getWeelyShifts = (): Map<string, IDailyConstraints> => {
    return new Map<string, IDailyConstraints>([
        [SUNDAY, { morning: false, noon: false, night: false, notes: '' }],
        [MONDAY, { morning: false, noon: false, night: false, notes: '' }],
        [TUESDAY, { morning: false, noon: false, night: false, notes: '' }],
        [WEDNESDAY, { morning: false, noon: false, night: false, notes: '' }],
        [THURSDAY, { morning: false, noon: false, night: false, notes: '' }],
        [FRIDAY, { morning: false, noon: false, night: false, notes: '' }],
        [SATURDAY, { morning: false, noon: false, night: false, notes: '' }],
    ])
}

const getAgents = (): IBaseAgent[] => {
    //create new agents array
    const agents: IBaseAgent[] = []

    //loop 30 times and create random Agents
    for (let i = 0; i < 40; i++) {
        const newAgent = new Agent<IBaseAgent>({
            teamId: i,
            name: getName(),
            username: `klok${i}`,
            role: 'agent',
            isStudent: getRandomBool(),
            isMobile: getRandomBool(),
            contact: {
                phone: '0543456421',
                email: 'maxwell@gmail.com',
            },
            weeklyShifts: getWeelyShifts(),
            weeklyLimit: {
                nightCount: 0,
                totalCount: 0,
                limit: 6
            },
            nextShift: undefined,
            weeklyConstraints: getWeelyCons(),
            createdAt: new Date,
            updatedAt: new Date
        })
        // console.log(newAgent)
        agents.push(newAgent)
    }
    return agents
}

const getShifts = (): IBaseShift[] => {
    return [
        {
            facility: 'EYES',
            type: 'morning',
            limit: 7,
            agents: [],
            isFull: false,
            date: new Date,
            length: 8.5
        },
        {
            facility: 'EYES',
            type: 'noon',
            limit: 7,
            agents: [],
            isFull: false,
            date: new Date,
            length: 8.5
        },
        {
            facility: 'EYES',
            type: 'night',
            limit: 7,
            agents: [],
            isFull: false,
            date: new Date,
            length: 8.5
        },
        {
            facility: 'SHIKUM',
            type: 'morning',
            limit: 2,
            agents: [],
            isFull: false,
            date: new Date,
            length: 12
        },
        {
            facility: 'TIKSHOV',
            type: 'morning',
            limit: 1,
            agents: [],
            isFull: false,
            date: new Date,
            length: 12
        },
        {
            facility: 'TIKSHOV',
            type: 'night',
            limit: 1,
            agents: [],
            isFull: false,
            date: new Date,
            length: 12
        },
        {
            facility: 'BINUY',
            type: 'morning',
            limit: 1,
            agents: [],
            isFull: false,
            date: new Date,
            length: 12
        },
        {
            facility: 'BINUY',
            type: 'night',
            limit: 1,
            agents: [],
            isFull: false,
            date: new Date,
            length: 12
        },
        {
            facility: 'MISHPAHOT',
            type: 'morning',
            limit: 1,
            agents: [],
            isFull: false,
            date: new Date,
            length: 12
        }

    ]
}


const agents = getAgents()
const shifts = getShifts()
connectDB()

const pushDB = async () => {
    try {
        await PrevShift.remove()
        await Shift.remove()
        shifts.map(async shift => {
            const toPush = new Shift(shift)
            console.log(toPush)
            await toPush.save()
        })
        await Agent.remove()
        agents.map(async agent => {
            const pushAgent = new Agent(agent)
            console.log(pushAgent)
            await pushAgent.save()
        })
        await Table.remove()
        const pushTable = new Table({ table: table })
        console.log(pushTable)
        await pushTable.save()
        console.log('success')
        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}


pushDB()



export { table, agents, getShifts }
