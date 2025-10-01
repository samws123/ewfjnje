import { initializeDatabase } from './database';

// Initialize database tables on application startup
let isInitialized = false;

export async function ensureDatabaseInitialized() {
  if (!isInitialized) {
    try {
      await initializeDatabase();
      isInitialized = true;
      console.log('Database initialized successfully on startup');
    } catch (error) {
      console.error('Failed to initialize database on startup:', error);
      // Don't throw error to prevent app from crashing
    }
  }
}

// Initialize immediately when this module is imported
// ensureDatabaseInitialized();
