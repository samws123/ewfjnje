import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AzureADProvider from 'next-auth/providers/azure-ad';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createUser, getUserByEmail, verifyPassword } from '@/lib/database';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      tenantId: process.env.MICROSOFT_TENANT_ID!,
      authorization: {
        params: {
          scope: "openid profile email User.Read"
        }
      }
    }),
    CredentialsProvider({
      name: 'email-verification',
      credentials: {
        email: { label: 'Email', type: 'email' },
        code: { label: 'Verification Code', type: 'text' },
        isSignup: { label: 'Is Signup', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        try {
          // This will be handled by our verify-email endpoint
          // The credentials provider is mainly for session management
          const user = await getUserByEmail(credentials.email);
          
          if (user && user.email_verified) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              emailVerified: user.email_verified,
            };
          }
          
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('NextAuth signIn callback - user:', user);
      console.log('NextAuth signIn callback - account:', account);
      console.log('NextAuth signIn callback - profile:', profile);
      
      if (account?.provider === 'google' || account?.provider === 'azure-ad') {
        try {
          console.log(`${account.provider} sign-in attempt for email:`, user.email);
          const existingUser = await getUserByEmail(user.email!);
          console.log('Existing user found:', existingUser);
          
          if (!existingUser) {
            // Extract name from email if not provided by provider
            const nameFromEmail = user.name || user.email!.split('@')[0];
            console.log('Creating new user with name:', nameFromEmail);
            
            // Create new user with SSO
            await createUser(
              user.email!,
              nameFromEmail,
              undefined, // no password for SSO
              account.provider
            );
            console.log('New user created successfully');
          }
          
          return true;
        } catch (error) {
          console.error(`${account.provider} sign-in error:`, error);
          return false;
        }
      }
      
      console.log('SignIn callback - allowing sign in for provider:', account?.provider);
      return true;
    },
    async jwt({ token, user, account }) {
      console.log('NextAuth JWT callback - token:', token);
      console.log('NextAuth JWT callback - user:', user);
      console.log('NextAuth JWT callback - account:', account);
      
      if (user) {
        token.id = user.id;
        token.emailVerified = Boolean(user.emailVerified);
        console.log('JWT callback - set token from user:', { id: token.id, emailVerified: token.emailVerified });
      }
      
      if (account?.provider === 'google' || account?.provider === 'azure-ad') {
        // For SSO users, fetch the latest user data
        try {
          console.log('JWT callback - fetching user from database for email:', token.email);
          const dbUser = await getUserByEmail(token.email!);
          console.log('JWT callback - database user found:', dbUser);
          if (dbUser) {
            token.id = dbUser.id;
            token.emailVerified = dbUser.email_verified;
            token.name = dbUser.name;
            console.log('JWT callback - updated token with db user:', { id: token.id, emailVerified: token.emailVerified, name: token.name });
          }
        } catch (error) {
          console.error('JWT callback error:', error);
        }
      }
      
      console.log('JWT callback - final token:', token);
      return token;
    },
    async session({ session, token }) {
      console.log('NextAuth session callback - token:', token);
      console.log('NextAuth session callback - session:', session);
      
      if (token) {
        session.user.id = token.id as string;
        session.user.emailVerified = token.emailVerified as boolean;
      }
      
      console.log('NextAuth session callback - final session:', session);
      return session;
    },
  },
  pages: {
    signIn: '/signup',
    error: '/signup',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
