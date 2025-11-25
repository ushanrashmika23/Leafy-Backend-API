const ControllDevice = require('../models/ControllDevices.model');

const listDeviceStatus = (req, res) => {
    ControllDevice.find()
        .then((devices) => res.status(200).json({
            code: 200,
            status: 'success',
            data: { devices }
        }))
        .catch((error) => res.status(500).json({
            code: 500,
            status: 'error',
            data: { error: 'Failed to retrieve device statuses', details: error.message }
        }));
};

const addDeviceStatus = (req, res) => {
    const data = req.body;
    const newDevice = new ControllDevice(data);
    newDevice.save()
        .then(() => res.status(201).json({
            code: 201,
            status: 'success',
            data: { message: 'Device status added successfully' }
        }))
        .catch((error) => res.status(500).json({
            code: 500,
            status: 'error',
            data: { error: 'Failed to add device status', details: error.message }
        }));
};

const updateDeviceStatus = (req, res) => {
    const deviceId = req.params.id;
    const updateData = req.body;
    ControllDevice.findByIdAndUpdate(deviceId, updateData, { new: true })
        .then((updatedDevice) => {
            if (!updatedDevice) {
                return res.status(404).json({
                    code: 404,
                    status: 'error',
                    data: { error: 'Device not found' }
                });
            }
            res.status(200).json({
                code: 200,
                status: 'success',
                data: { message: 'Device status updated successfully', updatedDevice }
            });
        })
        .catch((error) => res.status(500).json({
            code: 500,
            status: 'error',
            data: { error: 'Failed to update device status', details: error.message }
        }));
};

module.exports = { listDeviceStatus, addDeviceStatus, updateDeviceStatus };