# Bookstore Admin

A React + Vite admin UI for managing books online. Features login, book listings with pagination, permission-based access, and form handling.

**Live URL:** https://bookstore-admin-xi.vercel.app/login

## Quick Start

### Setup

```bash
git clone <repo-url>
npm install
npm run dev
```

Open http://localhost:5173

### Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Check code
```

## Features

- ✅ Login with validation errors
- ✅ Paginated books table
- ✅ Permission-based access (manager vs staff)
- ✅ View cost price with reason tracking
- ✅ Edit books with error feedback
- ✅ Logout
- ✅ Mobile responsive
- ✅ Error handling with retry

## Test Accounts

| Email            | Password | Access          |
| ---------------- | -------- | --------------- |
| manager@test.com | password | All features    |
| staff@test.com   | password | View books only |

## Tech Stack

- React 18 + Vite
- React Router DOM v6
- Axios (API client)
- Tailwind CSS
- ESLint

## What I Built

**Components:**

- `LoginPage` - Authentication
- `BooksPage` - Main page with books list
- `Header`, `Sidebar` - Layout
- `BooksTable`, `Pagination` - Books display
- `EditBookModal`, `CostPriceModal` - Forms

**Features:**

- Auth context for state management
- API client with token interceptor
- Protected routes
- Form validation (client & server)
- Responsive design

## How I Used AI

I used Claude and ChatGPT to help with:

- Project setup and structure
- Authentication flow
- API integration
- Component creation and styling
- Code organization and refactoring

To give the AI better context, I used the `tree` command to print the project folder structure and pasted it into the chat. This way the AI knew exactly what files existed and where they were located, making it easier to ask for specific instructions, file suggestions, or architectural decisions without confusion.

All code was manually tested against API requirements with both test accounts.

## Future Improvements

If I had more time, I would:

1. **Create a Button Component** - Build a reusable button with variants (primary, secondary, danger), loading states, and sizes. Replace all inline button styling across the codebase.

2. **Implement Atomic Design** - Structure components into atoms (Button, Input, Label), molecules (FormField, Card), and organisms (Forms, Tables, Modals). Makes the codebase more organized and scalable.

3. **Build Reusable Hooks** - Create custom hooks for common patterns:
   - `useForm` - Handle form state, validation, and submission
   - `useAsync` - Manage loading, error, and data states for API calls
   - `usePermission` - Simplify permission checks
   - `useLocalStorage` - Manage persistent state

4. **Additional Ideas**:
   - Extract API calls into service modules
   - Add toast notifications
   - Implement TypeScript
   - Add unit tests
   - Create E2E tests with Cypress

## Notes

- No environment variables needed
- API base URL: https://reactdeveloperexam.ymcargo.tech
- Token stored in browser localStorage
- See [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) for testing guide
