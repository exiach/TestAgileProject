var router = require('express').Router(),
    projectController = require('../controllers/project.js'),
    storyController = require('../controllers/story.js');

router.get('/', projectController.getAll);

router.get('/:_id', projectController.getOne);

router.post('/', projectController.save);

router.put('/:_id', projectController.update);

router.post('/:_id/users', projectController.addUser);

router.get('/:_id/users', projectController.getUsers);

router.get('/:projectId/user-story', storyController.getAll);

router.get('/:projectId/user-story/:storyId', storyController.getOne);

router.post('/:projectId/user-story', storyController.save);

router.put('/:projectId/user-story/:storyId', storyController.update);

router.delete('/:projectId/user-story/:storyId', storyController.remove);

module.exports = router;