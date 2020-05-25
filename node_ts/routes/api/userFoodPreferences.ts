import Router from 'express-promise-router';
import jwt from 'jsonwebtoken';

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
  const { rows } = await db.query('SELECT * FROM user_preferences_for_foods where user_uuid = $1', [req.params.userUUID]);
  res.send(rows);
});

// Store food preference
router.post('/:userUUID', async (req: any, res: any) => {
  const { rows } = await db.query('INSERT INTO user_food_preferences (user_uuid, food_id, food_preference_id) values ($1,$2,$3)', [req.params.userUUID, req.body.foodId, req.body.foodPreferenceId]);
  res.send(rows[0]);
});

// Delete all food preferences for a uuid
router.delete('/:userUUID', verifyToken, async (req: any, res: any) => {
  jwt.verify(req.token, 'secretkey', (err: any, authData: any) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Deleted...',
        authData
      });
    }
  });
  const { rows } = await db.query('DELETE FROM user_food_preferences where user_uuid = $1', [req.params.userUUID]);
  res.send(rows[0]);
});

// Delete one food for a uuid
router.delete('/:userUUID/:foodId', async (req: any, res: any) => {
  const { rows } = await db.query('DELETE FROM user_food_preferences where user_uuid = $1 and food_id = $2', [req.params.userUUID, req.params.foodId]);
  res.send(rows[0]);
});

function verifyToken (req: any, res: any, next: any) {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')[1]; // Bearers start with the word Bearer plus the token, get the token
    req.token = bearer;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
