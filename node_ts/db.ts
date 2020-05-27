export const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5433/foodSelector',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

function end () {
  pool.end();
}

module.exports = {
  query: (text: any, params: any) => pool.query(text, params),
  end: () => end()
};
