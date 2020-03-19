const jwt = require(`../helpers/jwt`)
const createError = require(`../helpers/createErrors`)
const { User } = require(`../models`)

module.exports = (req, res, next) => {
    var { token } = req.headers

    try {
        req.user = jwt.verify(token)
    }
    catch (err) {
        next(err)
    }

    User.findOne({
        where: {
            id: req.user.id
        }
    })
        .then(data => {
            if (data) {
                next()
            } else {
                throw createError(401, `Invalid Token`) // User deleted by admin, etc
            }
        })
        .catch(next)
}