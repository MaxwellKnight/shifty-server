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

const getAgentByUsername = async (username: string) => {
    try {
        const agent = await Agent.findOne({ username: username })
        if (agent) {
            return { agent }
        }
        else {
            return { error: 'username or password are incorrect' }
        }
    } catch (err) {
        return { error: err }
    }
}


const getAgentById = async (id: string) => {
    try {
        const agent: IBaseAgent | null = await Agent.findById(id).exec()
        return { data: agent }
    }
    catch (err) {
        console.log(err)
        return { error: err }
    }
}

const updateAgent = async (id: string, data: any) => {
    try {
        const newAgent = await Agent.findByIdAndUpdate(id, { $set: { ...data } }, { new: true })
        return { data: newAgent }
    } catch (err) {
        console.log(err)
        return { error: err }
    }
}

const updateAllAgents = async (agents: IBaseAgent[] | undefined) => {
    try {
        agents!.map(async (agent: IBaseAgent) => {
            await Agent.findByIdAndUpdate(agent?._id, { weeklyShifts: agent.weeklyShifts, weeklyLimit: agent.weeklyLimit })
        })
    } catch (err) {
        console.log(err)
        return { error: err }
    }
}

export { getAgentById, getAllAgents, deleteAgentById, createAgent, updateAllAgents, getAgentByUsername, updateAgent }

