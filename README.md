# Next.js Chat Application

## Project Overview

This is a modern chat application built with Next.js 15, leveraging cutting-edge features like React Server Components (RSC), Server Actions, useFormStatus, and useOptimistic. The project showcases a robust tech stack including Shadcn-ui for styling, Prisma for database operations, NextAuth for authentication, OpenAI for AI-powered features, and Postgres as the database.

## Features

- Real-time chat functionality
- Dark and light theme support
- User authentication with NextAuth
- AI-powered responses using OpenRouter
- Responsive design for various screen sizes

## Tech Stack

- Next.js 14
- React
- TypeScript
- Shadcn-ui
- Prisma
- NextAuth
- OpenAI
- Postgres
- Redux for state management

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm, yarn, or pnpm
- Postgres database

### Installation

1. Clone the repository:

   ```bash
   git clone https://your-repository-url.git
   cd your-project-name
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables (database URL, API keys, etc.).

4. Set up the database:

   ```bash
   npx prisma db push
   ```

5. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `actions/`: Server-side functions
- `app/`: Main application components and pages
- `components/`: Reusable UI components
- `images/`: Static images
- `lib/`: Shared libraries
- `prisma/`: Prisma schema and client
- `public/`: Static public files
- `script/`: Server-side scripts
- `store/`: Redux store and slices
- `types/`: TypeScript type definitions

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run db:push`: Push Prisma schema to the database
- `npm run prisma:studio`: Start Prisma Studio UI
- `npm run prisma:reload`: Reset Prisma migrations

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

```

This README provides a comprehensive overview of your project, including its features, tech stack, setup instructions, project structure, available scripts, deployment information, and more. You may want to customize certain sections, such as the project name, repository URL, and specific features, to match your exact project details.
```
