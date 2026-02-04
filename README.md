# Create Node Craft 🚀

[![npm version](https://badge.fury.io/js/create-node-craft.svg)](https://badge.fury.io/js/create-node-craft)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**Build modern Node.js backends without the headache.**

`create-node-craft` is a simple and flexible CLI tool that bootstraps a clean, production-ready Node.js backend in seconds.  
It avoids heavy configuration, strict version locking, and opinionated tooling—so you can focus on writing application logic.

---

## ✨ Key Highlights

- Zero configuration setup
- **Interactive & Smart** dependency installer
- **Best-effort installation** (skips problematic libs instead of crashing)
- Clean and minimal project structure
- Beginner-friendly and production-ready
- Supports Node.js **v18+**

---

## 🚀 Quick Start

### Create a New App

```bash
npx create-node-craft my-app
cd my-app
npm run dev
```

### Use Current Folder Name
If you don’t provide a project name, the CLI will use the current folder name automatically:

```bash
npx create-node-craft
```

## 🧭 CLI Workflow
When you run the command, the CLI performs the following steps:

1. 📁 **Project Name**: Determines name from argument or folder.
2. ❓ **Description**: Asks if you want to add a project description.
3. 📄 **Template**: Copies a fresh Node.js backend template.
4. 📦 **Dependencies**: Asks for confirmation and performs **best-effort** installation.  
   *(If a library fails due to system compatibility, it skips it and continues).*
5. 🎉 **Done**: Your project is ready!

### ⏭️ Skip Dependency Installation
If you want to handle everything yourself:

```bash
npx create-node-craft my-app --skip-install
```

## 📦 Robust Dependency Installation
The CLI tries to install the latest supported versions using a **non-blocking** approach. If a package (like `bcrypt`) requires system-level build tools you don't have, the CLI will skip it and notify you, rather than letting the whole setup fail.

### Core Architecture
- **express** – Web framework
- **mongoose** – MongoDB object modeling
- **cors** & **dotenv** – Security and environment management
- **jsonwebtoken** & **bcrypt** – Authentication core
- **joi** – Schema validation

### Development
- **nodemon** – Auto server reload

This approach ensures maximum compatibility across different systems and Node.js versions.

## 📁 Generated Project Structure

```
my-app/
├── src/
├── index.js
├── .env.example
├── package.json
└── node_modules/   (if dependencies are installed)
```

The structure is intentionally minimal so you can extend it based on your project needs.

## 🏗 Architecture Philosophy
- Minimal Express.js setup
- Easy to scale and customize
- No forced patterns or frameworks
- Cloud-ready and platform-agnostic
- Inspired by Twelve-Factor App principles

## ☁️ Deployment Ready
Projects generated with `create-node-craft` work seamlessly with:

- Render
- Railway
- Heroku
- DigitalOcean
- AWS / VPS

Standard production commands:

```bash
npm install
npm start
```

## 🔮 Roadmap
Planned and upcoming features:

- [ ] TypeScript support (`--typescript`)
- [ ] Authentication starter (`--auth`)
- [ ] Database options (`--postgres`, `--mysql`)
- [ ] Docker support
- [ ] pnpm / yarn auto-detection
- [ ] Optional project presets

## 🤝 Contributing
Contributions, issues, and feature requests are welcome.  
Feel free to open an issue or submit a pull request.

## 📄 License
ISC
