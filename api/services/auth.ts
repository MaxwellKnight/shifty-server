import { getAgentByUsername } from "../repo/agents"
import { IBaseAgent } from "../../interfaces/IBaseAgent"
import { createAgentDb } from "../repo/auth"
import jwt, { Secret } from 'jsonwebtoken'
const bcrypt = require("bcrypt")
require('dotenv').config()

const SECRET_KEY: Secret = process.env.JWT || '123456'

const login = async (username: string, password: string) => {
    try {
        const { error, agent }: any = await getAgentByUsername(username)

        if (!error) {
            const isPasswordValid = await bcrypt.compare(String(password), agent.password)
            if (isPasswordValid) {
                const token = jwt.sign({
                    id: agent?.id,
                    role: agent?.role
                }, SECRET_KEY)
                const newAgent = {
                    _id: agent?._id,
                    username: agent?.username,
                    email: agent?.contact?.email,
                    role: agent?.role,
                }
                return { data: newAgent, token }
            }
            else {
                return { error: 'username or password are incorrect' }
            }
        }
        return { error: error }
    } catch (err) {
        console.log(err)
        return { error: err }
    }
}

const register = async ({
    teamId,
    name,
    username,
    password,
    role,
    isStudent,
    isMobile,
    contact,
    weeklyLimit,
}: IBaseAgent) => {
    if (!(teamId && name && username && password && role && isStudent && isMobile && contact && weeklyLimit))
        return ({ error: "fields are missing" })

    try {
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)
        const newAgent = await createAgentDb({
            teamId,
            name,
            username,
            password,
            role,
            isStudent,
            isMobile,
            contact,
            weeklyLimit
        })
        return { data: newAgent }
    } catch (err) {
        return { error: err }
    }
}

export { login, register }
