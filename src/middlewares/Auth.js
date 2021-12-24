const jwt = require('jsonwebtoken')

exports.Auth = async (req, res, next) => {
    const authHeader = req.header('Authorization')

    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        res.status(400).send({
            status: "failed",
            message: "Access Denied"
        })
    }

    try {
        const verified = jwt.verify(token, process.env.API_KEY)
        res.user = verified
        next();

    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "invalid Token"
        })
    }

}