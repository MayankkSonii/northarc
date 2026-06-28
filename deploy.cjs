const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'dist');
const destDir = path.join(__dirname, 'northarc');

// Files to explicitly preserve in the destination directory
const PRESERVED_FILES = ['server.py', 'inquiries.db', 'inquiries.db-journal'];
const PRESERVED_EXTENSIONS = ['.py', '.db', '.sqlite'];

function preserveFilter(filename) {
  if (PRESERVED_FILES.includes(filename)) return true;
  const ext = path.extname(filename).toLowerCase();
  if (PRESERVED_EXTENSIONS.includes(ext)) return true;
  return false;
}

// Helper to copy directory recursively
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper to remove directory/files recursively while preserving backend files
function cleanDestDir(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively clean subdirectories first
      cleanDestDir(fullPath);
      // Delete directory if empty
      try {
        if (fs.readdirSync(fullPath).length === 0) {
          fs.rmdirSync(fullPath);
        }
      } catch (err) {
        console.warn(`Could not remove directory ${fullPath}:`, err.message);
      }
    } else {
      // Check if we need to preserve this file
      if (preserveFilter(entry.name)) {
        console.log(`Preserving backend file: ${entry.name}`);
      } else {
        fs.unlinkSync(fullPath);
      }
    }
  }
}

function run() {
  console.log('🚀 Deploying production frontend...');

  if (!fs.existsSync(srcDir)) {
    console.error(`❌ Build directory '${srcDir}' does not exist. Please run 'npm run build' first.`);
    process.exit(1);
  }

  // 1. Clean destination
  console.log(`🧹 Cleaning destination directory: ${destDir}...`);
  cleanDestDir(destDir);

  // 2. Copy build output
  console.log(`📁 Copying build output from '${srcDir}' to '${destDir}'...`);
  copyDirRecursive(srcDir, destDir);

  console.log('✅ Deployment successful!');
}

run();
