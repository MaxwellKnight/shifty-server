import { createError } from "../../utils/error"
import { createAgent, login } from "../services/auth"

export const loginController = async (req: any, res: any, next: any) => {
    const { username, password } = req.body
    if (!(username && password)) return next(createError(400, 'missing credentials'))

    const { error, data } = await login(username, password)
    if (error) return next(createError(403, error))

    res.status(200).json({ data })
}

export const registerController = async (req: any, res: any, next: any) => {
    try {
        const { error, data } = await createAgent(req.body)
        if (data) {
            res.status(201).json({ data })
            console.log(data)
        }
        else if (error) next(createError(400, 'could not complete'))
    } catch (error) {
        next(createError())
    }
}