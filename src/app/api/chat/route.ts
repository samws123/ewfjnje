/**
 * Chat Answer Handler
 * Main entry point for processing chat queries with modular handlers
 */

import { NextRequest, NextResponse } from 'next/server';
import { resolveUserId } from './utils/user-management';
import { toDocumentStyle } from './utils/text-formatting';
import { createAgent } from './utils/chatbot';
import { createConversation, addMessage, getConversations } from '@/lib/database';
import '@/lib/init-db'; // Ensure database is initialized

interface ChatRequest {
  userId: string;
  message: string;
  conversationId?: string;
}

interface ChatResponse {
  role: 'assistant';
  text: string;
  conversationId?: string;
}

/**
 * Main chat handler with improved modular structure
 */
export async function POST(request: NextRequest): Promise<NextResponse<ChatResponse>> {
  try {
    const body: ChatRequest = await request.json();
    const { userId: rawUserId, message, conversationId } = body;

    if (!rawUserId || !message) {
      return NextResponse.json(
        { role: 'assistant', text: 'userId and message required' } as ChatResponse,
        { status: 400 }
      );
    }

    console.log('Processing chat request...');
    const userId = await resolveUserId(rawUserId);
    
    // Handle conversation creation or retrieval
    let currentConversationId = conversationId;
    
    if (!currentConversationId) {
      // Create a new conversation if none provided
      const conversation = await createConversation(userId, generateConversationTitle(message));
      currentConversationId = conversation.id;
    }
    
    // Save user message to database
    await addMessage(currentConversationId, 'user', message);
    
    const agent = await createAgent();
  
    // Let the agent decide whether to call the retriever or answer directly
    const result = await agent.invoke({
      input: message,
      userId,
    });

    const assistantResponse = toDocumentStyle(result.output);
    
    // Save assistant response to database
    await addMessage(currentConversationId, 'assistant', assistantResponse);

    return NextResponse.json({
      role: "assistant",
      text: assistantResponse,
      conversationId: currentConversationId,
    } as ChatResponse);

  } catch (err: any) {
    console.error('Chat API error:', err);
    return NextResponse.json({
      role: "assistant",
      text: `Server error: ${err.message || err}`,
    } as ChatResponse);
  }
}

/**
 * Generate a conversation title from the first message
 */
function generateConversationTitle(message: string): string {
  // Take first 50 characters and add ellipsis if longer
  const title = message.trim().substring(0, 50);
  return title.length < message.trim().length ? `${title}...` : title;
}
