const express = require('express');

const app = express();

const PORT = 3004;

app.get('/test', (req, res) => {
    res.send('Leafy Server it working smoothly 😎...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});