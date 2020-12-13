const router = require('express').Router()
const authRoutes = require('./auth')
const userRoutes = require('./user')
const activityRoutes = require('./activity')
const { startupController } = require('../controllers')

router.get('/reset', startupController.resetDatabase)
router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/activity', activityRoutes)

module.exports = router