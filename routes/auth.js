const router = require('express').Router()
const { authController } = require('../controllers')

router.post('/login', authController.login)
router.get('/userType', authController.authMiddleware.authenticate, authController.getUserType)


module.exports = router