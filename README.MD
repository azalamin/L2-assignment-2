# Order Management

This is just a simple Order Management application. A user can create, read, update and delete the order with valid input.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Documentation](#api-documentation)

## Introduction

This is the the application where a user can create, delete, read, update the order. This allows also user to himself profile.

## Technologies Used

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://github.com/colinhacks/zod)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (latest version)
- [npm](https://www.npmjs.com/)

### Installation

Clone the repository:

```bash
git clone https://github.com/azalamin/L2-assignment-2.git
```

Navigate to the project directory:

```bash
cd l2-assignment-2
```

install dependencies:

```bash
 npm install express mongoose zod
```

### Configuration

Configure your environment variables:

1. Create a .env file in the project root.
2. Add the required environment variables (e.g., MongoDB connection URI).

### Running the Project

Run the development server:

```bash
npm run dev:start
```

The server will be running at http://localhost:5000 by default.

### Project Structure

Explain the structure of your project directory. For example:

```
.
├── src/
│   ├── app/
│   │   ├── config/
│   │   │   ├── index.ts
│   │   ├── modules/
│   │   │   ├── user/
│   │   │   │   ├── user.controller.ts
│   │   │   │   ├── user.interface.ts
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── user.route.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── user.zod.validation.ts
│   │   │   │   │
│   ├── app.ts
│   ├── server.ts
├── .env
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── package.json
├── process.env.d.ts
├── README.MD
├── tsconfig.json
└── vercel.json
```

### Usage

After cloning the project, start the project at local server on port 5000 (default port 5000)

## API Documentation Endpoint

```bash
POST /api/users - Create a new user

GET /api/users - Retrieve a list of all users

GET /api/users/:userId - Retrieve a specific user by ID

PUT /api/users/:userId - Update user information

DELETE /api/users/:userId - Delete a user

PUT /api/users/:userId/orders - Add New Product in Order

GET /api/users/:userId/orders - Retrieve all orders for a specific user

GET /api/users/:userId/orders/total-price - Calculate Total Price of Orders for a Specific User

```

Make sure to add data in the body to update or create user or any required data when requesting something with the Endpoints
