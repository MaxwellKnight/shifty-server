import { IBaseAgent } from "../../interfaces/IBaseAgent"
import { createAgentDb } from "../repo/register"

const bcrypt = require("bcrypt")

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

export { createAgent }