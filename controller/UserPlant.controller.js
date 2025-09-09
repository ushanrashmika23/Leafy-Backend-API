const UserPlant = require('../models/UserPlant.model');

const addPlant = (req, res) => {
    const data = req.body;
    const newPlant = new UserPlant(data);
    newPlant.save()
        .then(() => res.status(201).json({
            code: 201,
            status: 'success',
            data: { message: 'Plant added successfully' }
        }))
        .catch((error) => res.status(500).json({
            code: 500,
            status: 'error',
            data: { error: 'Failed to add plant', details: error.message }
        }));
};

const getPlants = (req, res) => {
    UserPlant.find()
        .then((plants) => res.status(200).json({
            code: 200,
            status: 'success',
            data: { plants }
        }))
        .catch((error) => res.status(500).json({
            code: 500,
            status: 'error',
            data: { error: 'Failed to retrieve plants', details: error.message }
        }));
};

module.exports = { addPlant, getPlants }