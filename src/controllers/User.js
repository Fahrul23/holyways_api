const {user} = require('../../models/index');

exports.getUsers = async(req,res) => {
    try {
        const users = await user.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt','password']
            }
        });
        res.status(200).send({
            status: "success",
            data: {users}
        })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "internal server error"
        })       
    }
}

exports.deleteUser = async(req, res) => {
    const {id} = req.params
    try {
        const User = await user.destroy({
            where: {id}
        })
        
        if(!User) {
            return res.status(404).send({
                status: "error",
                message: "User not found",
            })   
        }

        res.status(200).send({
            status: "success",
            data: {id: id}
        })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "internal server error"
        })               
    }
}