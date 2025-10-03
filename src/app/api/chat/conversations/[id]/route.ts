import { NextRequest, NextResponse } from 'next/server';
import { getConversationWithMessages, updateConversation, deleteConversation } from '@/lib/database';
import { resolveUserId } from '../../utils/user-management';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/chat/conversations/[id]
 * Get a specific conversation with its messages
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: conversationId } = await params;
    
    // Get user ID from request headers or cookies
    const userId = await resolveUserId(request.headers.get('user-id') || 'anonymous');
    
    const result = await getConversationWithMessages(conversationId, userId);
    
    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Conversation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error: any) {
    console.error('Error fetching conversation:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/chat/conversations/[id]
 * Update a conversation (title, archive status, etc.)
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: conversationId } = await params;
    const body = await request.json();
    
    // Get user ID from request headers or cookies
    const userId = await resolveUserId(request.headers.get('user-id') || 'anonymous');
    
    const conversation = await updateConversation(conversationId, userId, body);
    
    if (!conversation) {
      return NextResponse.json(
        { success: false, error: 'Conversation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      conversation
    });
  } catch (error: any) {
    console.error('Error updating conversation:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/chat/conversations/[id]
 * Delete a conversation and all its messages
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: conversationId } = await params;
    
    // Get user ID from request headers or cookies
    const userId = await resolveUserId(request.headers.get('user-id') || 'anonymous');
    
    console.log('DELETE conversation:', { conversationId, userId });
    
    const deleted = await deleteConversation(conversationId, userId);
    
    console.log('Delete result:', deleted);
    
    if (!deleted) {
      console.log('Conversation not found or not owned by user');
      return NextResponse.json(
        { success: false, error: 'Conversation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Conversation deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting conversation:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
