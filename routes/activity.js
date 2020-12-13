const router = require('express').Router()
const { activityController, authController } = require('../controllers')
const { authMiddleware } = authController

router.post('/create', authMiddleware.authenticate, activityController.createActivity)
router.get('', authMiddleware.authenticate, activityController.getUserActivities)

module.exports = router