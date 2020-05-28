const db: any = require('../../db');

afterAll(() => {
  db.end();
}
);

test('fs_user', async () => {
  const client = await db.connect();
  expect.assertions(4);
  try {
    await client.query('BEGIN',[]);
    const insert = await client.query('INSERT into fs_user (uuid, date_created, date_last_login) values ($1, now(), now())', ['99823f0c-75e4-4fb5-b4bf-3d3e47f742e1']);
    expect(insert.rowCount).toBe(1);
    const select = await client.query('SELECT * FROM fs_user where uuid = $1', ['99823f0c-75e4-4fb5-b4bf-3d3e47f742e1']);
    expect(select.rows[0].uuid).toEqual('99823f0c-75e4-4fb5-b4bf-3d3e47f742e1');
    const updateLastLogin = await client.query('UPDATE fs_user set date_last_login = now() where uuid=$1', ['99823f0c-75e4-4fb5-b4bf-3d3e47f742e1']);
    expect(updateLastLogin.rowCount).toBe(1);
    expect(1).toBe(1); //This is to be sure all assertions run
    await client.query('ROLLBACK',[]);
  } catch (err) {
    await client.query('ROLLBACK',[]);
    console.log(err.stack);
  } finally {
    client.release();
  }
});
