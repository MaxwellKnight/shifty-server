export const createError = (status: number = 500, message: string = '') => {
    const error = new Error()
    const err = {
        name: error.name,
        status,
        message: message,
        stack: error.stack
    }
    return err
}