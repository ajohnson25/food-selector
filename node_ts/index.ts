import * as express from 'express';
import * as path from 'path';
const port = process.env.PORT || 3000;

const app: any = express.default();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api/foods', require('./routes/api/foods'));
app.use('/api/userFoodPreferences', require('./routes/api/userFoodPreferences'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = {};
