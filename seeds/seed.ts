import connectDB from "../config/mongoose"
import { IBaseAgent } from "../interfaces/IBaseAgent"
import { IDailyConstraints, IBaseShift } from "../interfaces/IShift"
import { Agent } from '../models/Agent'
import { Shift, PrevShift } from "../models/Shift"
import { Table } from "../models/Table"
const bcrypt = require("bcrypt")

import constants from './../constants/index'
const { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY } = constants.weekDays


const fnames: String[] = ['איליה', 'אביאל', 'דימה', 'מתן', 'אימרי', 'מקסוול', 'יובל', 'ליאור', 'שי', 'אבי', 'רון', 'יוני', 'רונן', 'ארנון', 'דובי', 'בני', "מיכאל", "מיגל", "ארתור", "פליקס", "יונה", "יחזקאל", "ספיר", "תומר", "שלמה", "טל", "אברהם"]
const lnames: String[] = ['אלחזוב', 'רוסקלנקר', 'אלקובי', 'איבקין', 'קליימן', 'אלמקייס', 'נייט', 'חביב', 'סבן', 'אטיאס', 'אפריאט', 'אילוז', 'יפה', 'אהרוני', 'יצחק', 'יהושע', 'יפתח', 'כהן', 'שטיין', 'וויל', 'דניאל', 'קלארק', 'חזני', 'אברבנאל', 'מרטין', 'קראוס', 'השופט']

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
    return Math.random() < .7
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

const getPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt).string()
        return newPassword
    } catch (err) {
        console.log(err)
        return err
    }
}

const getAgents = (): IBaseAgent[] => {
    //create new agents array
    const agents: IBaseAgent[] = []

    //loop 30 times and create random Agents
    for (let i = 0; i < 5; i++) {
        const newAgent = new Agent({
            teamId: i,
            name: getName(),
            username: `klok${i}`,
            password: `max${i}`,
            role: 'agent',
            isStudent: getRandomBool(),
            isMobile: getRandomBool(),
            contact: {
                phone: '0534300641',
                email: `maxwell${i}@gmail.com`,
                emergency: '0547490265',
                addr: {
                    street: "Yeziat Europe",
                    city: "Beer Sheba",
                    zip: 55555
                }
            },
            weeklyShifts: getWeelyShifts(),
            weeklyLimit: {
                nightCount: 0,
                totalCount: 0,
                limit: 6
            },
            weeklyConstraints: getWeelyCons(),
            nextShift: undefined,
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
            title: 'עיניים - בוקר',
            facility: 'EYES',
            type: 'morning',
            limit: 7,
            agents: [],
            isFull: false,
            date: new Date,
            length: 8.5
        },
        {
            title: 'עיניים - צהריים',
            facility: 'EYES',
            type: 'noon',
            limit: 7,
            agents: [],
            isFull: false,
            date: new Date,
            length: 8.5
        },
        {
            title: 'עיניים - לילה',
            facility: 'EYES',
            type: 'night',
            limit: 7,
            agents: [],
            isFull: false,
            date: new Date,
            length: 8.5
        },
        {
            title: 'שיקום',
            facility: 'SHIKUM',
            type: 'morning',
            limit: 2,
            agents: [],
            isFull: false,
            date: new Date,
            length: 12
        },
        {
            title: 'תקשוב - בוקר',
            facility: 'TIKSHOV',
            type: 'morning',
            limit: 1,
            agents: [],
            isFull: false,
            date: new Date,
            length: 12
        },
        {
            title: 'תקשוב - לילה',
            facility: 'TIKSHOV',
            type: 'night',
            limit: 1,
            agents: [],
            isFull: false,
            date: new Date,
            length: 12
        },
        {
            title: 'בינוי - בוקר',
            facility: 'BINUY',
            type: 'morning',
            limit: 1,
            agents: [],
            isFull: false,
            date: new Date,
            length: 12
        },
        {
            title: 'בינוי - לילה',
            facility: 'BINUY',
            type: 'night',
            limit: 1,
            agents: [],
            isFull: false,
            date: new Date,
            length: 12
        },
        {
            title: 'משפחות',
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
        await PrevShift.deleteMany()
        await Shift.deleteMany()
        shifts.map(async shift => {
            const toPush = new Shift(shift)
            await toPush.save()
        })
        await Agent.deleteMany()
        agents.map(async agent => {
            const pushAgent = new Agent(agent)
            await pushAgent.save()
        })
        await Table.deleteMany()
        const pushTable = new Table({ table: table })
        await pushTable.save()
        console.log('success')
        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

const deleteAllAgentsCons = async () => {
    try {
        const agents: IBaseAgent[] = await Agent.find()
        agents.forEach(async (agent) => {
            const { weeklyConstraints, ...data } = agent
            console.log(data)
            return
        })
    } catch (err) {
        console.log(err)
    }
}


deleteAllAgentsCons()



export { table, agents, getShifts }
