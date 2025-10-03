'use client';

import { useState, useEffect, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  updated_at: string;
  message_count: number;
  archived: boolean;
}

interface UseChatHistoryReturn {
  // Current conversation state
  currentConversationId: string | null;
  messages: Message[];
  conversations: Conversation[];
  
  // Loading states
  loading: boolean;
  messagesLoading: boolean;
  
  // Actions
  createNewConversation: () => void;
  selectConversation: (conversationId: string) => void;
  sendMessage: (content: string) => Promise<void>;
  loadMoreMessages: () => Promise<void>;
  
  // Conversation management
  renameConversation: (conversationId: string, title: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  archiveConversation: (conversationId: string) => Promise<void>;
}

export function useChatHistory(userId: string): UseChatHistoryReturn {
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messageOffset, setMessageOffset] = useState(0);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);

  // Load conversations on mount, but only after we have a valid userId
  useEffect(() => {
    if (userId && userId !== 'anonymous') {
      loadConversations();
    }
  }, [userId]);

  // Load messages when conversation changes
  useEffect(() => {
    if (currentConversationId) {
      loadMessages(currentConversationId, true);
    } else {
      setMessages([]);
    }
  }, [currentConversationId]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      console.log('Loading conversations for user:', userId);
      const response = await fetch('/api/chat/conversations', {
        headers: {
          'user-id': userId
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Conversations API response:', data);
      
      if (data.success) {
        setConversations(data.conversations || []);
        console.log('Loaded conversations:', data.conversations?.length || 0);
        
        // Auto-select the most recent conversation if none selected
        if (!currentConversationId && data.conversations && data.conversations.length > 0) {
          setCurrentConversationId(data.conversations[0].id);
        }
      } else {
        console.error('Failed to load conversations:', data.error);
        setConversations([]);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string, reset = false) => {
    try {
      setMessagesLoading(true);
      const offset = reset ? 0 : messageOffset;
      
      const response = await fetch(
        `/api/chat/messages?conversationId=${conversationId}&limit=50&offset=${offset}`
      );
      const data = await response.json();
      
      if (data.success) {
        const newMessages = data.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.created_at)
        }));
        
        if (reset) {
          setMessages(newMessages);
          setMessageOffset(newMessages.length);
        } else {
          setMessages(prev => [...newMessages, ...prev]);
          setMessageOffset(prev => prev + newMessages.length);
        }
        
        setHasMoreMessages(data.pagination.hasMore);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const createNewConversation = useCallback(() => {
    setCurrentConversationId(null);
    setMessages([]);
    setMessageOffset(0);
    setHasMoreMessages(false);
  }, []);

  const selectConversation = useCallback((conversationId: string) => {
    setCurrentConversationId(conversationId);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    try {
      // Optimistically add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);

      // Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          message: content,
          conversationId: currentConversationId,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Add assistant response
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.text,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // Update conversation ID if this was a new conversation
        if (!currentConversationId && data.conversationId) {
          setCurrentConversationId(data.conversationId);
          // Refresh conversations list to include the new one
          await loadConversations();
        } else if (currentConversationId) {
          // If we're in an existing conversation, also refresh to update message counts
          await loadConversations();
        }
      } else {
        // Remove optimistic user message on error
        setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
        throw new Error(data.text || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }, [userId, currentConversationId]);

  const loadMoreMessages = useCallback(async () => {
    if (currentConversationId && hasMoreMessages && !messagesLoading) {
      await loadMessages(currentConversationId, false);
    }
  }, [currentConversationId, hasMoreMessages, messagesLoading, messageOffset]);

  const renameConversation = useCallback(async (conversationId: string, title: string) => {
    try {
      const response = await fetch(`/api/chat/conversations/${conversationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      
      if (response.ok) {
        setConversations(prev =>
          prev.map(c => c.id === conversationId ? { ...c, title } : c)
        );
      }
    } catch (error) {
      console.error('Error renaming conversation:', error);
      throw error;
    }
  }, []);

  const deleteConversation = useCallback(async (conversationId: string) => {
    try {
      console.log('Deleting conversation from frontend:', { conversationId, userId });
      const response = await fetch(`/api/chat/conversations/${conversationId}`, {
        method: 'DELETE',
        headers: {
          'user-id': userId
        }
      });
      
      if (response.ok) {
        setConversations(prev => prev.filter(c => c.id !== conversationId));
        
        if (currentConversationId === conversationId) {
          createNewConversation();
        }
      } else {
        const errorData = await response.json();
        console.error('Delete failed:', errorData);
        throw new Error(errorData.error || 'Failed to delete conversation');
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      throw error;
    }
  }, [currentConversationId, createNewConversation, userId]);

  const archiveConversation = useCallback(async (conversationId: string) => {
    try {
      const response = await fetch(`/api/chat/conversations/${conversationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ archived: true }),
      });
      
      if (response.ok) {
        setConversations(prev => prev.filter(c => c.id !== conversationId));
        
        if (currentConversationId === conversationId) {
          createNewConversation();
        }
      }
    } catch (error) {
      console.error('Error archiving conversation:', error);
      throw error;
    }
  }, [currentConversationId, createNewConversation]);

  return {
    currentConversationId,
    messages,
    conversations,
    loading,
    messagesLoading,
    createNewConversation,
    selectConversation,
    sendMessage,
    loadMoreMessages,
    renameConversation,
    deleteConversation,
    archiveConversation,
  };
}
