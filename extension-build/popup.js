// DuNorth Popup Script
document.addEventListener('DOMContentLoaded', async () => {
    const statusText = document.getElementById('status-text');
    const syncBtn = document.getElementById('sync-btn');
    const openDashboardBtn = document.getElementById('open-dashboard');
    const testConnectionBtn = document.getElementById('test-connection');

    // No tabs permission: rely on background cookie detection
    statusText.textContent = 'Ready to sync';

    // Sync Canvas Data
    syncBtn.addEventListener('click', async () => {
        if (!isCanvasPage) return;
        
        statusText.textContent = 'Syncing...';
        syncBtn.disabled = true;
        
        try {
            const response = await chrome.runtime.sendMessage({
                type: 'SYNC_CANVAS',
                apiEndpoint: 'https://du-north.vercel.app/api'
            });
            
            if (response.ok) {
                statusText.textContent = 'Sync completed!';
                setTimeout(() => {
                    statusText.textContent = 'Ready to sync';
                    syncBtn.disabled = false;
                }, 2000);
            } else {
                statusText.textContent = 'Sync failed: ' + response.error;
                syncBtn.disabled = false;
            }
        } catch (error) {
            statusText.textContent = 'Sync error: ' + error.message;
            syncBtn.disabled = false;
        }
    });

    // Open Dashboard
    openDashboardBtn.addEventListener('click', () => {
        // Avoid tabs permission
        window.open('https://du-north.vercel.app/dashboard', '_blank');
    });

    // Test Connection
    testConnectionBtn.addEventListener('click', async () => {
        statusText.textContent = 'Testing...';
        testConnectionBtn.disabled = true;
        
        try {
            const response = await chrome.runtime.sendMessage({
                type: 'TEST_ECHO',
                apiEndpoint: 'https://du-north.vercel.app/api'
            });
            
            if (response.ok) {
                statusText.textContent = 'Connection OK!';
            } else {
                statusText.textContent = 'Connection failed';
            }
        } catch (error) {
            statusText.textContent = 'Test error: ' + error.message;
        }
        
        setTimeout(() => {
            statusText.textContent = 'Ready to sync';
            testConnectionBtn.disabled = false;
        }, 2000);
    });
});
