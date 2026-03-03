const db = require('../config/db');

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'customer',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await db.query(query);
    
    // Add role column if it doesn't exist (for existing databases)
    try {
      await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT \'customer\'');
    } catch (alterError) {
      // Column might already exist, ignore error
    }
    
    console.log('Users table ready with role column');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

const User = {
  create: async (name, email, hashedPassword, role = 'customer') => {
    const query = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at';
    const values = [name, email, hashedPassword, role];
    const result = await db.query(query, values);
    const user = result.rows[0];
    // Ensure role is set
    if (!user.role) {
      user.role = 'customer';
    }
    return user;
  },

  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    const user = result.rows[0];
    // Ensure role is set for existing users
    if (user && !user.role) {
      user.role = 'customer';
    }
    return user;
  },

  findById: async (id) => {
    const query = 'SELECT id, name, email, role, created_at FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  updateProfile: async (id, name) => {
    const query = 'UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, email, role, created_at';
    const result = await db.query(query, [name, id]);
    return result.rows[0];
  },

  updatePassword: async (id, hashedPassword) => {
    const query = 'UPDATE users SET password = $1 WHERE id = $2 RETURNING id, email';
    const result = await db.query(query, [hashedPassword, id]);
    return result.rows[0];
  },

  updateRole: async (id, role) => {
    const query = 'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role';
    const result = await db.query(query, [role, id]);
    return result.rows[0];
  }
};

module.exports = { User, createUsersTable };