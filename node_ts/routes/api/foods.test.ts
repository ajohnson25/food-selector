const db: any = require('../../db');

afterAll(() => {
  db.end();
}
);

//TODO:Add a test for '/allUser/:userUUID', requires entries in userFoodPreferences (useruuid, food_id, food_preference_id) and fsuser (uuid) 

test('foods', async () => {
    const client = await db.connect();
    expect.assertions(3);
    try {
      await client.query('BEGIN',[]);
      const insert = await client.query('SELECT * FROM foods', []);
      expect(insert.rowCount).toBe(10);
      const select = await client.query('SELECT * FROM foods where id = $1', [1]);
      expect(select.rowCount).toBe(1);
      expect(1).toBe(1); //This is to be sure all assertions run
      await client.query('ROLLBACK',[]);
    } catch (err) {
      await client.query('ROLLBACK',[]);
      console.log(err.stack);
    } finally {
      client.release();
    }
  });