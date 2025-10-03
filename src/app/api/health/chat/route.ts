import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import '@/lib/init-db'; // Ensure database is initialized

export async function GET(request: NextRequest) {
  try {
    // Test basic database connection
    const testQuery = await query('SELECT NOW() as current_time');
    
    // Test if conversations table exists
    const conversationsTest = await query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_name = 'conversations'
    `);
    
    // Test if messages table exists
    const messagesTest = await query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_name = 'messages'
    `);
    
    // Test sample conversation query
    const sampleConversations = await query(`
      SELECT COUNT(*) as total_conversations 
      FROM conversations
    `);
    
    return NextResponse.json({
      success: true,
      database: {
        connected: true,
        currentTime: testQuery.rows[0].current_time,
        tables: {
          conversations: conversationsTest.rows[0].count > 0,
          messages: messagesTest.rows[0].count > 0
        },
        stats: {
          totalConversations: sampleConversations.rows[0].total_conversations
        }
      }
    });
  } catch (error: any) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      database: {
        connected: false
      }
    }, { status: 500 });
  }
}
