import * as express from 'express';
import * as path from 'path';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const port = process.env.PORT || 3000;

const app: any = express.default();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api/foods', require('./routes/api/foods'));
app.use('/api/fsuser', require('./routes/api/fsuser'));
app.use('/api/userFoodPreferences', require('./routes/api/userFoodPreferences'));
app.use('/api/login', require('./routes/api/login'));

app.listen(port, () => console.log(`Food Selector server listening at http://localhost:${port}`));

module.exports = {};
