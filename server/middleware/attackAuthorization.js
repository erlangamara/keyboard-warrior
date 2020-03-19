const {User} = require('../models');
const createError = require('http-errors');

function attackAuthorization(req, res, next){
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(data=>{
            if(data.isAttack === false){
                throw createError(403, 'not authorized')
            }else{
                next()
            }
        })
        .catch(err=>{
            next(err)
        })
}

module.exports = attackAuthorization;