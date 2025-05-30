# Next.js 15 AI Chat Application

## Project Overview

This is a modern, efficient AI chat application built with Next.js 15, showcasing the latest features and best practices in web development. It's designed to be a rapid prototype for validating ideas, with a focus on simplicity, flexibility, and ease of deployment.

## Key Features and Advantages

1. **Next.js 15 Framework**: Leverages the latest features of Next.js, including React Server Components (RSC), Server Actions, and more.

2. **Minimalist Approach**: No additional request libraries included, allowing developers to integrate their preferred solutions (e.g., react-query, SWR, GraphQL, useRequest).

3. **Unified Frontend and Backend**: A monolithic approach that simplifies development, reduces context switching, and streamlines the idea validation process.

4. **Easy Deployment**: Includes Dockerfile and docker-compose configurations for straightforward deployment. Compatible with services like Cloudflare for quick setup.

5. **Customizable UI with Radix UI**: Utilizes Radix UI components as needed, offering a flexible and extensible design system.

6. **Core Business Logic**: Implements essential features including login, subscription management, payment processing, AI chat functionality, and necessary legal agreements (refund policy, user agreement, subscription terms, company information, contact details).

7. **Theme Support**: Includes both light and dark theme options for enhanced user experience.

8. **MDX Support**: Utilizes MDX for writing documentation and content, allowing for rich, interactive content with embedded React components.

9. **Content Management with Velite**: Integrates Velite for efficient content management, enabling easy creation and organization of documentation and other content.

## Tech Stack

- Next.js 15
- React
- TypeScript
- Radix UI
- Prisma
- NextAuth
- OpenAI / OpenRouter
- PostgreSQL
- Docker
- Velite

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm
- Docker and docker-compose (for deployment)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shiinama/easy-business-ai
   cd easy-business-ai
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
   npx prisma prisma generate
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

## Deployment

1. Build the Docker image:

   ```bash
   docker build -t your-app-name .
   ```

2. Run the application using docker-compose:

   ```bash
   docker-compose up -d
   ```

3. Configure your server's security group to allow incoming traffic.

4. Add an A record in Cloudflare pointing to your server's IP address.

Certainly! I'll update the Project Structure section of the README based on the current project structure. Here's the updated section:

**File: /Users/weishunyu/ChatGPT/README.md**

## Project Structure

The project follows a well-organized structure:

```

easy-business-ai/
├── .velite/
├── actions/
├── app/
│ ├── (private)/
│ │ └── chat/
│ ├── (public)/
│ │ ├── login/
│ │ └── register/
│ ├── api/
│ └── layout.tsx
├── content/
│   └── docs/
├── components/
│ ├── ui/
│ └── [other component folders]
├── constant/
├── lib/
├── prisma/
│ └── schema.prisma
├── public/
├── script/
├── store/
├── types/
├── .env
├── .gitignore
├── Dockerfile
├── LICENSE
├── README.md
├── components.json
├── docker-compose.yml
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── velite.config.ts
└── tsconfig.json

```

- `actions/`: Contains Next Server Actions and Clint Actions.
- `app/`: Main application directory with layouts and pages.
  - `(private)/`: Private routes and components.
  - `(public)/`: Public routes and components.
  - `api/`: API routes for auth.
- `components/`: Reusable UI components.
- `constant/`: Constant values used throughout the application.
- `lib/`: Shared libraries and utilities.
- `prisma/`: Prisma ORM configuration and schema.
- `public/`: Static assets like images and icons.
- `script/`: Custom scripts for project setup or maintenance.
- `store/`: State management files (e.g., Redux).
- `types/`: TypeScript type definitions.
- `content/`: Contains MDX files for documentation and other content.
  - `docs/`: MDX files for documentation pages.
- `.velite/`: Generated Velite output.
- `velite.config.ts`: Configuration file for Velite content management.

Key configuration files:

- `Dockerfile` and `docker-compose.yml`: For containerization and deployment.
- `next.config.mjs`: Next.js configuration.
- `package.json`: Project dependencies and scripts.
- `tailwind.config.ts`: Tailwind CSS configuration.
- `tsconfig.json`: TypeScript configuration.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact Me

If you need a more customized implementation or have interesting commercial projects, I'd love to hear from you. You can reach me via email:

- Email: [contact@linkai.website](mailto:contact@linkai.website)

Feel free to get in touch if you have any questions, need assistance with implementation, or want to discuss potential collaborations. I'm always open to exciting new projects and opportunities!
