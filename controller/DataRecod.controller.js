const DataRecod = require('../models/DataRecod.model')

const addNewRecod = (req, res) => {
    const data = req.body;
    const newRecod = new DataRecod(data);
    newRecod.save()
        .then(() => res.status(201).json({
            code: 201,
            status: 'success',
            data: { message: 'Data Recod added successfully' }
        }))
        .catch((error) => res.status(500).json({
            code: 500,
            status: 'error',
            data: { error: 'Failed to add data recod', details: error.message }
        }));
};

const getAllRecods = (req, res) => {
    DataRecod.find()
        .then((recods) => res.status(200).json({
            code: 200,
            status: 'success',
            data: { recods }
        }))
        .catch((error) => res.status(500).json({
            code: 500,
            status: 'error',
            data: { error: 'Failed to retrieve data recods', details: error.message }
        }));
};

const getLatestRecod = (req, res) => {
    DataRecod.findOne().sort({ Date: -1, Time: -1 })
        .then((recod) => res.status(200).json({
            code: 200,
            status: 'success',
            data: { recod }
        }))
        .catch((error) => res.status(500).json({
            code: 500,
            status: 'error',
            data: { error: 'Failed to retrieve latest data recod', details: error.message }
        }));
};

module.exports = { addNewRecod, getAllRecods, getLatestRecod }