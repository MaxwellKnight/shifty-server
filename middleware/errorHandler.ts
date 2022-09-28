const errorHandler = (err: any, req: any, res: any, next: any) => {
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