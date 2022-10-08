import { deleteAgentById, getAgentById, getAllAgents, updateAgent } from "../repo/agents"
import { createError } from "../../utils/error"
import { IBaseAgent } from "../../interfaces/IBaseAgent"

export const getAgentsController = async (req: any, res: any, next: any) => {
    try {
        const agents: IBaseAgent[] | undefined = await getAllAgents()
        res.status(200).send(agents)
    } catch (error) {
        next(createError(500))
    }
}

export const getAgentByIdController = async (req: any, res: any, next: any) => {
    try {
        const { error, data } = await getAgentById(req.params.id)
        if (data) {
            const { password, ...info } = data
            res.status(200).json(info)
        }
        else if
            (error) next(createError(404, 'Not found'))
        else
            next(error)
    } catch (error) {
        next(createError())
    }
}

export const updateAgentController = async (req: any, res: any, next: any) => {
    try {
        const { id } = req.params
        const { error, data } = await updateAgent(id, req.body)
        if (error)
            next(createError(400, 'could not update agent'))

        res.status(200).json({ data })
    } catch (error) {
        next(createError(501, JSON.stringify(error)))
    }
}

export const updateAllAgentsController = async (req: any, res: any, next: any) => {

}


export const deleteAgentByIdController = async (req: any, res: any, next: any) => {
    try {
        await deleteAgentById(req.params.id)
        res.status(200).json({ success: true, message: 'agent deleted' })
    }
    catch (error) {
        next(createError())
    }
}