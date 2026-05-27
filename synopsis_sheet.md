# Project Synopsis: eLEARNING (Mindova) Platform

## 1. Project Title
**eLEARNING (Mindova) Platform**

---

## 2. Project Overview (2–5 lines)
The **eLEARNING (Mindova) Platform** is an interactive, responsive online learning management system designed to provide students and administrators with a seamless educational portal. It supports course enrollment, lecture progress tracking, module video player, dynamic quiz evaluations, and printable certificates of completion. Built using the **MERN Stack** (MongoDB, Express, React, Node.js), it includes a mock authentication fallback to bypass Auth0 requirements, allowing full offline workspace execution.

---

## 3. Main Modules/Features

### A. Dynamic Authentication Portal & Bypassing Auth0
- **Local Credentials Handlers**: Login (`/signin`) and registration (`/register`) pages intercept submit events to save user credentials locally, completely bypassing network dependency and external auth server configuration errors (`Callback URL Mismatch` / `ERR_CONNECTION_REFUSED`).
- **Role-Based Redirects**: Automatically navigates administrative emails (e.g., `admin@gmail.com`) to the **Admin Dashboard** and student profiles to the **Student Dashboard** (`/profile`).

### B. Institutional Student Dashboard (VTU Mockup layout)
- **VTU Sidebar Branding**: A custom light-themed design matching the *"Centre for Online Education, VTU - Belagavi"* sidebar layout with an SVG seal logo and navigation items.
- **Dynamic Stats Summary Cards**: Instant trackers displaying Total Enrollments, Active Applications, Enrolled Courses, and Completed certificates.
- **Course Enrollment Cards**: Interactive cards that display active badges ("Enrolled" or "Awaiting Approval" lock status) and buttons to view content or download completion certificates.
- **Floating Actions**: Quick-access Call support (orange action button) and Support chat (blue action button) anchored on the bottom right.

### C. Administrative Control Panel
- **Stat Analytics Cards**: Displays total system counts (Total Users, Total Courses, active Students, and Instructors).
- **Interactive Requests Table**: Enables administrative approval (`Approve` / `Reject`) of pending student course enrollments in real time.
- **Progress Report Table**: Displays student information, number of enrolled courses, certificates issued, and average completion percentage with a functional print-to-PDF button.

### D. Printable Certificate Generation Engine
- **Verification Engine**: Unlocks a print-ready certificate link immediately when a student reaches 100% video completion on any enrolled course.
- **Customized Printing Layout**: Extracts URL query arguments (`name`, `course`, `date`) and maps them to a classic double-bordered certificate layout, using `@media print` style sheets to strip buttons and format the frame automatically.

### E. Interactive Assessment Module (Quizzes)
- **Dark-Theme Quiz Interface**: Sleek dark card layout displaying questions and options with rounded choice indicators.
- **Radio Selection Evaluation**: Circular radio input elements that highlight selected answers and calculate final assessment scores.
- **Custom Topic Handlers**: Displays matching headers based on the active test route (e.g., Java Quiz, JavaScript Quiz, AI Quiz, React JS Quiz).

---

## 4. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Core** | React.js (v18) | Single Page Application (SPA) view engine |
| **Routing** | React Router (v6) | Client-side routing, query parameters, and sub-routing |
| **Styling & Icons** | Bootstrap 5, Vanilla CSS, FontAwesome 5 | Responsive layouts, grid controls, and modern badge indicators |
| **State Persistence** | HTML5 Web Storage (`localStorage`) | Saves student session, course enrollments, watched videos, and quiz status |
| **Backend API** | Node.js & Express.js | REST APIs supporting registration checks and user feedback |
| **Database** | MongoDB & Mongoose | Document-oriented datastore housing customer feedback data |

---

## 5. Key Implementation Highlights
- **State Synchronicity**: Uses custom storage event dispatchers (`window.dispatchEvent(new Event('storage'))`) to synchronize student progress modifications or admin approval changes in real-time across separate dashboard views without page reloads.
- **No-Refuse Local Fallbacks**: Fully seeds default data (like Ankitha's SQL progress or completed certificates) on initialization to enable end-to-end demonstrations without active backend server requirements.

---

## 6. Special Functionality
- **AI Quiz Assessment**: An integrated AI assessment page (`/test/ai`) populated with dynamic AI questions to evaluate user comprehension.
- **Botpress Chatbot Integration**: A floating, AI-powered interactive chatbot widget (`BotpressChatbot`) injected into the footer of key pages to answer student queries in real time.
- **Dynamic Print Engine**: Custom CSS configurations designed to format print documents specifically for landscape certificates, hiding web-exclusive components.
