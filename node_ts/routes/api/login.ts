import Router from 'express-promise-router';
import jwt from 'jsonwebtoken';

const router: any = Router();

// Get a token based on the UUID
router.post('/:userUUID', async (req:any, res:any) => {
  const user: any = {
    id: req.params.userUUID
  };

  jwt.sign({ user }, 'secretkey', (err: any, token: any) => {
    if (err) {
      console.log(err.stack);
    }

    res.json({
      token
    });
  });
});

module.exports = router;
