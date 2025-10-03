import { NextRequest, NextResponse } from 'next/server';
import { getConversations, createConversation, searchConversations } from '@/lib/database';
import { resolveUserId } from '../utils/user-management';
import '@/lib/init-db'; // Ensure database is initialized

/**
 * GET /api/chat/conversations
 * Get all conversations for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Get user ID from request headers or cookies
    const userId = await resolveUserId(request.headers.get('user-id') || 'anonymous');
    
    console.log('Fetching conversations for user:', userId);
    
    let conversations;
    if (search) {
      conversations = await searchConversations(userId, search, limit);
    } else {
      conversations = await getConversations(userId, limit, offset);
    }

    console.log('Found conversations:', conversations.length);

    return NextResponse.json({
      success: true,
      conversations,
      pagination: {
        limit,
        offset,
        hasMore: conversations.length === limit
      }
    });
  } catch (error: any) {
    console.error('Error fetching conversations:', error);
    
    // Return empty array instead of error to prevent UI from breaking
    return NextResponse.json({
      success: true,
      conversations: [],
      pagination: {
        limit: parseInt(new URL(request.url).searchParams.get('limit') || '50'),
        offset: parseInt(new URL(request.url).searchParams.get('offset') || '0'),
        hasMore: false
      }
    });
  }
}

/**
 * POST /api/chat/conversations
 * Create a new conversation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title } = body;
    
    // Get user ID from request headers or cookies
    const userId = await resolveUserId(request.headers.get('user-id') || 'anonymous');
    
    const conversation = await createConversation(userId, title);

    return NextResponse.json({
      success: true,
      conversation
    });
  } catch (error: any) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
