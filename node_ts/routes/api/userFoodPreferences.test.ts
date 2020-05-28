const uuid = require('uuid');
const db: any = require('../../db');
let userUUID = '';

beforeAll(() => {
  userUUID = uuid.v4();
});

afterAll(() => {
  db.end();
}
);

test('user_food_preferences', async () => {
  const client = await db.connect();
  const foodCount = 10;
  const prefsToTest = 4;

  expect.assertions(9);
  try {
    await client.query('BEGIN', []);
    // Create the fs_user
    const insertFsuser = await client.query('INSERT into fs_user (uuid, date_created, date_last_login) values ($1, now(), now())', [userUUID]);
    expect(insertFsuser.rowCount).toBe(1);
    // Get the list of all foods
    const insert = await client.query('SELECT * FROM foods', []);
    expect(insert.rowCount).toBe(foodCount);

    // Insert the amount set in prefsToTest
    let userPreference1: any[] = [];
    for (let i = 0; i < prefsToTest; i++) {
      userPreference1 = [...userPreference1, await client.query('INSERT INTO user_food_preferences (user_uuid, food_id, food_preference_id) values ($1,$2,$3)', [userUUID, i + 1, 1])];
    }
    expect(userPreference1.length).toBe(prefsToTest);

    // Get the food preference list for user
    const prefs = await client.query('SELECT * FROM user_preferences_for_foods where user_uuid = $1', [userUUID]);
    expect(prefs.rowCount).toBe(prefsToTest);

    // The count function should equal the above
    const countAgg = await client.query('SELECT * FROM user_preferences_for_foods where user_uuid = $1', [userUUID]);
    expect(countAgg.rowCount).toBe(prefs.rowCount);

    // Get the foods that would need to be evaluated
    const remainingFoods = await client.query('SELECT get_remaining_foods($1) as food_id', [userUUID]);
    expect(remainingFoods.rowCount).toBe(foodCount - prefsToTest);

    // The API has this but the application doesn't use this yet, delete single food
    const deleteFoodPrefs = await client.query('DELETE FROM user_food_preferences where user_uuid = $1 and food_id = $2', [userUUID, 1]);
    expect(deleteFoodPrefs.rowCount).toBe(1);

    // The api doesn't use this yet but delete what was put in
    const deleteAllFoodPrefs = await client.query('DELETE FROM user_food_preferences where user_uuid = $1', [userUUID]);
    expect(deleteAllFoodPrefs.rowCount).toBe(prefsToTest - 1);

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
