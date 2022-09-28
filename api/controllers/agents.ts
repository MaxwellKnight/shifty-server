import { createAgent, deleteAgentById, getAgentById, getAllAgents } from "../repo/agents"
import { createError } from "../../utils/error"
import { IBaseAgent } from "../../interfaces/IBaseAgent"

export const getAgentsController = async (req: any, res: any, next: any) => {
    try {
        const agents: IBaseAgent[] | undefined = await getAllAgents()
        res.status(200).send(agents)
    } catch (error) {
        console.log(error)
        next(createError())
    }
}

export const getAgentByIdController = async (req: any, res: any, next: any) => {
    try {
        const { error, data } = await getAgentById(req.params.id)
        if (data)
            res.status(200).send(data)
        else if
            (error) next(createError(404, 'Not found'))
        else
            next(error)
    } catch (error) {
        console.log(error)
        next(createError())
    }
}

export const updateAgentController = async (req: any, res: any, next: any) => {
    res.status(200).json({ message: 'update page controller' })
}

export const updateAllAgentsController = async (req: any, res: any, next: any) => {

}

export const createAgentController = async (req: any, res: any, next: any) => {
    try {
        const newAgent = await createAgent(req.body)
        res.status(201).send(newAgent)
    } catch (error) {
        console.log(error)
        next(createError())
    }
}

export const deleteAgentByIdController = async (req: any, res: any, next: any) => {
    try {
        await deleteAgentById(req.params.id)
        res.status(200).send('Agent Deleted')
    }
    catch (error) {
        console.log(error)
        next(createError())
    }
}