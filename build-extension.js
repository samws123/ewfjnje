#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building DuNorth Extension for Chrome Web Store...\n');

// Create build directory
const buildDir = path.join(__dirname, 'extension-build');
const sourceDir = path.join(__dirname, 'extension-dist');

// Clean and create build directory
if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
}
fs.mkdirSync(buildDir, { recursive: true });

console.log('📁 Created build directory');

// Copy extension files
const filesToCopy = [
    'manifest.json',
    'background.js',
    'content.js',
    'bridge.js',
    'popup.html',
    'popup.js',
    'icons'
];

filesToCopy.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(buildDir, file);
    
    if (fs.existsSync(sourcePath)) {
        if (fs.statSync(sourcePath).isDirectory()) {
            fs.cpSync(sourcePath, destPath, { recursive: true });
        } else {
            fs.copyFileSync(sourcePath, destPath);
        }
        console.log(`✅ Copied ${file}`);
    } else {
        console.log(`⚠️  Warning: ${file} not found`);
    }
});

// Validate manifest
console.log('\n🔍 Validating manifest.json...');
let manifest;
try {
    const manifestPath = path.join(buildDir, 'manifest.json');
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Check required fields
    const requiredFields = ['manifest_version', 'name', 'version', 'description'];
    const missingFields = requiredFields.filter(field => !manifest[field]);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Check icons exist
    if (manifest.icons) {
        Object.values(manifest.icons).forEach(iconPath => {
            const fullPath = path.join(buildDir, iconPath);
            if (!fs.existsSync(fullPath)) {
                throw new Error(`Icon not found: ${iconPath}`);
            }
        });
    }
    
    console.log('✅ Manifest validation passed');
    console.log(`   Name: ${manifest.name}`);
    console.log(`   Version: ${manifest.version}`);
    console.log(`   Description: ${manifest.description}`);
    
} catch (error) {
    console.error('❌ Manifest validation failed:', error.message);
    process.exit(1);
}

// Create ZIP package
console.log('\n📦 Creating ZIP package...');
const zipName = `dunorth-extension-v${manifest.version}.zip`;
const zipPath = path.join(__dirname, zipName);

let sizeKB;
try {
    // Remove existing zip if it exists
    if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath);
    }
    
    // Create zip using system zip command
    execSync(`cd "${buildDir}" && zip -r "${zipPath}" .`, { stdio: 'inherit' });
    
    const stats = fs.statSync(zipPath);
    sizeKB = Math.round(stats.size / 1024);
    
    console.log(`✅ Created ${zipName} (${sizeKB} KB)`);
    
} catch (error) {
    console.error('❌ Failed to create ZIP:', error.message);
    process.exit(1);
}

// Create upload instructions
const instructionsPath = path.join(__dirname, 'CHROME_STORE_UPLOAD.md');
const instructions = `# Chrome Web Store Upload Instructions

## Extension Package
- **File**: \`${zipName}\`
- **Size**: ${sizeKB} KB
- **Version**: ${manifest.version}

## Upload Steps

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Click "New Item" or "Add new item"
3. Upload the \`${zipName}\` file
4. Fill in the required information:

### Store Listing
- **Name**: DuNorth
- **Summary**: Integration for DuNorth.io
- **Description**: 
\`\`\`
DuNorth is a powerful Chrome extension that seamlessly integrates with Canvas LMS to enhance your learning experience. 

Features:
• Automatic Canvas data synchronization
• Enhanced productivity tools
• Seamless integration with DuNorth platform
• Secure authentication and data handling
• Real-time notifications and updates

Perfect for students and educators who want to streamline their Canvas workflow and boost productivity.
\`\`\`

- **Category**: Education
- **Language**: English (United States)

### Privacy Policy
- **Privacy Policy URL**: https://du-north.vercel.app/privacy

### Images
- **Screenshots**: Add screenshots showing the extension in action
- **Promotional Images**: Create promotional images (1280x800, 640x400)

### Permissions Justification
- **storage**: Store user preferences and sync data
- **tabs**: Access Canvas pages for data synchronization
- **scripting**: Inject content scripts for Canvas integration
- **cookies**: Access Canvas session cookies for authentication
- **notifications**: Show sync status and important updates

## Review Process
- The extension will be reviewed by Google (typically 1-3 business days)
- Ensure all functionality works as described
- Test on multiple Canvas instances if possible

## Post-Upload
- Monitor the review status in the developer dashboard
- Respond to any review feedback promptly
- Update the extension as needed based on user feedback
`;

fs.writeFileSync(instructionsPath, instructions);
console.log(`\n📋 Created upload instructions: CHROME_STORE_UPLOAD.md`);

console.log('\n🎉 Extension build completed successfully!');
console.log(`\n📁 Build files:`);
console.log(`   - Extension directory: ${buildDir}`);
console.log(`   - ZIP package: ${zipName}`);
console.log(`   - Upload instructions: CHROME_STORE_UPLOAD.md`);
console.log(`\n🚀 Ready for Chrome Web Store upload!`);
