'use strict';

const Router = require('express').Router;
const controller = require('./maps.controller');

let router = new Router();

router.get('/', controller.index);
router.post('/', controller.setMap);
// router.get('/serverinfo', controller.serverinfo());
// router.get('/:cmd', controller.command());
// router.get('/', controller.index.bind(controller));
// router.get('/:id', controller.show.bind(controller));
// router.post('/', controller.create.bind(controller));
// router.put('/:id', controller.update.bind(controller));
// router.patch('/:id', controller.update.bind(controller));
// router.delete('/:id', controller.destroy.bind(controller));

module.exports = router;
