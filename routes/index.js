const router = require('express').Router()
const controllers = require('../controllers')

router.get('/test', controllers.test)


module.exports = router