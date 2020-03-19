const { User } = require(`../models`)
const axios = require('axios')
const jwt = require(`../helper/jsonwebtoken`)

class UserController{
    static login(req, res, next) {
        let { name } = req.body

        User.findOne({
            where: {
                name
            }
        })
            .then(data => {
                if (data && data.roomId === 1) {
                    return data
                } else if (!data) {
                    return User.create({
                        name,
                        hp: 100,
                        isAnswer: false,
                        roomId: 1
                    })
                } else {
                    throw createError(403, `Username is under use`)
                }
            })
            .then(data => {
                let token = jwt.sign({
                    id: data.id
                })

                res.status(200).json({
                    token
                })
            })
            .catch(next)
    }

    static getWords(req,res,next){
        
    }

    static attack(req,res,next){
        //jadi bikin ini?
    }
}

module.exports = UserController