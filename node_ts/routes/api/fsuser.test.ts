const db: any = require('../../db');

beforeAll(() => {
  db.query('delete FROM fs_user where uuid = $1', ['99823f0c-75e4-4fb5-b4bf-3d3e47f742e1']).then();
}
);

afterAll(() => {
  db.query('delete FROM fs_user where uuid = $1', ['99823f0c-75e4-4fb5-b4bf-3d3e47f742e1']).then();
  db.end();
}
);

test('fs_user', async () => {
  try {
    const insert = await db.query('INSERT into fs_user (uuid, date_created, date_last_login) values ($1, now(), now())', ['99823f0c-75e4-4fb5-b4bf-3d3e47f742e1']);
    expect(insert.rowCount).toBe(1);
    const select = await db.query('SELECT * FROM fs_user where uuid = $1', ['99823f0c-75e4-4fb5-b4bf-3d3e47f742e1']);
    expect(select.rows[0].uuid).toEqual('99823f0c-75e4-4fb5-b4bf-3d3e47f742e1');
    const updateLastLogin = await db.query('UPDATE fs_user set date_last_login = now() where uuid=$1', ['99823f0c-75e4-4fb5-b4bf-3d3e47f742e1']);
    expect(updateLastLogin.rowCount).toBe(1);
  } catch (err) {
    console.log(err.stack);
  }
});
