var router = require('express').Router(),
    storyController = require('../controllers/story.js');

router.get('/', storyController.getAll);

router.get('/:storyId', storyController.getOne);

router.post('/', storyController.save);

router.put('/:storyId', storyController.update);

router.delete('/:storyId', storyController.remove);

module.exports = router;
