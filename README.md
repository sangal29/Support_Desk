# SupportDesk Lite – Ticket Management Dashboard

## Links

GitHub Repository: https://github.com/sangal29/Support_Desk.git

Live Demo (Netlify):https://managyour.netlify.app/login

---

## Project Overview

SupportDesk Lite is a React-based ticket management dashboard that allows users to log in, manage support tickets, apply debounced filters, and view basic analytics.

The application simulates real-world dashboard behavior using browser localStorage for authentication and data persistence, without a backend.

This project demonstrates practical React skills such as routing, protected routes, state management, and clean UI handling.

---

## Setup Steps

1. Clone the repository  
   git clone <repository-url>

2. Install dependencies  
   npm install

3. Start the development server  
   npm start

4. Open in browser  
   http://localhost:5173

---

## Key Features

- Login and logout functionality
- Protected routes using React Router
- Ticket CRUD operations (create, view, edit, delete)
- Ticket status and priority management
- Debounced search and filtering
- Dashboard analytics (ticket counts)
- Loading, empty, and error UI states
- Persistent data using localStorage
- Responsive dashboard layout

---

## Authentication Approach

Authentication is simulated using localStorage.

- Login state is stored locally to persist sessions after refresh
- Unauthorized users are redirected to the login page
- Logout clears authentication data from localStorage

This approach mirrors real authentication flow while keeping the application frontend-only.

---

## Dashboard Analytics

The dashboard dynamically displays:

- Total number of tickets
- Ticket count by status
- Ticket count by priority

Analytics update automatically based on stored ticket data.

---

## Key Decisions & Approach

- Used React functional components and hooks
- Used localStorage to simulate backend and session persistence
- Implemented protected routes for security
- Focused on clean, readable, and modular code
- Avoided heavy UI libraries to clearly demonstrate logic
- Implemented debounced filtering for better UX and performance

---

## What I’d Improve With More Time

- Add a real backend (Node.js / Express) with database support
- Implement JWT-based authentication
- Build an Admin Panel for advanced management
- Add role-based access (Admin / User)
- Add additional fields such as:
  - Attendance
  - Absence
  - Performance tracking
- Improve analytics with charts and reports
- Add pagination or infinite scrolling
- Write unit and integration tests

---

## Conclusion

SupportDesk Lite demonstrates a real-world React dashboard with proper routing, authentication simulation, state management, and user-friendly filtering.

The project is designed to be easily extendable with backend services and advanced features in future iterations.
