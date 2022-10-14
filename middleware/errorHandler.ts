import { Response, Request, NextFunction } from 'express'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Internal server error'
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
}

export default errorHandler