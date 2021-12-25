const {user} = require('../../models/index')
const Joi = require('joi')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

exports.Login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    // Validate input user
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    const {error} = schema.validate({email,password})

    if(error){
        return res.status(400).send({
            status: "failed",
            message: error.details[0].message
        })
    }

    try {
        const userExist = await user.findOne({
            where: {email},
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        })
        if(!userExist){
            return res.status(400).send({
                status: "failed",
                message: "email doesnt exist"
            })
        }

        // Password Validate with bcrypt
        const passwordCheck = await bcrypt.compare(password,userExist.password)
        
        if(!passwordCheck){
            return res.status(400).send({
                status: "failed",
                message: "password doesnt exist"
            })
        }

        // create Token JWT
        const dataToken = {id: userExist.id}

        var token = jwt.sign(dataToken, process.env.API_KEY);

        res.status(200).send({
            status: "success",
            data: {user: {
                fullName: userExist.fullName,
                email: userExist.email,
                token
            }}
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "internal server error"
        })    
    }
}

exports.Register = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const fullName = req.body.fullName
    // Validate input user
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        fullName: Joi.string().min(3).required()
    })
    const {error} = schema.validate({email,password,fullName})

    if(error){
        return res.status(400).send({
            status: "failed",
            message: error.details[0].message
        })
    }
    
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await user.create({
            fullName, 
            email, 
            password: hashedPassword
        })

        // create Token JWT
        const dataToken = {id: newUser.id}
        var token = jwt.sign(dataToken,process.env.API_KEY)

        res.status(201).send({
            status: "success",
            data: {user: {
                fullName: newUser.fullName,
                token
            }}
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "internal server error"
        })       
    }
    
}