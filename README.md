# Create My Node App 🚀

[![CircleCI](https://circleci.com/gh/google/create-my-node-app.svg?style=svg)](https://circleci.com/gh/google/create-my-node-app)
[![npm version](https://badge.fury.io/js/create-my-node-app.svg)](https://badge.fury.io/js/create-my-node-app)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**Build modern Node.js backends without the headache.**

A powerful CLI to bootstrap production-ready Node.js backend architectures with zero configuration. In a single command, execute a complete production-grade architecture that adheres to the **Twelve-Factor App** methodology. We handle the boring setup—database connections, security (CORS/Helmet), authentication, and project structure—so you can focus on writing logic immediately.

---

## Quick Start

### Creating an App

Get started in seconds:

```bash
npx create-node-craft my-app
cd my-app
npm run dev
```

This commands creates a new repository, installs dependencies, and sets up a robust Express backend with MongoDB support.

### Deploying to Production

```bash
npm start
```

Runs the application in production mode. For cloud deployment (e.g., Render, AWS, K8s), simply push your code and use `npm install && npm start` as your build/start commands.

---

## What’s Included?

`create-my-node-app` automatically sets up and manages:

-   **Backend Core**: A production-ready Express.js server structure.
-   **Database Ready**: Pre-configured **Mongoose** connection with connection pooling and retry logic.
-   **Authentication**: Built-in JWT and Bcrypt implementation for secure auth flows.
-   **Security**: Hardened with **CORS**, secure headers, and validation using **Joi**.
-   **Developer Experience**:
    -   Hot-reloading with `nodemon`
    -   Linting with `ESLint`
    -   Interactive Setup Script (`npm run setup`)
-   **Architecture**: Modular design (Controllers, Services, Routes) suitable for scaling to microservices.

---

## Features

### zero-config Setup
The CLI handles the tedious parts of project initialization. It copies best-practice templates, installs dependencies, and even offers an interactive setup to personalize your `package.json`.

### Validated & Secure
We use the latest stable versions of industry-standard libraries:
-   `express`
-   `mongoose`
-   `jsonwebtoken`
-   `joi`
-   `cors`
-   `dotenv`

### Docker Ready (Coming Soon)
Future updates will include automatic `Dockerfile` and `docker-compose.yml` generation for containerized deployments and easy database orchestration.

---

## Free App Hosting

This architecture is platform-agnostic but optimized for modern cloud platforms:
-   **Render**: Auto-detects Node environment.
-   **Railway**: Zero-config deployment.
-   **Heroku / DigitalOcean**: Standard `npm start` entry point.

---

## Contributing

If you feel that this tool can be improved, feel free to open an issue or pull request! We value community feedback to make this the standard for Node.js backend generation.

## License

ISC
