import Router from 'express-promise-router';

const router: any = Router();
const db: any = require('../../db');

router.get('/:uuid', async (req: any, res: any) => {
  const { rows } = await db.query('SELECT * FROM fs_user where uuid = $1', [req.params.uuid]);
  res.send(rows);
});

// Create user
router.post('/:uuid', async (req:any, res:any) => {
  const { rows } = await db.query('INSERT into fs_user (uuid, date_created, date_last_login) values ($1, now(), now())', [req.params.uuid]);
  res.send(rows[0]);
});

// Update user login time
router.post(('/lastlogin/:uuid'), async (req:any, res:any) => {
  const { rows } = await db.query('UPDATE fs_user set date_last_login = now() where uuid=$1', [req.params.uuid]);
  res.send(rows[0]);
});

module.exports = router;
