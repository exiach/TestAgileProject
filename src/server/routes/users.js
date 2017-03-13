var router = require('express').Router(),
    userController = require('../controllers/users.js');

router.post('/', userController.save);

router.get('/', userController.getAll);

router.get('/:userId', userController.getOne);

router.delete('/:userId', userController.remove);

router.put('/:userId', userController.update);

module.exports = router;
