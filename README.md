# SupportDesk Lite – Ticket Management Dashboard

## 🔗 Links
- **GitHub Repository:** [https://github.com/sangal29/Support_Desk.git](https://github.com/sangal29/Support_Desk.git)
- **Live Demo:** [https://managyour.netlify.app/login](https://managyour.netlify.app/login)

---

## 📌 Project Overview
[cite_start]SupportDesk Lite is a lightweight ticket management application built to evaluate React fundamentals and intermediate skills[cite: 3]. [cite_start]It features a clean dashboard for managing support tickets, tracking priorities/status, and viewing basic analytics[cite: 4, 32]. 

[cite_start]The app includes a full CRUD system, authentication simulation, and a responsive UI that works on both desktop and mobile[cite: 9, 11].

---

## ⚙️ Setup Steps
1. **Clone the repository:**
   `git clone https://github.com/sangal29/Support_Desk.git`
2. **Install dependencies:**
   `npm install`
3. **Start the development server:**
   `npm start`
4. **Open in browser:**
   `http://localhost:3000`

---

## 🚀 Key Features
* [cite_start]**Authentication Simulation:** Simple login page with session persistence via `localStorage`[cite: 38, 41].
* [cite_start]**Protected Routes:** Dashboard and ticket views are inaccessible without logging in[cite: 40].
* [cite_start]**Ticket Management (CRUD):** View, Create, Edit, and Delete support tickets[cite: 12, 14, 15, 16].
* [cite_start]**Search & Filters:** Debounced search by title/description and filtering by status/priority[cite: 28, 29, 81].
* [cite_start]**Dashboard Analytics:** Real-time counts of total tickets, status distribution, and priority levels[cite: 33, 34, 35].
* [cite_start]**Comments System:** Add comments to individual ticket details[cite: 23, 25].

---

## 🧠 Key Decisions & Approach
* [cite_start]**State Management:** Used React Functional Components and Hooks (useState/useEffect) for modular logic[cite: 55].
* [cite_start]**API Simulation:** Implemented a mock API approach using `localStorage` to persist ticket data across sessions[cite: 43].
* [cite_start]**Error Handling:** Built explicit UI states for **Loading**, **Empty**, and **Error** scenarios to simulate real-world data fetching[cite: 46, 47, 58].
* [cite_start]**Clean Code:** Prioritized component separation to avoid giant files and ensure maintainability[cite: 57, 60].
* [cite_start]**User UX:** Implemented a confirmation step before ticket deletion to prevent accidental data loss[cite: 59].

---

## 🔮 What I’d Improve With More Time
* [cite_start]**Enhanced Analytics:** Integrate Chart.js or Recharts for visual data representation[cite: 36, 86].
* **Real Backend:** Replace `localStorage` with a Node.js/Express backend and a database like MongoDB.
* [cite_start]**Role-Based Access:** Implement different permissions for Admin and User roles[cite: 85].
* [cite_start]**Testing:** Add unit tests using Jest/React Testing Library for core business logic[cite: 84].
* [cite_start]**Advanced Navigation:** Implement infinite scroll for the ticket list[cite: 52].

---

## 🛠 Tech Stack
* **Frontend:** React (Functional Components)
* [cite_start]**Routing:** React Router [cite: 56]
* **Styling:** CSS / Tailwind (Responsive Layout)
* **Persistence:** Browser localStorage
