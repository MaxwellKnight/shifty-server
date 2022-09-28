import express from 'express'
import { loginController, registerController } from '../controllers/auth'

const authRouter = express.Router()

//LOGIN
authRouter.post('/login', loginController)
//REGISTER
authRouter.post('/register', registerController)



export default authRouter