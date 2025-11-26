const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3004;
const DBSTRING = process.env.MONGODB_URI || 'mongodb+srv://ushanrashmika23_db_user:CYwfIXiWx63MELeE@cluster-leafy.54pzqyh.mongodb.net/leafy?retryWrites=true&w=majority&appName=Cluster-leafy';

// Load routes
const UserPlantRoutes = require('./routes/UserPlant.route');
const DataRecodRoutes = require('./routes/DataRecod.route');
const ControllerDeviceRoutes = require('./routes/ControllerDevice.route');

mongoose.connect(DBSTRING)
    .then(() => {
        console.log('MongoDB connected');
        // Use routes
        app.use('/userplants', UserPlantRoutes);
        app.use('/datarecods', DataRecodRoutes);
        app.use('/controldevices', ControllerDeviceRoutes);

        // Now start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.error('MongoDB connection error:', error));

app.get('/test', (req, res) => {
    res.send('Leafy Server is working smoothly...');
});