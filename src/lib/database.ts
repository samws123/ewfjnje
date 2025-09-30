import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

console.log("DATABASE_URL", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export interface User {
  id: string;
  email: string;
  name?: string;
  password_hash?: string;
  sso_provider?: string;
  email_verified: boolean;
  created_at: string;
}

export interface VerificationCode {
  id: string;
  email: string;
  code: string;
  expires_at: string;
  used: boolean;
  created_at: string;
}

export interface School {
  id: string;
  name: string;
  lms: string;
  base_url: string;
}

export interface UserProfile {
  user_id: string;
  school_id?: string;
  lms?: string;
  base_url?: string;
  last_sync?: string;
}

// Initialize database tables
export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    // Enable uuid extension if not exists
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    
    // Create users table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        password_hash VARCHAR(255),
        sso_provider VARCHAR(50),
        email_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create email verification codes table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS email_verification_codes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) NOT NULL,
        code VARCHAR(6) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create schools table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        lms TEXT NOT NULL,
        base_url TEXT NOT NULL
      )
    `);

    // Create user_profile table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_profile (
        user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        school_id UUID REFERENCES schools(id),
        lms TEXT,
        base_url TEXT,
        last_sync TIMESTAMP
      )
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// User operations
export async function createUser(email: string, name?: string, password?: string, ssoProvider?: string): Promise<User> {
  const client = await pool.connect();
  try {
    const passwordHash = password ? await bcrypt.hash(password, 12) : null;
    
    console.log('Creating user with:', { email, name, ssoProvider });
    
    const result = await client.query(
      `INSERT INTO users (email, name, password_hash, sso_provider, email_verified) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [email, name, passwordHash, ssoProvider, ssoProvider ? true : false]
    );

    if (result.rows.length === 0) {
      throw new Error('Failed to create user - no rows returned');
    }

    console.log('User created successfully:', result.rows[0]);
    return result.rows[0];
  } catch (error: any) {
    console.error('Error in createUser:', error);
    if (error.code === '23505') { // Unique constraint violation
      throw new Error('User with this email already exists');
    }
    throw new Error(`Failed to create user: ${error.message}`);
  } finally {
    client.release();
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error: any) {
    throw new Error(`Failed to get user: ${error.message}`);
  } finally {
    client.release();
  }
}

export async function updateUserEmailVerified(email: string, verified: boolean = true): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(
      'UPDATE users SET email_verified = $1 WHERE email = $2',
      [verified, email]
    );
  } catch (error: any) {
    throw new Error(`Failed to update user verification: ${error.message}`);
  } finally {
    client.release();
  }
}

export async function verifyPassword(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email);
  if (!user || !user.password_hash) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  return isValid ? user : null;
}

// Verification code operations
export async function createVerificationCode(email: string, code: string): Promise<VerificationCode> {
  const client = await pool.connect();
  try {
    // Clean up old codes for this email
    await client.query(
      'DELETE FROM email_verification_codes WHERE email = $1',
      [email]
    );

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minutes expiry

    const result = await client.query(
      `INSERT INTO email_verification_codes (email, code, expires_at) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [email, code, expiresAt]
    );

    if (result.rows.length === 0) {
      throw new Error('Failed to create verification code');
    }

    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to create verification code: ${error.message}`);
  } finally {
    client.release();
  }
}

export async function verifyCode(email: string, code: string): Promise<boolean> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM email_verification_codes 
       WHERE email = $1 AND code = $2 AND used = FALSE`,
      [email, code]
    );

    if (result.rows.length === 0) {
      return false;
    }

    const verificationCode = result.rows[0];

    // Check if code is expired
    if (new Date() > new Date(verificationCode.expires_at)) {
      return false;
    }

    // Mark code as used
    await client.query(
      'UPDATE email_verification_codes SET used = TRUE WHERE id = $1',
      [verificationCode.id]
    );

    return true;
  } catch (error: any) {
    console.error('Error verifying code:', error);
    return false;
  } finally {
    client.release();
  }
}

export async function cleanupExpiredCodes(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(
      'DELETE FROM email_verification_codes WHERE expires_at < NOW()'
    );
  } catch (error: any) {
    console.error('Error cleaning up expired codes:', error);
  } finally {
    client.release();
  }
}

// School operations
export async function createSchool(name: string, lms: string, baseUrl: string): Promise<School> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO schools (name, lms, base_url) VALUES ($1, $2, $3) RETURNING *',
      [name, lms, baseUrl]
    );
    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to create school: ${error.message}`);
  } finally {
    client.release();
  }
}

export async function getSchoolByName(name: string): Promise<School | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM schools WHERE name = $1',
      [name]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error: any) {
    throw new Error(`Failed to get school: ${error.message}`);
  } finally {
    client.release();
  }
}

export async function searchSchools(query: string): Promise<School[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM schools WHERE name ILIKE $1 ORDER BY name LIMIT 10',
      [`%${query}%`]
    );
    return result.rows;
  } catch (error: any) {
    throw new Error(`Failed to search schools: ${error.message}`);
  } finally {
    client.release();
  }
}

// User profile operations
export async function createUserProfile(userId: string, schoolId?: string, lms?: string, baseUrl?: string): Promise<UserProfile> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO user_profile (user_id, school_id, lms, base_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, schoolId, lms, baseUrl]
    );
    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to create user profile: ${error.message}`);
  } finally {
    client.release();
  }
}

export async function updateUserProfile(userId: string, schoolId?: string, lms?: string, baseUrl?: string): Promise<UserProfile> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO user_profile (user_id, school_id, lms, base_url) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (user_id) 
       DO UPDATE SET school_id = $2, lms = $3, base_url = $4
       RETURNING *`,
      [userId, schoolId, lms, baseUrl]
    );
    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to update user profile: ${error.message}`);
  } finally {
    client.release();
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM user_profile WHERE user_id = $1',
      [userId]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error: any) {
    throw new Error(`Failed to get user profile: ${error.message}`);
  } finally {
    client.release();
  }
}

// Database will be initialized on-demand when needed
