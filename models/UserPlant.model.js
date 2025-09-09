const mongoose = require('mongoose');

const userPlantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    temperature: { type: Array, required: true },
    humidity: { type: Array, required: true },
    sunLight: { type: Array, required: true },
    soilMoisture: { type: Array, required: true },
    Date: { type: String, default: new Date().toLocaleDateString() },
});

const UserPlant = mongoose.model('UserPlant', userPlantSchema);

module.exports = UserPlant;