const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3004;
const DBSTRING = 'mongodb+srv://ushanrashmika23_db_user:1vZE8sjB1mW4RF6g@cluster-leafy.54pzqyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-leafy';

app.get('/test', (req, res) => {
    res.send('Leafy Server is working smoothly...');
});

const UserPlantRoutes = require('./routes/UserPlant.route');
app.use('/userplants', UserPlantRoutes);

mongoose.connect(DBSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('### ## # MongoDB connected'))
    .catch((error) => console.error('!!! !! ! MongoDB connection error:', error));

app.listen(PORT, () => {
    console.log(`### ## # Server is running on port ${PORT}`);
});