require('dotenv').config()
import mongoose from 'mongoose'

const connectDB = () => {
    mongoose.connect('mongodb://localhost/shifty')
    return mongoose.connection
}

export default connectDB