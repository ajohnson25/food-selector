import Router from 'express-promise-router';

const router: any = Router();
const db: any = require('../../db');

// Gets All Food Preferences
router.get('/', async (req: any, res: any) => {
  const { rows } = await db.query('SELECT * FROM user_food_preferences');
  res.send(rows);
});

router.get('/count', async (req: any, res: any) => {
  const { rows } = await db.query('SELECT count(*) FROM user_food_preferences');
  res.send(rows[0].count);
});

// Get a user's preferences
router.get('/:userUUID', async (req: any, res: any) => {
  const { userUUID } = req.params.userUUID;
  const { rows } = await db.query('SELECT * FROM user_food_preferences where user_uuid = $1', [userUUID]);
  res.send(rows[0]);
});

// Store food preference
router.post('/:userUUID', async (req: any, res: any) => {
  const { rows } = await db.query('INSERT INTO user_food_preferences (user_uuid, food_id, food_preference_id) values ($1,$2,$3)', [req.params.userUUID, req.body.foodId, req.body.foodPreferenceId]);
  res.send(rows[0]);
});

// Delete all food preferences for a uuid
router.delete('/:userUUID', async (req: any, res: any) => {
  const { rows } = await db.query('DELETE FROM user_food_preferences where user_uuid = $1', [req.params.userUUID]);
  res.send(rows[0]);
});

// Delete one food for a uuid
router.delete('/:userUUID/:foodId', async (req: any, res: any) => {
  const { rows } = await db.query('DELETE FROM user_food_preferences where user_uuid = $1 and food_id = $2', [req.params.userUUID, req.params.foodId]);
  res.send(rows[0]);
});

module.exports = router;
