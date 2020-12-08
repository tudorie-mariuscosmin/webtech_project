const router = require('express').Router()
const { authController } = require('../controllers')

router.post('/login', authController.login)
router.get('/test', authController.authMiddleware.authenticate, (req, res) => {
    res.send(req.user)
})


module.exports = router