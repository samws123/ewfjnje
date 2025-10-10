/**
 * Call Canvas API with pagination support and authentication retry
 */
export async function callCanvasPaged(baseUrl: string, cookieValue: string, endpoint: string): Promise<any[]> {
  const results: any[] = [];
  let url = `${baseUrl}${endpoint}`;
  
  console.log('Making Canvas API call:', {
    url,
    cookieLength: cookieValue?.length || 0,
    cookiePreview: cookieValue?.substring(0, 50) + '...'
  });
  
  // Try different Canvas session cookie names
  const tryNames = ['_legacy_normandy_session', 'canvas_session'];
  
  while (url) {
    let response;
    let lastError;
    
    // Try different cookie formats
    for (const cookieName of tryNames) {
      try {
        response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'Cookie': `${cookieName}=${cookieValue}`,
            'User-Agent': 'DuNorth-Server/1.0'
          },
          redirect: 'follow'
        });
        
        console.log(`Canvas API response with ${cookieName}:`, {
          status: response.status,
          statusText: response.statusText,
          url: url
        });
        
        if (response.ok) {
          break; // Success, use this response
        }
        
        if (![401, 403].includes(response.status)) {
          break; // Non-auth error, don't try other cookie names
        }
        
        lastError = `${response.status} ${response.statusText}`;
      } catch (error) {
        lastError = error;
        console.error(`Error with ${cookieName}:`, error);
      }
    }
    
    if (!response?.ok) {
      console.error('Canvas API error details:', {
        status: response?.status,
        statusText: response?.statusText,
        url: url,
        lastError: lastError,
        triedCookieNames: tryNames
      });
      
      const errorText = response ? await response.text().catch(() => '') : '';
      throw new Error(`Canvas API error: ${response?.status || 'Unknown'} ${response?.statusText || lastError}. ${errorText.slice(0, 200)}`);
    }
    
    const data = await response.json();
    results.push(...data);
    
    // Check for next page in Link header
    const linkHeader = response.headers.get('Link');
    const nextMatch = linkHeader?.match(/<([^>]+)>;\s*rel="next"/);
    url = nextMatch ? nextMatch[1] : null;
  }
  
  return results;
}
