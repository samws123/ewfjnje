import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

export const Index = pc.index("dunorth-vectors"); // must already exist

export const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
});

// Optimized function to handle different types of content (courses, assignments, etc.)
export async function saveToPinecone(userId, courseId, docs) {
  if (!docs || docs.length === 0) return;
  
  try {
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: Index,
      namespace: `${userId}`,
    });
    console.log(`✅ Saved ${docs.length} documents to Pinecone for user ${userId}`);
  } catch (error) {
    console.error('Error saving to Pinecone:', error);
    throw error;
  }
}

// Helper function to create documents from text with automatic splitting
export async function createDocumentsFromText(text, metadata = {}) {
  if (!text) return [];
  
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  
  return await splitter.createDocuments([text], [metadata]);
}

// Legacy function for backward compatibility with existing code
export async function saveToPineconeWithText(userId, courseId, docId, text, metadata = {}) {
    if (!text) return;
  
    const docs = await createDocumentsFromText(text, {
      userId,
      courseId,
      docId,
      ...metadata,
    });
  
    await saveToPinecone(userId, courseId, docs);
}

export function cleanText(input) {
  if (!input) return "";

  let text = String(input);

  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, " ");

  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Collapse multiple spaces/newlines
  text = text.replace(/\s+/g, " ").trim();

  return text;
}
