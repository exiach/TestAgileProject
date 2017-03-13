var router = require('express').Router(),
    taskController = require('../controllers/tasks.js');

router.get('/', taskController.getAll);

router.get('/:taskId', taskController.getOne);

router.post('/', taskController.save);

router.delete('/:taskId', taskController.remove);

router.put('/:taskId', taskController.update);

module.exports = router;

