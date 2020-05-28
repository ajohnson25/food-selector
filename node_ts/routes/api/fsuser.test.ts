const db: any = require('../../db');
const uuid = require('uuid');

afterAll(() => {
  db.end();
}
);

test('fs_user', async () => {
  const client = await db.connect();
  // Have 4 assertions that need to run in order
  expect.assertions(4);
  try {
    const userUUID = uuid.v4();

    await client.query('BEGIN', []);
    // Insert a new user into fs_user, should only insert 1
    const insert = await client.query('INSERT into fs_user (uuid, date_created, date_last_login) values ($1, now(), now())', [userUUID]);
    expect(insert.rowCount).toBe(1);

    // Get the user back
    const select = await client.query('SELECT * FROM fs_user where uuid = $1', [userUUID]);
    expect(select.rows[0].uuid).toEqual(userUUID);

    // Update the date last login, should only get one back
    const updateLastLogin = await client.query('UPDATE fs_user set date_last_login = now() where uuid=$1', [userUUID]);
    expect(updateLastLogin.rowCount).toBe(1);

    // This is to be sure all assertions run
    expect(1).toBe(1);
    await client.query('ROLLBACK', []);
  } catch (err) {
    await client.query('ROLLBACK', []);
    console.log(err.stack);
  } finally {
    client.release();
  }
});
