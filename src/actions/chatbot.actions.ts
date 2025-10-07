'use server';

import type { ChatbotRequest, ChatbotResponse } from '@/types/chatbot.types';

export async function callChatbotAction(
  payload: ChatbotRequest
): Promise<ChatbotResponse> {
  try {
    const chatbook_webhook_url = process.env.CHATBOT_WEBHOOK! 
    // "https://edin80688.app.n8n.cloud/webhook-test/c0ba841d-6cf1-41b4-9572-ffb2ea977625"
    const res = await fetch(chatbook_webhook_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Always cache-bust for dynamic responses
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Chatbot error: ${res.statusText}`);
    }

    const data = (await res.json()) as ChatbotResponse;

    return {
      reply: data.reply,
      timestamp: data.timestamp ?? new Date().toISOString(),
    };
  } catch (error) {
    console.error('Chatbot call failed:', error);
    throw new Error('Failed to reach chatbot.');
  }
}
