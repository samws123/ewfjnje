// DuNorth Content Script - Runs on Canvas pages with REST API access
console.log('[DuNorth] Content script loaded on Canvas:', window.location.origin);

// Rate limiting: 3 concurrent requests max
class RateLimiter {
  constructor(maxConcurrent = 3) {
    this.maxConcurrent = maxConcurrent;
    this.running = 0;
    this.queue = [];
  }
  
  async request(url, options = {}) {
    return new Promise((resolve, reject) => {
      this.queue.push({ url, options, resolve, reject });
      this.processQueue();
    });
  }
  
  async processQueue() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) return;
    
    const { url, options, resolve, reject } = this.queue.shift();
    this.running++;
    
    try {
      const response = await this.fetchWithRetry(url, options);
      resolve(response);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.processQueue();
    }
  }
  
  async fetchWithRetry(url, options, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, {
          credentials: 'include', // Use Canvas session cookies
          headers: { 'Accept': 'application/json' },
          ...options
        });
        
        if (response.status === 429) {
          // Rate limited - exponential backoff with jitter
          const delay = Math.min(1000 * Math.pow(2, i) + Math.random() * 1000, 10000);
          console.warn(`[DuNorth] Rate limited, retrying in ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        return response;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
}

const rateLimiter = new RateLimiter(3);

// Fetch all pages with Link header pagination
async function fetchAllPages(endpoint) {
  const items = [];
  let url = `/api/v1/${endpoint}`;
  let pageCount = 0;
  const maxPages = 20; // Safety limit
  
  while (url && pageCount < maxPages) {
    console.log(`[DuNorth] Fetching page ${pageCount + 1}: ${url}`);
    
    const response = await rateLimiter.request(url);
    
    if (!response.ok) {
      console.error(`[DuNorth] API error: ${response.status} ${response.statusText}`);
      break;
    }
    
    const data = await response.json();
    if (Array.isArray(data)) {
      items.push(...data);
    }
    
    // Get next page from Link header
    const linkHeader = response.headers.get('Link');
    url = parseLinkHeader(linkHeader)?.next || null;
    
    pageCount++;
  }
  
  return items;
}

function parseLinkHeader(header) {
  if (!header) return null;
  const links = {};
  const parts = header.split(',');
  
  for (const part of parts) {
    const match = part.match(/<([^>]+)>;\s*rel="(\w+)"/);
    if (match) {
      links[match[2]] = match[1];
    }
  }
  
  return links;
}

// Get public download URL for a file
async function getFileDownloadUrl(fileId) {
  try {
    const response = await rateLimiter.request(`/api/v1/files/${fileId}/public_url`);
    if (response.ok) {
      const data = await response.json();
      return data.public_url;
    }
  } catch (error) {
    console.warn(`[DuNorth] Failed to get download URL for file ${fileId}:`, error);
  }
  return null;
}

// Main sync function - extracts everything with download URLs
async function syncCanvas(userToken, apiEndpoint) {
  console.log('[DuNorth] 🚀 Starting Canvas sync...');
  
  try {
    // 1. Auth check
    const userResponse = await rateLimiter.request('/api/v1/users/self');
    if (!userResponse.ok) {
      throw new Error(`❌ Not authenticated to Canvas: ${userResponse.status}`);
    }
    const user = await userResponse.json();
    console.log(`[DuNorth] ✅ Authenticated as: ${user.name}`);
    
    const baseUrl = window.location.origin;
    const stats = { courses: 0, assignments: 0, pages: 0, files: 0, announcements: 0 };
    
    // 2. Get courses
    console.log('[DuNorth] 📚 Fetching courses...');
    const courses = await fetchAllPages('courses?enrollment_state=active&per_page=100');
    stats.courses = courses.length;
    console.log(`[DuNorth] Found ${courses.length} courses`);
    
    // 3. Get assignments
    console.log('[DuNorth] 📝 Fetching assignments...');
    let allAssignments = [];
    for (const course of courses) {
      try {
        const assignments = await fetchAllPages(`courses/${course.id}/assignments?per_page=100`);
        allAssignments = allAssignments.concat(assignments.map(a => ({...a, course_id: course.id})));
      } catch (error) {
        console.warn(`[DuNorth] Failed to fetch assignments for ${course.name}:`, error.message);
      }
    }
    stats.assignments = allAssignments.length;
    console.log(`[DuNorth] Found ${allAssignments.length} assignments`);
    
    // 4. Get pages
    console.log('[DuNorth] 📄 Fetching pages...');
    let allPages = [];
    for (const course of courses) {
      try {
        const pages = await fetchAllPages(`courses/${course.id}/pages?per_page=100`);
        // Get full page content
        for (const page of pages) {
          try {
            const fullPage = await rateLimiter.request(`/api/v1/courses/${course.id}/pages/${page.url}`);
            if (fullPage.ok) {
              const pageData = await fullPage.json();
              allPages.push({...pageData, course_id: course.id});
            }
          } catch (error) {
            console.warn(`[DuNorth] Failed to fetch page ${page.title}:`, error.message);
          }
        }
      } catch (error) {
        console.warn(`[DuNorth] Failed to fetch pages for ${course.name}:`, error.message);
      }
    }
    stats.pages = allPages.length;
    console.log(`[DuNorth] Found ${allPages.length} pages`);
    
    // 5. Get files with download URLs
    console.log('[DuNorth] 📁 Fetching files...');
    let allFiles = [];
    for (const course of courses) {
      try {
        const files = await fetchAllPages(`courses/${course.id}/files?per_page=100`);
        // Get public download URLs
        for (const file of files) {
          const downloadUrl = await getFileDownloadUrl(file.id);
          allFiles.push({
            ...file, 
            course_id: course.id,
            public_download_url: downloadUrl
          });
        }
      } catch (error) {
        console.warn(`[DuNorth] Failed to fetch files for ${course.name}:`, error.message);
      }
    }
    stats.files = allFiles.length;
    console.log(`[DuNorth] Found ${allFiles.length} files with download URLs`);
    
    // 6. Get announcements
    console.log('[DuNorth] 📢 Fetching announcements...');
    let allAnnouncements = [];
    for (const course of courses) {
      try {
        const announcements = await fetchAllPages(`courses/${course.id}/discussion_topics?only_announcements=true&per_page=100`);
        allAnnouncements = allAnnouncements.concat(announcements.map(a => ({...a, course_id: course.id})));
      } catch (error) {
        console.warn(`[DuNorth] Failed to fetch announcements for ${course.name}:`, error.message);
      }
    }
    stats.announcements = allAnnouncements.length;
    console.log(`[DuNorth] Found ${allAnnouncements.length} announcements`);
    
    // 7. Send everything to backend
    console.log('[DuNorth] 💾 Sending to backend...');
    const payload = {
      userId: 'from-token',
      baseUrl,
      items: {
        courses,
        assignments: allAssignments,
        pages: allPages,
        files: allFiles,
        announcements: allAnnouncements
      }
    };
    
    console.log(`[DuNorth] Payload size: ${JSON.stringify(payload).length} chars`);
    
    const response = await fetch(`${apiEndpoint}/ingest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend ingest failed: ${response.status} - ${errorText.substring(0, 200)}`);
    }
    
    const result = await response.json();
    console.log('[DuNorth] ✅ Sync complete:', result);
    
    return { success: true, stats, baseUrl, user: user.name };
    
  } catch (error) {
    console.error('[DuNorth] ❌ Sync failed:', error);
    throw error;
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SYNC_CANVAS') {
    console.log('[DuNorth] 📨 Received sync command');
    
    syncCanvas(message.userToken, message.apiEndpoint)
      .then(result => {
        console.log('[DuNorth] ✅ Sending success response:', result);
        sendResponse({ success: true, ...result });
      })
      .catch(error => {
        console.error('[DuNorth] ❌ Sending error response:', error.message);
        sendResponse({ success: false, error: error.message });
      });
    
    return true; // Keep message channel open for async response
  }
});

console.log('[DuNorth] 🎯 Content script ready for Canvas sync');
