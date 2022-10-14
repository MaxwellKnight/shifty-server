require('dotenv').config()
import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shifty')
        console.log('connected to mongodb')
        connection.connection.on(('connected'), () => {
            console.log('connected to mongodb')
        })
        connection.connection.on(('disconnect'), () => {
            console.log('disconnected from mongodb')
        })
        return connection
    } catch (error) {
        throw error
    }
}

export default connectDB