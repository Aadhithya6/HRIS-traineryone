# HRIS Leave Approval System

Full-stack HRIS with role-based dashboards and a multi-level leave approval workflow.

---

## Architecture

```
fronend_trainery/
├── backend/               ← Node.js + Express + PostgreSQL API
├── login/                 ← Standalone HTML login page
├── employee_dashboard/    ← React + Tailwind (Vite, port 5173)
├── manager_dashboard/     ← React + Tailwind (Vite, port 5174)
└── hr_dashboard/          ← React + Tailwind (Vite, port 5175)
```

---

## Leave Workflow

```
Employee applies → status: pending_manager
Manager approves → status: pending_hr
HR approves      → status: approved
(any stage reject) → status: rejected
```

---

## Prerequisites

- Node.js 18+
- PostgreSQL 14+

---

## Setup

### 1. Create PostgreSQL database

```sql
CREATE DATABASE hris_db;
```

### 2. Backend setup

```bash
cd backend
npm install
```

Copy and configure environment variables:
```bash
cp .env.example .env
# Edit .env with your DB credentials and JWT secret
```

Run schema + seed data:
```bash
npm run seed
```

Start the server:
```bash
npm run dev     # development (nodemon)
npm start       # production
```

Backend runs on **http://localhost:5000**

### 3. Frontend setup

Run each dashboard in a separate terminal:

```bash
# Employee Dashboard (port 5173)
cd employee_dashboard
npm install   # or pnpm install
npm run dev

# Manager Dashboard (port 5174)
cd manager_dashboard
npm install
npm run dev -- --port 5174

# HR Dashboard (port 5175)
cd hr_dashboard
npm install
npm run dev -- --port 5175
```

### 4. Login page

Open `login/index.html` directly in your browser, or serve it with:
```bash
npx serve login -p 3000
```

---

## Demo Credentials

| Role     | Email               | Password |
|----------|---------------------|----------|
| Employee | employee@test.com   | 123456   |
| Manager  | manager@test.com    | 123456   |
| HR       | hr@test.com         | 123456   |

---

## API Reference

### Auth

| Method | Endpoint     | Description         | Auth |
|--------|-------------|---------------------|------|
| POST   | /auth/login | Login, get JWT      | No   |
| GET    | /auth/me    | Get current user    | Yes  |

**POST /auth/login** — Body: `{ email, password }`  
Response: `{ token, user: { id, name, email, role } }`

---

### Leave (all require JWT Bearer token)

| Method | Endpoint                   | Role     | Description                     |
|--------|---------------------------|----------|---------------------------------|
| POST   | /leave/apply              | employee | Apply for leave                 |
| GET    | /leave/my                 | employee | View own leave history          |
| GET    | /leave/team               | manager  | View team's pending requests    |
| PATCH  | /leave/:id/manager-action | manager  | Approve or reject (→ pending_hr)|
| GET    | /leave/all                | hr       | View all pending HR approvals   |
| PATCH  | /leave/:id/hr-action      | hr       | Final approve or reject         |

**POST /leave/apply** — Body:
```json
{
  "leave_type": "casual | sick | earned",
  "start_date": "2026-04-10",
  "end_date": "2026-04-12",
  "reason": "optional text"
}
```

**PATCH /leave/:id/manager-action** — Body:
```json
{
  "action": "approved | rejected",
  "comments": "optional text"
}
```

---

## Database Schema

```
users
  id, name, email, password, role, manager_id

leave_requests
  id, employee_id, leave_type, start_date, end_date, reason, status, created_at, updated_at

leave_approvals
  id, leave_request_id, approver_id, role, action, comments, action_at
```

---

## Backend Folder Structure

```
backend/
├── config/
│   └── db.js                ← PostgreSQL pool
├── controllers/
│   ├── authController.js    ← login, getMe
│   └── leaveController.js   ← all leave logic
├── middleware/
│   ├── auth.js              ← JWT verification
│   └── role.js              ← role-based access control
├── models/
│   ├── schema.sql           ← table definitions
│   └── seed.js              ← sample data seeder
├── routes/
│   ├── auth.js
│   └── leave.js
├── server.js                ← Express entry point
├── .env
└── .env.example
```

---

## Frontend Integration

Each dashboard has:
- `src/api/client.ts` — typed API client with JWT header injection, auto-logout on 401
- Auth guard in `App.tsx` — redirects wrong roles to login page
- Token stored in `localStorage` as `hris_token` and `hris_user`

The **Employee Dashboard** adds:
- `LeaveModal` — form to apply for leave (opens when clicking "Apply for Leave" card)
- `LeaveHistory` — live list of employee's leave requests with status

The **Manager Dashboard** — `ActionZone` fetches real pending team leaves with Approve/Reject buttons

The **HR Dashboard** — `PendingApprovals` fetches all pending_hr leaves with Approve/Reject buttons
