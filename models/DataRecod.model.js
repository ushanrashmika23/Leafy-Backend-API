const mongoose = require('mongoose');

const userPlantSchema = new mongoose.Schema({
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    sunLight: { type: Number, required: true },
    soilMoisture: { type: Number, required: true },
    Date: { type: String, default: new Date().toLocaleDateString() },
    Time: { type: String, default: new Date().toLocaleTimeString() },
});

const UserPlantData = mongoose.model('UserPlantData', userPlantSchema);
module.exports = UserPlantData;