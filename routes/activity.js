const router = require('express').Router()
const { activityController, authController } = require('../controllers')
const { authMiddleware } = authController

router.post('/create', authMiddleware.authenticate, activityController.createActivity)
router.get('', authMiddleware.authenticate, activityController.getUserActivities)
router.put('/:activityId', authMiddleware.authenticate, activityController.updateActivities)

router.get('/:token', activityController.getActivity)
router.get('/feedback/:activityId', authMiddleware.authenticate, activityController.getFeedback)

module.exports = router