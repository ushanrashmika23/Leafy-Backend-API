const express = require('express');
const router = express.Router();
const ControllerDevice = require('../controller/ControllDevice.controller');

router.post('/add', ControllerDevice.addDeviceStatus);
router.get('/all', ControllerDevice.listDeviceStatus);
router.put('/update/:id', ControllerDevice.updateDeviceStatus);

module.exports = router;