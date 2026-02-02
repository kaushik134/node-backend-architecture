const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { execSync } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const readmePath = path.join(__dirname, '..', 'README.md');

const askQuestion = (query) => {
    return new Promise((resolve) => rl.question(query, resolve));
};

const setup = async () => {
    try {
        console.log('--- Project Setup ---\n');

        const currentDirName = path.basename(path.resolve(__dirname, '..'));

        let name = await askQuestion(`Enter project name (default: ${currentDirName}): `);
        name = name.trim() || currentDirName;

        let description = await askQuestion('Enter project description (default: ""): ');
        description = description.trim();

        // Update package.json
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        packageJson.name = name;
        packageJson.description = description;



        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('Updated package.json');

        // Update README.md
        let readme = fs.readFileSync(readmePath, 'utf8');
        // Replace the first header
        readme = readme.replace(/^# .+$/m, `# ${name}`);
        readme = readme.replace(
            /^A robust, scalable, and modular Node.js backend architecture designed for production use\.$/m,
            description
        );

        fs.writeFileSync(readmePath, readme);
        console.log('Updated README.md');

        // Update Dependencies to Latest
        console.log('\nUpdating dependencies to latest versions...');
        const dependencies = Object.keys(packageJson.dependencies || {});
        const devDependencies = Object.keys(packageJson.devDependencies || {});

        if (dependencies.length > 0) {
            try {
                console.log(`Installing latest versions for: ${dependencies.join(', ')}`);
                execSync(`npm install ${dependencies.map(d => d + '@latest').join(' ')}`, { stdio: 'inherit' });
            } catch (error) {
                console.error('Failed to update dependencies:', error.message);
            }
        }

        if (devDependencies.length > 0) {
            try {
                console.log(`Installing latest versions for dev: ${devDependencies.join(', ')}`);
                execSync(`npm install -D ${devDependencies.map(d => d + '@latest').join(' ')}`, { stdio: 'inherit' });
            } catch (error) {
                console.error('Failed to update devDependencies:', error.message);
            }
        }

        console.log('\nSetup complete!');
    } catch (error) {
        console.error('Error during setup:', error);
    } finally {
        rl.close();
    }
};

setup();
