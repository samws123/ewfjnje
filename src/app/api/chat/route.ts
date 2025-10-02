/**
 * Chat Answer Handler
 * Main entry point for processing chat queries with modular handlers
 */

import { NextRequest, NextResponse } from 'next/server';
import { resolveUserId } from './utils/user-management';
import { toDocumentStyle } from './utils/text-formatting';
import { createAgent } from './utils/chatbot';

interface ChatRequest {
  userId: string;
  message: string;
}

interface ChatResponse {
  role: 'assistant';
  text: string;
}

/**
 * Main chat handler with improved modular structure
 */
export async function POST(request: NextRequest): Promise<NextResponse<ChatResponse>> {
  try {
    const body: ChatRequest = await request.json();
    const { userId: rawUserId, message } = body;

    if (!rawUserId || !message) {
      return NextResponse.json(
        { role: 'assistant', text: 'userId and message required' } as ChatResponse,
        { status: 400 }
      );
    }

    console.log('Processing chat request...');
    const userId = await resolveUserId(rawUserId);
    
    const agent = await createAgent();
  
    // Let the agent decide whether to call the retriever or answer directly
    const result = await agent.invoke({
      input: message,
      userId,
    });

    return NextResponse.json({
      role: "assistant",
      text: toDocumentStyle(result.output),
    } as ChatResponse);

  } catch (err: any) {
    console.error('Chat API error:', err);
    return NextResponse.json({
      role: "assistant",
      text: `Server error: ${err.message || err}`,
    } as ChatResponse);
  }
}
