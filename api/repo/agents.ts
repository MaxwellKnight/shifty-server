import { IBaseAgent } from "../../interfaces/IBaseAgent"
import { Agent } from "../../models/Agent"

const createAgent = async (agent: IBaseAgent) => {
    try {
        const newAgent: IBaseAgent = await Agent.create(agent)
        return (newAgent)
    } catch (err) {
        return err
    }
}

const getAllAgents = async () => {
    try {
        const allAgents: IBaseAgent[] = await Agent.find()
        return allAgents
    }
    catch (e) {
        console.log(e)
    }
}
const deleteAgentById = async (id: string) => {
    try {
        await Agent.findByIdAndDelete(id)
    } catch (e: any) {
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

export { getAgentById, getAllAgents, deleteAgentById, createAgent }

