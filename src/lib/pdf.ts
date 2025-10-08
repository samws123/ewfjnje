/**
 * PDF text extraction using pdf-extraction
 */

export async function extractPdfTextFromBuffer(buffer: Buffer): Promise<string | null> {
  try {
    // Dynamic import of pdf-extraction
    const pdfExtraction = await import('pdf-extraction');
    const extract = (pdfExtraction as any).default || pdfExtraction;
    
    // Extract text from PDF buffer
    const data = await extract(buffer);
    const text = (data as any).text || '';
    
    return text.trim() || null;
    
  } catch (error) {
    console.warn('PDF extraction failed:', error);
    return null;
  }
}
