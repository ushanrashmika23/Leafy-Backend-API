const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3004;
const DBSTRING = process.env.MONGODB_URI || 'mongodb+srv://ushanrashmika23_db_user:1vZE8sjB1mW4RF6g@cluster-leafy.54pzqyh.mongodb.net/leafy?retryWrites=true&w=majority&appName=Cluster-leafy';

app.get('/test', (req, res) => {
    res.send('Leafy Server is working smoothly...');
});

const UserPlantRoutes = require('./routes/UserPlant.route');
app.use('/userplants', UserPlantRoutes);
const DataRecodRoutes = require('./routes/DataRecod.route');
app.use('/datarecods', DataRecodRoutes);
const ControllerDeviceRoutes = require('./routes/ControllerDevice.route');
app.use('/controldevices', ControllerDeviceRoutes);

mongoose.connect(DBSTRING, {
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
})
    .then(() => console.log('### ## # MongoDB connected'))
    .catch((error) => console.error('!!! !! ! MongoDB connection error:', error));

app.listen(PORT, () => {
    console.log(`### ## # Server is running on port ${PORT}`);
});