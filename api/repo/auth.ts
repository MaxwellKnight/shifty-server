import { IBaseAgent } from '../../interfaces/IBaseAgent'
import { Agent } from '../../models/Agent'

const createAgentDb = async (agent: IBaseAgent) => {
    try {
        const newAgent = await new Agent(agent).save()
        if (newAgent) {
            return newAgent
        } else {
            return { error: 'cannot create agent' }
        }

    } catch (err) {
        return { error: err }
    }
}

export { createAgentDb }