'use strict';

const Router = require('express').Router;
const controller = require('./rcon.controller');

let router = new Router();

router.get('/status', controller.status());
router.get('/serverinfo', controller.serverinfo());
router.post('/setVar', controller.setVar);
router.get('/:cmd', controller.command());
// router.get('/', controller.index.bind(controller));
// router.get('/:id', controller.show.bind(controller));
// router.post('/', controller.create.bind(controller));
// router.put('/:id', controller.update.bind(controller));
// router.patch('/:id', controller.update.bind(controller));
// router.delete('/:id', controller.destroy.bind(controller));

module.exports = router;
