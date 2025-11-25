const mongoose = require('mongoose');
const controllDeviceSchema = new mongoose.Schema({
    temp: { type: Number, required: true },
    humidity: { type: Number, required: true },
    soilmoisture: { type: Number, required: true },
    sunlight: { type: Number, required: true },
}, { timestamps: true });
const ControllDevice = mongoose.model('ControllDevice', controllDeviceSchema);
module.exports = ControllDevice;