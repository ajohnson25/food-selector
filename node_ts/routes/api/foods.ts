import Router from 'express-promise-router';
import VerifyToken from '../../verifyToken';

const router: any = Router();
const db: any = require('../../db');

// Gets All Foods
router.get('/', async (req: any, res: any) => {
  const { rows } = await db.query('SELECT * FROM foods');
  res.send(rows);
});

/* Gets All of the foods that a user hasn't evaluated yet, this is a user_preference_foods function and
* all of those methods are protected */
router.get('/allUser/:userUUID', VerifyToken.verifyToken, async (req: any, res: any) => {
  const { rows } = await db.query('SELECT get_remaining_foods($1) as food_id', [req.params.userUUID]);
  res.send(rows);
});

// Get Single Food
router.get('/:id', async (req:any, res:any) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM foods where id = $1', [id]);
  res.send(rows[0]);
});

module.exports = router;
