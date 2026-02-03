#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = path.join(__dirname, '..');
const targetDir = process.cwd();

// Get directory name from args or default to current directory
const args = process.argv.slice(2);
const projectDirName = args[0] || '.';
const projectPath = path.join(targetDir, projectDirName);

console.log(`\n🚀 Initializing new project in: ${projectPath}\n`);

// Create directory if it doesn't exist
if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
}

// Files/Folders to ignore during copy
const ignoreList = [
    'node_modules',
    '.git',
    '.npmignore',
    'bin',
    'package-lock.json',
    '.env', // Don't copy .env, only .env.example
    'README.md', // Don't copy the CLI readme
    'README.template.md' // Don't copy the template source file directly
];

// Copy function
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    const fileName = path.basename(src);

    if (ignoreList.includes(fileName)) return;

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// 1. Copy Files
console.log('📂 Copying template files...');
copyRecursiveSync(sourceDir, projectPath);

// Manually copy the template readme to README.md
const templateReadme = path.join(sourceDir, 'README.template.md');
if (fs.existsSync(templateReadme)) {
    fs.copyFileSync(templateReadme, path.join(projectPath, 'README.md'));
}

// 2. Prepare package.json for the new project
const packageJsonPath = path.join(projectPath, 'package.json');
const pkg = require(packageJsonPath);

// Remove the 'bin' entry from the generated project's package.json
// (The generated project isn't a CLI tool itself)
delete pkg.bin;
pkg.name = path.basename(projectPath);
pkg.version = '1.0.0';

fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));

// 3. Install Dependencies
console.log('📦 Installing dependencies (this may take a while)...');
try {
    execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
} catch (error) {
    console.error('Failed to install dependencies.', error);
    process.exit(1);
}

// 4. Run Setup Script (optional, consistent with your previous flow)
console.log('⚙️  Running setup...');
try {
    execSync('npm run setup', { cwd: projectPath, stdio: 'inherit' });
} catch (error) {
    console.warn('Setup script encountered an issue, but installation finished.');
}

console.log('\n✅ Project created successfully!');
console.log(`\nNext steps:\n`);
if (projectDirName !== '.') {
    console.log(`  cd ${projectDirName}`);
}
console.log('  npm run dev\n');
