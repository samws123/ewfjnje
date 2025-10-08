import { extractPdfTextFromBuffer } from './pdf';

/**
 * Universal text extraction utility
 * Handles various file types for text extraction
 */
export async function extractTextUniversal(
  buffer: Buffer, 
  filename: string = '', 
  contentType: string = ''
): Promise<string | null> {
  const name = String(filename || '').toLowerCase();
  const type = String(contentType || '').toLowerCase();

  console.log(`Extracting text from: ${filename} (${contentType}) - ${buffer.length} bytes`);

  try {
    // Try by extension first - PDF
    if (name.endsWith('.pdf') || type.includes('pdf')) {
      console.log(`Processing PDF file: ${filename}`);
      const text = await extractPdfTextFromBuffer(buffer);
      if (text) {
        console.log(`PDF extraction successful: ${text.length} characters from ${filename}`);
        return text;
      } else {
        console.log(`PDF extraction failed for ${filename}`);
        return null;
      }
    }

    // DOCX → HTML → text
    if (name.endsWith('.docx') || type.includes('wordprocessingml')) {
      console.log(`Processing Word document: ${filename}`);
      try {
        const mammothMod = await import('mammoth');
        const mammoth = mammothMod && (mammothMod.default || mammothMod);
        const { value: html } = await mammoth.convertToHtml({ buffer });
        const { htmlToText } = await import('html-to-text');
        const text = htmlToText(html || '', { wordwrap: false }).trim() || null;
        if (text) {
          console.log(`Word extraction successful: ${text.length} characters from ${filename}`);
          return text;
        }
      } catch (error) {
        console.log(`Word extraction failed for ${filename}:`, error);
      }
      return null;
    }

    // PPTX → extract slide text from XML
    if (name.endsWith('.pptx') || type.includes('presentationml')) {
      console.log(`Processing PowerPoint file: ${filename}`);
      try {
        const jszipMod = await import('jszip');
        const JSZip = jszipMod && (jszipMod.default || jszipMod);
        const fxpMod = await import('fast-xml-parser');
        const { XMLParser } = fxpMod;
        const zip = await JSZip.loadAsync(buffer);
        const parser = new XMLParser();
        let out = '';
        const slideFiles = Object.keys(zip.files).filter(p => p.startsWith('ppt/slides/slide') && p.endsWith('.xml'));
        slideFiles.sort();
        for (const p of slideFiles) {
          const xml = await zip.files[p].async('string');
          const j = parser.parse(xml);
          // Gather all a:t text nodes
          const texts: string[] = [];
          const walk = (node: any): void => {
            if (!node || typeof node !== 'object') return;
            for (const k of Object.keys(node)) {
              const v = node[k];
              if (k === 'a:t' && (typeof v === 'string' || typeof v === 'number')) texts.push(String(v));
              if (v && typeof v === 'object') walk(v);
            }
          };
          walk(j);
          if (texts.length) out += texts.join(' ') + '\n\n';
        }
        const text = out.trim() || null;
        if (text) {
          console.log(`PowerPoint extraction successful: ${text.length} characters from ${filename}`);
          return text;
        }
      } catch (error) {
        console.log(`PowerPoint extraction failed for ${filename}:`, error);
      }
      return null;
    }

    // XLSX → join sheet cell values
    if (name.endsWith('.xlsx') || type.includes('sheet')) {
      console.log(`Processing Excel file: ${filename}`);
      try {
        const xlsxMod = await import('xlsx');
        const XLSX = xlsxMod && (xlsxMod.default || xlsxMod);
        const wb = XLSX.read(buffer, { type: 'buffer' });
        const lines: string[] = [];
        wb.SheetNames.forEach(sn => {
          const ws = wb.Sheets[sn];
          const json = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true });
          json.forEach((row: any) => {
            const vals = row.filter((v: any) => v !== undefined && v !== null).map((v: any) => String(v));
            if (vals.length) lines.push(vals.join(' \t '));
          });
        });
        const text = lines.join('\n');
        if (text) {
          console.log(`Excel extraction successful: ${text.length} characters from ${filename}`);
          return text;
        }
      } catch (error) {
        console.log(`Excel extraction failed for ${filename}:`, error);
      }
      return null;
    }

    // HTML
    if (name.endsWith('.html') || name.endsWith('.htm') || type.includes('text/html')) {
      console.log(`Processing HTML file: ${filename}`);
      try {
        const { htmlToText } = await import('html-to-text');
        const html = buffer.toString('utf8');
        const text = htmlToText(html || '', { wordwrap: false }).trim() || null;
        if (text) {
          console.log(`HTML extraction successful: ${text.length} characters from ${filename}`);
          return text;
        }
      } catch (error) {
        console.log(`HTML extraction failed for ${filename}:`, error);
      }
      return null;
    }

    // Plain text / CSV / JSON
    if (type.startsWith('text/') || name.endsWith('.txt') || name.endsWith('.csv') || name.endsWith('.md') || type.includes('json') || name.endsWith('.json')) {
      console.log(`Processing as text file: ${filename}`);
      try {
        const text = buffer.toString('utf8');
        if (text.trim()) {
          console.log(`Text extraction successful: ${text.length} characters from ${filename}`);
          return text;
        }
      } catch (error) {
        console.log(`Text extraction failed for ${filename}:`, error);
      }
      return null;
    }

    // RTF basic strip
    if (name.endsWith('.rtf') || type.includes('rtf')) {
      console.log(`Processing RTF file: ${filename}`);
      try {
        const rtf = buffer.toString('utf8');
        // Naive fallback: strip control words
        const text = rtf.replace(/\\[a-zA-Z]+-?\d* ?/g, '').replace(/[{}]/g, '').trim();
        if (text) {
          console.log(`RTF extraction successful: ${text.length} characters from ${filename}`);
          return text;
        }
      } catch (error) {
        console.log(`RTF extraction failed for ${filename}:`, error);
      }
      return null;
    }

    console.log(`No extraction method found for: ${filename} (${contentType})`);
    return null;

  } catch (error) {
    console.warn('Text extraction error:', error);
    return null;
  }
}
