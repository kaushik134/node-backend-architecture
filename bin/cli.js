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
[Error] Unsupported Node.js version

Current : v${currentVersion}
Required: v${MIN_NODE_VERSION}+

Please upgrade Node.js:
https://nodejs.org
`);
    process.exit(1);
}

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
            // Skip node_modules if they exist in source by accident
            if (item === "node_modules") return;
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

/* ---------------- Args ---------------- */
const args = process.argv.slice(2);
const skipInstallFlag = args.includes("--skip-install");

// remove flags from positional args
const cleanArgs = args.filter(a => !a.startsWith("--"));

/* ---------------- Paths ---------------- */
const sourceDir = path.join(__dirname, "..", "template");
const targetDir = process.cwd();

// default folder name = current directory name
const projectDirName = cleanArgs[0] || path.basename(targetDir);

/* ---------------- Main ---------------- */
(async () => {
    console.log(`\nCreating Node.js app: ${projectDirName}\n`);

    // 1. Determine project path
    const isCurrentDir = !cleanArgs[0];
    const projectPath = isCurrentDir ? targetDir : path.join(targetDir, projectDirName);

    if (!isCurrentDir && fs.existsSync(projectPath)) {
        console.error("[Error] Folder already exists.");
        process.exit(1);
    }

    if (isCurrentDir) {
        const files = fs.readdirSync(targetDir);
        if (files.length > 0) {
            const proceed = (await ask("Warning: Current directory is not empty. Proceed? (y/N): "))
                .trim()
                .toLowerCase();
            if (proceed !== "y" && proceed !== "yes") {
                console.log("Aborted.");
                process.exit(0);
            }
        }
    }

    // 2. Copy template
    copyRecursive(sourceDir, projectPath);

    // 3. Configuration Questions
    let description = "";
    const wantDesc = (await ask("Do you want to add a project description? (y/N): "))
        .trim()
        .toLowerCase();

    if (wantDesc === "y" || wantDesc === "yes") {
        description = (await ask("Enter project description: ")).trim();
    }

    let shouldInstall = !skipInstallFlag;
    if (!skipInstallFlag) {
        const confirmInstall = (await ask("Do you want to install dependencies automatically? (Y/n): "))
            .trim()
            .toLowerCase();
        if (confirmInstall === "n" || confirmInstall === "no") {
            shouldInstall = false;
        }
    }

    rl.close();

    // 4. Update package.json
    const pkgPath = path.join(projectPath, "package.json");
    if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
        pkg.name = projectDirName;
        if (description) pkg.description = description;
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    }

    // 5. Install dependencies (best-effort, never block)
    if (!shouldInstall) {
        console.log("\nSkipping dependency installation. You can install them later manually.\n");
    } else {
        console.log("\nInstalling dependencies (best-effort)...\n");

        const failed = [];

        const install = (cmd, name) => {
            try {
                execSync(cmd, { cwd: projectPath, stdio: "inherit" });
            } catch {
                failed.push(name);
                console.warn(`[Warning] Skipped: ${name}`);
            }
        };

        const currentPkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

        for (const dep of Object.keys(currentPkg.dependencies || {})) {
            install(`npm install ${dep}`, dep);
        }

        for (const dep of Object.keys(currentPkg.devDependencies || {})) {
            install(`npm install --save-dev ${dep}`, dep);
        }

        if (failed.length) {
            console.warn(`
[Warning] Some dependencies could not be installed automatically:
  - ${failed.join("\n  - ")}

Install manually later:
  ${isCurrentDir ? "" : `cd ${projectDirName}\n  `}npm install
`);
        } else {
            console.log("\nAll dependencies installed successfully.");
        }
    }


    console.log("\nProject ready to roll!\n");
    console.log(`Next steps:
  ${isCurrentDir ? "" : `cd ${projectDirName}\n  `}npm run dev
`);
})();
