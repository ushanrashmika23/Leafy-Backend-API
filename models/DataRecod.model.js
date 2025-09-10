const mongoose = require('mongoose');

const userPlantSchema = new mongoose.Schema({
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    sunLight: { type: Number, required: true },
    soilMoisture: { type: Number, required: true },
    Date: { type: String, default: () => {
        const now = new Date();
        return `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`;
    }},
    Time: { type: String, default: () => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    }},
}, { timestamps: true });

const UserPlantData = mongoose.model('UserPlantData', userPlantSchema);
module.exports = UserPlantData;