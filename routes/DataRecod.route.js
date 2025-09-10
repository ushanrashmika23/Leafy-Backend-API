const DataRecod = require('../controller/DataRecod.controller');
const express = require('express');
const router = express.Router();

router.post('/add', DataRecod.addNewRecod);
router.get('/all', DataRecod.getAllRecods);

module.exports = router;
