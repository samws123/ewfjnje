import { NextRequest, NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/lib/database';
import { resolveUserId } from '../utils/user-management';

/**
 * GET /api/chat/messages?conversationId=xxx
 * Get messages for a specific conversation with pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: 'conversationId is required' },
        { status: 400 }
      );
    }
    
    const messages = await getMessages(conversationId, limit, offset);

    return NextResponse.json({
      success: true,
      messages,
      pagination: {
        limit,
        offset,
        hasMore: messages.length === limit
      }
    });
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/chat/messages
 * Add a new message to a conversation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationId, role, content, metadata } = body;
    
    if (!conversationId || !role || !content) {
      return NextResponse.json(
        { success: false, error: 'conversationId, role, and content are required' },
        { status: 400 }
      );
    }
    
    if (!['user', 'assistant'].includes(role)) {
      return NextResponse.json(
        { success: false, error: 'role must be either "user" or "assistant"' },
        { status: 400 }
      );
    }
    
    const message = await addMessage(conversationId, role, content, metadata);

    return NextResponse.json({
      success: true,
      message
    });
  } catch (error: any) {
    console.error('Error adding message:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
