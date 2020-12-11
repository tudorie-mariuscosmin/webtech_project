const router = require('express').Router()
const authRoutes = require('./auth')
const userRoutes = require('./user')
const { startupController } = require('../controllers')

router.get('/reset', startupController.resetDatabase)
router.use('/auth', authRoutes)
router.use('/user', userRoutes)

module.exports = router