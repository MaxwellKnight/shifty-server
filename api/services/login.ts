import { getAgentByUsername } from "../repo/agents"

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

export { login }