# Bookstore Admin

A React + Vite admin UI for an online bookstore, built as a hands-on exam project.

Live URL: https://bookstore-admin-xi.vercel.app/login

## What this app does

This project implements the main exam requirements:

- login screen with validation errors
- paginated books table from the bookstore API
- permission-based UI for cost price access
- modal flow for viewing cost price after entering a reason
- edit-book form with validation feedback
- logout flow

## How to run

1. Clone the repository
2. Install dependencies

   npm install

3. Start the development server

   npm run dev

4. Open http://localhost:5173

## Tech stack

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS

## Test accounts

| Email | Password | Role |
| --- | --- | --- |
| manager@test.com | password | Manager (can edit books and view cost price) |
| staff@test.com | password | Staff (can view books only) |

## What I used AI for

I used AI assistance during development to help with:

- setting up the React + Vite project structure
- creating the authentication and Axios client flow
- generating the main page and modal UI components
- reviewing and refining the README and project flow

All key code paths were checked manually against the API behavior and the project was verified with a production build.

## What I would do differently with more time

- extract API calls into separate service modules
- add toast notifications for success and error feedback
- add stronger route-level permission checks
- improve loading skeletons and form validation UX

## Decisions I am unsure about

- whether permissions should be read from the login response only or refreshed via GET /api/me on app load
- whether book updates should refetch the full list or update the row in place after a successful PUT

## Notes

- No extra environment variables are required for local development.
- The API base URL is currently set in src/api/client.js to https://reactdeveloperexam.ymcargo.tech.
- The Vercel rewrite rule in vercel.json supports direct navigation to client-side routes.

## Verification

This project was verified with:

npm run build
