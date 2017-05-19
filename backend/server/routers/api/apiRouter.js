'use strict';

var express = require('express');
var router = express.Router();
var folder = require('./../../controllers/api/folderController');
var authMiddleware = require('../../middleware/auth.middleware');

router.use(authMiddleware);

router.route('/folder')
    .get(folder.list)
    .post(folder.create)
    .delete(folder.delete);

module.exports = router;