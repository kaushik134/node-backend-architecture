# node-backend-architecture



## Features

- **Modular Architecture**: Clean code structure with strict separation of concerns (Controllers, Services, Models, Routes).
- **Authentication**: Secure JWT-based authentication.
- **Validation**: Request data validation using `Joi`.
- **Database**: efficient MongoDB integration using `Mongoose`.
- **Error Handling**: Centralized error handling and standardized response format.
- **Security**: CORS enabled, Password hashing with `Bcrypt`.
- **Configuration**: Environment variable management with `dotenv`.

## Project Structure

```
├── scripts/            # Utility scripts (e.g., project setup)
├── src/
│   ├── config/         # Database and app configuration
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Custom middlewares (auth, error handling)
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes definition
│   ├── utils/          # Utility functions (response helper, constants)
│   └── validations/    # Joi validation schemas
├── .env.example        # Example environment variables
├── index.js            # App entry point
└── package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (running locally or via Atlas)

### Installation

1. **Clone the repository** (if applicable) or download the source.

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Duplicate `.env.example` to create a `.env` file:
   ```bash
   cp .env.example .env
   ```
   Update the variables in `.env` with your local configuration (Port, MongoDB URI, JWT Secret).

4. **Project Setup (Optional)**
   Run the setup script to personalize the project name, description, and **automatically update all dependencies to their latest versions**.
   ```bash
   npm run setup
   ```

### Running the Application

- **Development Mode** (with hot-reloading via nodemon):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

## Available Scripts

- `npm run dev`: Runs the app in development mode using `nodemon`.
- `npm start`: Runs the app using `node`.
- `npm run lint`: Lints the codebase using `eslint`.
- `npm run setup`: Interactive script to set project details and upgrade dependencies.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Validation**: Joi
- **Auth**: JSON Web Tokens (JWT), Bcrypt
- **Linting**: ESLint
