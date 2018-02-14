const router = require('express').Router();
const validator = require('../Lib/validator');
const controller = require('../Controller');

router.post('/fileReader', validator.fileReader(),
  controller.fileController.processFile);

module.exports = router;
