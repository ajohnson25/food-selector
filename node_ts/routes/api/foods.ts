import Router from 'express-promise-router';

const router: any = Router();
const db: any = require('../../db');

// Gets All Foods
router.get('/', async (req: any, res: any) => {
  const { rows } = await db.query('SELECT * FROM foods');
  res.send(rows);
});

router.get('/count', async (req: any, res: any) => {
  const { rows } = await db.query('SELECT count(*) FROM foods');
  res.send(rows[0].count);
});

// Get Single Food
router.get('/:id', async (req:any, res:any) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM foods where id = $1', [id]);
  res.send(rows[0]);
});

module.exports = router;
