const db = require('../config/db');

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await db.query(query);
    console.log('Users table ready');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

const User = {
  create: async (name, email, hashedPassword) => {
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at';
    const values = [name, email, hashedPassword];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  },

  findById: async (id) => {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  updateProfile: async (id, name) => {
    const query = 'UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, email, created_at';
    const result = await db.query(query, [name, id]);
    return result.rows[0];
  },

  updatePassword: async (id, hashedPassword) => {
    const query = 'UPDATE users SET password = $1 WHERE id = $2 RETURNING id, email';
    const result = await db.query(query, [hashedPassword, id]);
    return result.rows[0];
  }
};

module.exports = { User, createUsersTable };
