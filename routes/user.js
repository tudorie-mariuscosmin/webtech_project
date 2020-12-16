const router = require('express').Router()
const { authController, userController } = require('../controllers')
const { authMiddleware } = authController

router.post('/register', authMiddleware.authenticate, authMiddleware.isAdmin, userController.createUser)
router.get('', authMiddleware.authenticate, authMiddleware.isAdmin, userController.getAllUsers)
router.put('/password', authMiddleware.authenticate, userController.changeUserPassword)
router.put('/email', authMiddleware.authenticate, userController.changeUserEmail)

module.exports = router