#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const readline = require("readline");

/* ---------------- Node Version Check ---------------- */
const MIN_NODE_VERSION = 18;
const currentVersion = process.versions.node;
const majorVersion = parseInt(currentVersion.split(".")[0], 10);

if (majorVersion < MIN_NODE_VERSION) {
    console.error(`
❌ Unsupported Node.js version

Current : v${currentVersion}
Required: v${MIN_NODE_VERSION}+

👉 Please upgrade Node.js:
https://nodejs.org
`);
    process.exit(1);
}

/* ---------------- Paths ---------------- */
const sourceDir = path.join(__dirname, "..", "template");
const targetDir = process.cwd();

const projectDirName = process.argv[2];
if (!projectDirName) {
    console.error("❌ Please provide a project name.");
    process.exit(1);
}

const projectPath = path.join(targetDir, projectDirName);

/* ---------------- Helpers ---------------- */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const ask = (q) => new Promise((res) => rl.question(q, res));

function copyRecursive(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    fs.readdirSync(src).forEach((item) => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        if (fs.statSync(srcPath).isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

/* ---------------- Main ---------------- */
(async () => {
    console.log(`\n🚀 Creating Node.js app: ${projectDirName}\n`);

    if (fs.existsSync(projectPath)) {
        console.error("❌ Folder already exists.");
        process.exit(1);
    }

    // 1️⃣ Copy template (ALWAYS)
    copyRecursive(sourceDir, projectPath);

    // 2️⃣ Ask description
    const description = (await ask("Enter project description: ")).trim();
    rl.close();

    // 3️⃣ Update package.json
    const packageJsonPath = path.join(projectPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    pkg.name = projectDirName;
    pkg.description = description;

    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));

    // 4️⃣ Try dependency install (NON-BLOCKING)
    console.log("\n📦 Installing dependencies (optional)...\n");

    try {
        execSync("npm install", { cwd: projectPath, stdio: "inherit" });
        console.log("\n✅ Dependencies installed successfully.");
    } catch (err) {
        console.warn(`
⚠️ Dependency installation skipped.

Possible reasons:
- Node version mismatch
- Native module build failure
- Network issue

👉 You can manually install later:
  cd ${projectDirName}
  npm install
`);
    }

    // 5️⃣ Always success
    console.log("\n🎉 Project created successfully!\n");
    console.log(`Next steps:
  cd ${projectDirName}
  npm install   # if not already installed
  npm run dev
`);
})();
