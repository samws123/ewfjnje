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

// User operations
export async function createUser(email: string, name?: string, password?: string, ssoProvider?: string): Promise<User> {
  const passwordHash = password ? await bcrypt.hash(password, 12) : null;
  
  const { data, error } = await supabase
    .from('users')
    .insert({
      email,
      name,
      password_hash: passwordHash,
      sso_provider: ssoProvider,
      email_verified: ssoProvider ? true : false // SSO users are pre-verified
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }

  return data;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    throw new Error(`Failed to get user: ${error.message}`);
  }

  return data;
}

export async function updateUserEmailVerified(email: string, verified: boolean = true): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ email_verified: verified })
    .eq('email', email);

  if (error) {
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
  // Clean up old codes for this email
  await supabase
    .from('email_verification_codes')
    .delete()
    .eq('email', email);

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minutes expiry

  const { data, error } = await supabase
    .from('email_verification_codes')
    .insert({
      email,
      code,
      expires_at: expiresAt.toISOString()
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create verification code: ${error.message}`);
  }

  return data;
}

export async function verifyCode(email: string, code: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('email_verification_codes')
    .select('*')
    .eq('email', email)
    .eq('code', code)
    .eq('used', false)
    .single();

  if (error || !data) {
    return false;
  }

  // Check if code is expired
  if (new Date() > new Date(data.expires_at)) {
    return false;
  }

  // Mark code as used
  await supabase
    .from('email_verification_codes')
    .update({ used: true })
    .eq('id', data.id);

  return true;
}

export async function cleanupExpiredCodes(): Promise<void> {
  await supabase
    .from('email_verification_codes')
    .delete()
    .lt('expires_at', new Date().toISOString());
}
