# Bookstore Admin

A React + Vite admin UI for an online bookstore, built as a hands-on take-home exam.

Live URL: https://bookstore-admin-xi.vercel.app/login

---

## How to run

1. Clone the repo

   git clone https://github.com/your-username/bookstore-admin.git

2. Install dependencies

   npm install

3. Start the dev server

   npm run dev

4. Open http://localhost:5173

No environment variables needed. The API base URL is hardcoded to
https://reactdeveloperexam.ymcargo.tech.

---

## Test accounts

| Email            | Password | Role    |
| ---------------- | -------- | ------- |
| manager@test.com | password | Manager |
| staff@test.com   | password | Staff   |

Manager has full access including cost price and edit.
Staff can only view the books list — the cost price button is not rendered at all.

---

## What I used AI for

I used Claude (claude.ai) throughout this project as a coding assistant:

- Scaffolding the initial project structure (folder layout, Vite + Tailwind setup)
- Generating the axios client with the auth interceptor
- Building the AuthContext with localStorage persistence
- Generating the initial JSX for all pages and modals (LoginPage, BooksPage,
  CostPriceModal, EditBookModal)
- Writing the README

All generated code was reviewed, tested, and verified manually against the API
docs before committing. I tested every feature with both accounts and confirmed
behavior in the browser DevTools network tab.

---

## What I would do differently with more time

- **Extract an `api/books.js` module** — right now API calls are inline inside
  components. I would move them into a dedicated file for cleaner separation.
- **Add a toast notification system** — success and error feedback currently
  relies on inline messages. A toast would feel more polished.
- **Add a ProtectedRoute per permission** — right now the edit button just
  doesn't show for staff, but there's no route-level guard. A proper guard
  would return 403 if someone navigates directly.
- **Loading skeletons** — the spinner works but skeleton rows would feel more
  professional on the books table.
- **Form validation before hitting the API** — the edit form currently relies
  on the API for 422 errors. Client-side validation would give faster feedback.

---

## Decisions I am unsure about

- **Storing permissions from the login response vs calling GET /api/me** — I
  chose to read permissions from the login response and store them in
  localStorage. This avoids an extra network call on every page load but means
  permissions could be stale if they change server-side without a re-login. A
  more robust approach would be to call GET /api/me on app load to always get
  fresh permissions.

- **Updating the table row in-place after edit** — after a successful PUT I
  replace the book in local state instead of refetching the whole page. This is
  faster but if the server transforms any data unexpectedly the UI could be
  out of sync. A refetch would be safer.
