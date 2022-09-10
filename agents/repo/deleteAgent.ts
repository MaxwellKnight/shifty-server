import mongoose from "mongoose"
import { Agent } from "../../models/Agent"

mongoose.connect('mongodb://localhost/shifty')

const deleteAgentById = async (id: string) => {
    try {
        await Agent.findByIdAndDelete(id)
    } catch (e: any) {
        console.log(e)
    }
}

export default deleteAgentById