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
                if (data) {
                    return data
                } else {
                    return User.create({
                        name,
                        hp: 10, // konfirmasi jumlah hp
                        isAnswer: false,
                        //gk ad kerjaan jd gw buat dlu
                        // hp nya 10 atau 100?
                        // hp di migration buat default value?
                    })
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