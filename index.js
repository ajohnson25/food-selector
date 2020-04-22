/* eslint-disable semi */
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/foods', require('./routes/api/foods'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
