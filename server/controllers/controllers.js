const { User } = require(`../models`)
const axios = require('axios')
const jwt = require(`../helper/jsonwebtoken`)
const createError = require(`http-errors`)

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
                        hp: 100,
                        isAnswer: false,
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
        axios({
            method: 'GET',
            url: 'https://random-word-api.herokuapp.com/word?number=1'
        })
        .then((result) =>{
            res.status(200).json({"words": result.data})
        })
        .catch(error =>{
            next(error)
        })
    }

    static attack(req,res,next){
        let dataUser;

        User.findOne({
            where: {
                id: req.body.id
            }
        })
            .then(data=>{
                let hpCalculation = data.hp - req.body.demage
                let dataAttack = {
                    hp: hpCalculation,
                    isAnswer: false
                }

                dataUser = data
                dataUser.hp -= req.body.demage

                return User.update(dataAttack, {
                    where: {
                        id: req.body.id
                    }
                })
            })
            .then(()=>{
                res.status(200).json(dataUser)
            })
            .catch(err=>{
                next(err)
            })
    }

    static updateRoomId(req, res, next){
        let { roomId } = req.body

        User.update({
            roomId
        },
        {
            where: {
                id: req.user.id
            }
        })
            .then(data => {
                if(data) {
                    res.status(200).json(data)
                } else {
                    throw createError(404, `User not found, fail to update`)
                }
            })
            .catch(next)
    }
}

module.exports = UserController