# Book Notes Organizer

A web application for managing notes about books you’re reading, helping you keep track of characters, places, storylines, and more. Organize your notes with custom categories, each containing fields for detailed information, so you can remember key details as you progress through your books.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Preview images](#preview-images)
- [Learn more](#learn-more)

### Features

- Custom categories: organize notes by creating categories like Characters or Places. E.g.: create a new project, Harry Potter, and add a new category for Wizards.
- Fields: add fields within each category, to make managing your items easier. Add 'Spells' inside 'Wizards', to keep track of the spells each wizard knows.
- Search: Easily search within categories to find notes.
- User Authentication: Auth.js integration for secure login and registration.

### Tech Stack

    •	Framework: Next.js
    •	Database: Neon Database with PostgreSQL
    •	ORM: Drizzle ORM
    •	Authentication: Auth.js
    •	Testing: Jest & React Testing Library

### Prerequisites

    •	Node.js (version 16 or later)
    •	Neon Database with PostgreSQL
    •	Environment Variables: Ensure you have all necessary environment variables

### Getting Started

Clone the repository to your local machine:

```bash
git clone https://github.com/x-adri-x/book-diary.git
cd book-diary
```

Create a Neon Project:

- Sign up at [Neon](https://neon.tech/), create a new project, and set up a PostgreSQL database.
- Get the connection URL: In the Neon dashboard, find the connection string for your database. It should look like this:

```bash
postgres://username:password@hostname:port/dbname
```

Create a .env file in the project root and add the following environment variables. Note: you can generate a secret key with using this command:

```
openssl rand -base64 32
```

```bash
# Database connection
NEON_DATABASE_URL=postgres://username:password@hostname:port/dbname

# Auth.js secret for encryption
AUTH_SECRET=your-secret-key

# Trusted host for production build
AUTH_TRUST_HOST=http://localhost:3000
```

Install dependencies:

```bash
npm install
```

Run Database Migrations

In order to set up your database schema, run the following command to generate and apply migrations:

```bash
npm run migration:generate
npm run migration:migrate
```

Run the application in development mode:

```bash
npm run dev
```

Build and run the application in production mode:

```bash
npm run build
npm run start
```

### Testing

Run tests using Jest and React Testing Library with the following command:

```bash
npm run test
```

### Preview images

<img src="./public/Screenshot%202024-11-02%20at%2015.45.30.png" alt="Login page of the Book Diary application" width="200">
<img src="./public/Screenshot%202024-11-02%20at%2015.46.16.png" alt='Book categories view' width='200' >
<img src="./public/Screenshot%202024-11-02%20at%2015.46.24.png" alt='Category view with items' width='200' >
<img src="./public/Screenshot%202024-11-02%20at%2015.48.55.png" alt='How to page' width='200' >

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
