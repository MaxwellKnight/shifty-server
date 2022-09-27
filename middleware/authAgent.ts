const auth = async (req: any, res: any, next: any) => {
    req.body.blah = 'blah'
    next()
}

export { auth }