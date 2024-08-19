
# 🌐 Headscale Admin

Welcome to `Headscale Admin`, a web management platform for `Headscale`, built with `Next.js`.

## 🚀 Quick Start

1. Copy the `.env.example` file and save it as `.env.local`.
2. Modify the necessary environment variables in the `.env.local` file.
3. Install dependencies with `pnpm install`.
4. Start the service with `pnpm run dev`.

## 💡 Why Choose Next.js Over a Pure Front-End Solution?

- **Security**: A pure front-end solution typically stores the `ApiKey` locally in the browser, which can pose security risks.
- **Convenience**: Switching PCs or browsers usually requires re-verification of the `ApiKey`.
- **Scalability**: Using `Node.js` to invoke `headscale` allows for features beyond the API, such as ACL editing, version management, service restarts, sub-routing, and more.
- **User Management**: Simplifies the implementation of a standalone user system and permission control, enabling users to manage their devices independently while allowing administrators to manage everything centrally, without exposing the `ApiKey`.

## 📋 Backlog Planning

- Prioritize implementing core features through official APIs, such as managing machines, users, tags, and more.
- Develop an independent user and permission management system.
- Additional improvements and features to be continued.

## 🔨 Current Progress

- 🚧 Machines: In development
- 🚧 User Management: In development
- 🔜 Key Management: Not started yet
- 🔜 ACL Management: Not started yet