import { getAgentByUsername } from "../repo/agents"
import { IBaseAgent } from "../../interfaces/IBaseAgent"
import { createAgentDb } from "../repo/auth"
const bcrypt = require("bcrypt")

const login = async (username: string, password: string) => {
    try {
        const { error, data }: any = await getAgentByUsername(username)

        if (!error) {
            if ((data[0].password === password && data[0].username === username)) {
                const agent = {
                    _id: data[0]._id,
                    role: data[0].role,
                    email: data[0]?.contact?.email
                }
                return { data: agent }
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

const createAgent = async ({
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

export { login, createAgent }
