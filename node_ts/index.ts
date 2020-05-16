import express from 'express';
import path from 'path';
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api/foods', require('./routes/api/foods'));
app.use('/api/userFoodPreferences', require('./routes/api/userFoodPreferences'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
