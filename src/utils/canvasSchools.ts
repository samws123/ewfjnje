export interface CanvasSchool {
  id: string;
  name: string;
  domain: string;
  base_url: string;
  lms: string;
}

// Parse CSV data and convert to School objects
export function parseCanvasSchools(csvData: string): CanvasSchool[] {
  const lines = csvData.trim().split('\n');
  const schools: CanvasSchool[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV line (handle commas in quoted fields)
    const fields = parseCSVLine(line);
    
    if (fields.length >= 3) {
      const id = fields[0]?.trim();
      const name = fields[1]?.trim();
      const domain = fields[2]?.trim();
      
      // Skip entries with empty name or domain
      if (!name || !domain) continue;
      
      // Construct base URL from domain
      const base_url = domain.startsWith('http') ? domain : `https://${domain}`;
      
      schools.push({
        id: id || `canvas-${i}`,
        name: name,
        domain: domain,
        base_url: base_url,
        lms: 'canvas'
      });
    }
  }
  
  // Sort alphabetically by name
  return schools.sort((a, b) => a.name.localeCompare(b.name));
}

// Simple CSV parser that handles commas in quoted fields
function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  fields.push(current);
  
  return fields;
}

// Load Canvas schools from CSV file
export async function loadCanvasSchools(): Promise<CanvasSchool[]> {
  try {
    const response = await fetch('/canvas_accounts.csv');
    const csvData = await response.text();
    return parseCanvasSchools(csvData);
  } catch (error) {
    console.error('Error loading Canvas schools:', error);
    return [];
  }
}
