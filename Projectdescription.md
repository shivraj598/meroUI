# Architecture

MeroUI is built as a full-stack Next.js 16 application.

Do NOT create a separate backend server unless it becomes necessary.

Use:

- App Router
- Server Components by default
- Client Components only when required
- Server Actions for forms and mutations
- Route Handlers for APIs
- Prisma for database access
- PostgreSQL as the primary database

Favor server-side rendering and streaming whenever possible to maximize performance and SEO.

The project should follow modern Next.js 16 best practices and avoid unnecessary client-side JavaScript.

