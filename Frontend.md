# Ticket Management Frontend

This is the frontend application for the Ticket Management system, built with React and TypeScript.

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Styling](#styling)
- [Testing](#testing)
- [Configuration](#configuration)

## Project Structure

```
TICKETS_FRONT/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── helpers/
│   ├── Types/
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version specified in `package.json`)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Hamzaelbakkouri/Hahn_Test.git
   ```
2. Navigate to the project directory:
   ```
   cd TICKETS_FRONT
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To start the development server:

```
npm start
```

This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (use with caution)

For more details, refer to the scripts section in `package.json`.

## Styling

This project uses Tailwind CSS for styling. The configuration can be found in `tailwind.config.js` and `postcss.config.js`.

## Testing

Tests are set up with Jest and React Testing Library. Run tests using:

```
npm test
```

## Configuration

- `tsconfig.json`: TypeScript configuration
- `react-app-env.d.ts`: Type declarations for Create React App
- `.gitignore`: Specifies intentionally untracked files to ignore
