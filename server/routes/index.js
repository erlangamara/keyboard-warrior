const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers.js')
const attackAuthorization = require('../middleware/attackAuthorization')
const authentication = require('../middleware/authenticate')

router.post('/users/login', controller.login)
router.get('/randomwords',controller.getWords)
router.use(authentication)
router.get('/user', controller.getPlayer)
router.get('/userEnemy',controller.findByRoom)
router.post('/user/attack/:id', attackAuthorization, controller.attack)
router.post(`/users/logout`, controller.updateRoomId)



module.exports = router

/* 
    contoh http errors
=======================================================
    const createError = require(`http-errors`)

    if (err) throw createError (404, `File not found`)
*/