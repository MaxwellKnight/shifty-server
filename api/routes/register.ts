import express from 'express'
import { createAgent } from './../services/register'

const registerRouter = express.Router()

registerRouter.route('/')
    .post(async (req, res) => {
        try {
            const { error, data } = await createAgent(req.body)
            if (data) {
                res.status(201).json({ data })
                console.log(data)
            }
            else if (error) res.status(201).json({ message: error })
        } catch (err) {
            res.status(500).json({ message: { error: err } })
        }
    })


export default registerRouter