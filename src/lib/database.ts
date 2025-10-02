import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

console.log("DATABASE_URL", process.env.DATABASE_URL);

// Add error handling for the pool
let pooll;
export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
  }
  if (!pooll) {
    pooll = new Pool({ 
      connectionString: process.env.DATABASE_URL, 
      max: 5, 
      ssl: process.env.DATABASE_URL?.includes('supabase') ? { rejectUnauthorized: false } : false
    });
  }
  return pooll;
}

export const pool = getPool();



// Export the pool for reuse across the project


// Optimized query function - uses pool directly without creating clients
export async function query(text: string, params?: any[], retries = 2): Promise<any> {
  const p = getPool();
  return p.query(text, params);
}


// Helper function to identify connection-related errors
function isConnectionError(error: any): boolean {
  const connectionErrors = [
    'Connection terminated',
    'connection timeout',
    'ECONNRESET',
    'ENOTFOUND',
    'ETIMEDOUT',
    'connection closed'
  ];
  
  return connectionErrors.some(errType => 
    error.message?.toLowerCase().includes(errType.toLowerCase())
  );
}

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
  try {
    // Enable uuid extension if not exists
    await query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    
    // Create users table if it doesn't exist
    await query(`
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
    await query(`
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
    await query(`
      CREATE TABLE IF NOT EXISTS schools (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        lms TEXT NOT NULL,
        base_url TEXT NOT NULL
      )
    `);

    // Create user_profile table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS user_profile (
        user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        school_id UUID REFERENCES schools(id),
        lms TEXT,
        base_url TEXT,
        last_sync TIMESTAMP
      )
    `);

    // Create user_canvas_sessions table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS user_canvas_sessions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        base_url TEXT NOT NULL,
        session_cookie TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create courses table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS courses (
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        id BIGINT NOT NULL,
        name TEXT,
        course_code TEXT,
        term TEXT,
        raw_json JSONB,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (user_id, id)
      )
    `);

    // Add missing columns if they don't exist (migration)
    try {
      await query(`ALTER TABLE courses ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW()`);
      await query(`ALTER TABLE courses ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW()`);
    } catch (error: any) {
      // Ignore errors if columns already exist
      console.log('Courses table migration completed or columns already exist');
    }

    // Create assignments table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS assignments (
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        id BIGINT NOT NULL,
        course_id BIGINT NOT NULL,
        name TEXT,
        due_at TIMESTAMP,
        description TEXT,
        updated_at TIMESTAMP,
        points_possible DECIMAL,
        submission_types TEXT[],
        html_url TEXT,
        workflow_state TEXT,
        raw_json JSONB,
        created_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (user_id, id)
      )
    `);

    // Create announcements table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS announcements (
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        id BIGINT NOT NULL,
        course_id BIGINT NOT NULL,
        title TEXT,
        message TEXT,
        posted_at TIMESTAMP,
        created_at TIMESTAMP,
        last_reply_at TIMESTAMP,
        html_url TEXT,
        author_name TEXT,
        author_id BIGINT,
        read_state TEXT,
        locked BOOLEAN DEFAULT FALSE,
        published BOOLEAN DEFAULT FALSE,
        raw_json JSONB,
        PRIMARY KEY (user_id, id)
      )
    `);

    // Create grades table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS grades (
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        id BIGINT NOT NULL,
        assignment_id BIGINT NOT NULL,
        course_id BIGINT NOT NULL,
        student_id BIGINT,
        score DECIMAL,
        grade TEXT,
        excused BOOLEAN DEFAULT FALSE,
        late BOOLEAN DEFAULT FALSE,
        missing BOOLEAN DEFAULT FALSE,
        submitted_at TIMESTAMP,
        graded_at TIMESTAMP,
        workflow_state TEXT,
        submission_type TEXT,
        attempt INTEGER,
        raw_json JSONB,
        created_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (user_id, id)
      )
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// User operations
export async function createUser(email: string, name?: string, password?: string, ssoProvider?: string): Promise<User> {
  try {
    const passwordHash = password ? await bcrypt.hash(password, 12) : null;
    
    console.log('Creating user with:', { email, name, ssoProvider });
    
    const result = await query(
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
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error: any) {
    console.error('Database error in getUserByEmail:', error);
    
    // Handle specific database errors
    if (error.code === 'XX000' || error.message.includes('db_termination')) {
      console.error('Database connection terminated, retrying...');
      // Could implement retry logic here if needed
    }
    
    throw new Error(`Failed to get user: ${error.message}`);
  }
}

export async function updateUserEmailVerified(email: string, verified: boolean = true): Promise<void> {
  try {
    await query(
      'UPDATE users SET email_verified = $1 WHERE email = $2',
      [verified, email]
    );
  } catch (error: any) {
    throw new Error(`Failed to update user verification: ${error.message}`);
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
  try {
    // Clean up old codes for this email
    await query(
      'DELETE FROM email_verification_codes WHERE email = $1',
      [email]
    );

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minutes expiry

    const result = await query(
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
  }
}

export async function verifyCode(email: string, code: string): Promise<boolean> {
  try {
    const result = await query(
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
    await query(
      'UPDATE email_verification_codes SET used = TRUE WHERE id = $1',
      [verificationCode.id]
    );

    return true;
  } catch (error: any) {
    console.error('Error verifying code:', error);
    return false;
  }
}

export async function cleanupExpiredCodes(): Promise<void> {
  try {
    await query(
      'DELETE FROM email_verification_codes WHERE expires_at < NOW()'
    );
  } catch (error: any) {
    console.error('Error cleaning up expired codes:', error);
  }
}

// School operations
export async function createSchool(name: string, lms: string, baseUrl: string): Promise<School> {
  try {
    const result = await query(
      'INSERT INTO schools (name, lms, base_url) VALUES ($1, $2, $3) RETURNING *',
      [name, lms, baseUrl]
    );
    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to create school: ${error.message}`);
  }
}

export async function getSchoolByName(name: string): Promise<School | null> {
  try {
    const result = await query(
      'SELECT * FROM schools WHERE name = $1',
      [name]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error: any) {
    throw new Error(`Failed to get school: ${error.message}`);
  }
}

export async function searchSchools(searchQuery: string): Promise<School[]> {
  try {
    const result = await query(
      'SELECT * FROM schools WHERE name ILIKE $1 ORDER BY name LIMIT 10',
      [`%${searchQuery}%`]
    );
    return result.rows;
  } catch (error: any) {
    throw new Error(`Failed to search schools: ${error.message}`);
  }
}

// User profile operations
export async function createUserProfile(userId: string, schoolId?: string, lms?: string, baseUrl?: string): Promise<UserProfile> {
  try {
    const result = await query(
      'INSERT INTO user_profile (user_id, school_id, lms, base_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, schoolId, lms, baseUrl]
    );
    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to create user profile: ${error.message}`);
  }
}

export async function updateUserProfile(userId: string, schoolId?: string, lms?: string, baseUrl?: string): Promise<UserProfile> {
  try {
    const result = await query(
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
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const result = await query(
      'SELECT * FROM user_profile WHERE user_id = $1',
      [userId]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error: any) {
    throw new Error(`Failed to get user profile: ${error.message}`);
  }
}

// Database will be initialized on-demand when needed
