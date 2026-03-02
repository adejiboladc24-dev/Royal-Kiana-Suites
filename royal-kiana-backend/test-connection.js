require('dotenv').config();
const db = require('./config/db');

db.connect()
  .then((client) => {
    console.log('✓ Database Connected Successfully');
    client.release();
    process.exit(0);
  })
  .catch((err) => {
    console.error('✗ Database connection failed:', err.message);
    process.exit(1);
  });
