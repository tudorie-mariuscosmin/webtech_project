const router = require('express').Router()
const { authController, userController } = require('../controllers')
const { authMiddleware } = authController

router.post('/register', authMiddleware.authenticate, authMiddleware.isAdmin, userController.createUser)
router.get('', authMiddleware.authenticate, authMiddleware.isAdmin, userController.getAllUsers)

module.exports = router