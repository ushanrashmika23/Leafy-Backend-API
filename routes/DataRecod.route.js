const UserPlantController = require('../controller/UserPlant.controller');
const express = require('express');
const router = express.Router();

router.post('/add', UserPlantController.addPlant);
router.get('/all', UserPlantController.getPlants);

module.exports = router;
