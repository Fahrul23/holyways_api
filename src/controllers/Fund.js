const { fund, userDonate, user } = require('../../models/index')
const Joi = require('joi')

exports.getFunds = async (req, res) => {
    try {
        const data = await fund.findAll({            
            include: [
                {
                    model: user,
                    as: "users",  
                    through: {
                        model: userDonate,
                        as: "userDonate",
                        attributes: {
                            exclude: ['userId','fundId','createdAt', 'updatedAt']
                        },
                      },     
                    attributes: {
                        exclude: ['password','createdAt', 'updatedAt']
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.status(200).send({
            status: "success",
            data: {'funds': data}
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "error",
            message: "internal server error"
        })
    }
}

exports.detailFund = async (req, res) => {
    const {id} = req.params

    try {
        const data = await fund.findOne({            
            where: {id},
            include: [
                {
                    model: user,
                    as: "users", 
                    through: {
                        model: userDonate,
                        as: "userDonate",
                        attributes: {
                            exclude: ['userId','fundId','createdAt', 'updatedAt']
                        },
                      },     
                    attributes: {
                        exclude: ['password','createdAt', 'updatedAt']
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.status(200).send({
            status: "success",
            data: {'fund': data}
        }) 
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "error",
            message: "internal server error"
        })
    }

}

exports.addFund = async (req, res) => {
    const data = req.body
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        goal: Joi.number().min(5).required(),
        description: Joi.string().min(5).required(),
    })
    const {error} = schema.validate(data)

    if(error) {
        return res.status(400).send({
            status: "error",
            message: error.details[0].message
        })
    }
    try {
        const newfund = await fund.create({
            title: data.title,
            goal: data.goal,
            description: data.description,
            thumbnail: req.file.filename
        })

        res.status(201).send({
            status: "success",
            data: {fund: {
                id: newfund.id,
                title: newfund.title,
                thumbnail: newfund.thumbnail,
                goal: newfund.goal,
                description: newfund.description,
                userDonate: []
            }}
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            status: "failed",
            message: "internal server error"
        })
    }
}

exports.editFund = async (req, res) => {
    const data = req.body
    const schema = Joi.object({
        title: Joi.string().min(3),
        goal: Joi.number().min(5),
        description: Joi.string().min(5),
    })
    const {error} = schema.validate(data)

    if(error) {
        return res.status(400).send({
            status: "error",
            message: error.details[0].message
        })
    }
    try {
        const {id} = req.params  
        
        const datafund = await fund.findOne({
            where: {id}
        })

        const thumbnail = req.file ? req.file.filename : datafund.thumbnail
        
        await fund.update({
            title: data.title,
            goal: data.goal,
            description: data.description,
            thumbnail: thumbnail
        },{
            where: {id}
        })
        const updatedfund = await fund.findOne({
            where: {id}
        })

        res.status(200).send({
            status: "success",
            data: {
                fund: {
                    id : updatedfund.id,
                    title : updatedfund.title,
                    thumbnail : updatedfund.thumbnail,
                    goal : updatedfund.goal,
                    description : updatedfund.description,
                    userDonate: []
                }
            }
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            status: "failed",
            message: "internal server error"
        })
    }
}

exports.deleteFund = async (req, res) => {
    const {id} = req.params
    try {
        const datafund = await fund.destroy({
            where: {id}
        })
        
        if(!datafund) {
            res.status(404).send({
                status: "error",
                message: "fund not found",
                data: []
            })   
        }

        res.status(200).send({
            status: "success",
            data: {id: id}
        })
    }catch (error) {
        console.log(error.message)
        res.status(500).send({
            status: "failed",
            message: "internal server error"
        })               
    }
}

exports.editDonateFund = async (req, res) => {
    const {fundId, userId} = req.params
    const data = req.body
    try {
        const donateFund = await userDonate.update(data,{
            where: {
                fundId : fundId,
                userId: userId
            }
        })

        if(!donateFund) {
            res.status(404).send({
                status: "error",
                message: "data not found",
                data: []
            })   
        }

        const dataFund = await fund.findOne({
            where: {
                id: fundId
            },            
            include: [
                {
                    model: user,
                    as: "users",  
                    through: {
                        model: userDonate,
                        as: "userDonate",
                        attributes: {
                            exclude: ['userId','fundId','createdAt', 'updatedAt']
                        },
                      },     
                    attributes: {
                        exclude: ['password','createdAt', 'updatedAt']
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.status(200).send({
            status: "success",
            data: dataFund
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "internal server error"
        })  
    }
}








