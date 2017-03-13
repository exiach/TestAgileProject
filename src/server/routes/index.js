var router = require('express').Router(),
    tokenValidator = require('../utils/middlewares.js');

router.use('/auth', require('./auth.js'));
router.use(tokenValidator.validateToken);
router.use('/users', require('./users.js'));
router.use('/tasks', require('./tasks.js'));
router.use('/project', require('./project.js'));

module.exports = router;
