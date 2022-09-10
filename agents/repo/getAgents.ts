import mongoose from "mongoose"
import { IBaseAgent } from "../../interfaces/IBaseAgent"
import { Agent } from "../../models/Agent"


mongoose.connect('mongodb://localhost/shifty')

const getAllAgents = async () => {
    try {
        const allAgents: IBaseAgent[] = await Agent.find()
        return allAgents
    }
    catch (e) {
        console.log(e)
    }
}

const getAgentById = async (id: string) => {
    try {
        const agent: IBaseAgent | null = await Agent.findById(id).exec()
        return agent
    }
    catch (e) {
        console.log(e)
    }
}


export { getAgentById, getAllAgents }