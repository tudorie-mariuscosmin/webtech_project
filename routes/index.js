const router = require('express').Router()
const authRoutes = require('./auth')
const { startupController } = require('../controllers')

router.get('/reset', startupController.resetDatabase)
router.use('/auth', authRoutes)

module.exports = router