const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5433/foodSelector',
  ssl: !!process.env.DATABASE_URL
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};