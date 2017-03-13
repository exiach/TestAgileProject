var router = require('express').Router(),
    authController = require('../controllers/auth.js');

router.post('/login', authController.login);
router.post('/signUp', authController.signUp);

module.exports = router;
