import mongoose from 'mongoose'
import { IBaseAgent } from '../../interfaces/IBaseAgent'
import { Agent } from '../../models/Agent'

const createAgent = async (agent: IBaseAgent) => {
    try {
        const newAgent: IBaseAgent = await Agent.create(agent)
        return (newAgent)
    } catch (err) {
        return err
    }
}

export default createAgent