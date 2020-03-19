const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers.js')

router.post('/users/login', controller.login)
router.get('/randomwords',controller.getWords)



module.exports = router

/* 
    contoh http errors
=======================================================
    const createError = require(`http-errors`)

    if (err) throw createError (404, `File not found`)
*/