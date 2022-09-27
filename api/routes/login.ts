import express from 'express'
import { login } from '../services/login'

const loginRouter = express.Router()

loginRouter.route('/')
    .post(async (req, res) => {
        const { username, password } = req.body
        if (!(username && password)) return res.status(400).json({ error: 'missing credentials' })

        const { error, data } = await login(username, password)
        if (error) return res.status(403).json({ error })

        res.status(200).json({ data })
    })


export default loginRouter