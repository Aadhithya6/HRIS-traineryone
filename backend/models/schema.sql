-- HRIS Leave Approval System Schema

-- Drop tables if they exist (for clean resets)
DROP TABLE IF EXISTS leave_approvals CASCADE;
DROP TABLE IF EXISTS leave_requests CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  role       VARCHAR(20) NOT NULL CHECK (role IN ('employee', 'manager', 'hr')),
  manager_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leave requests table
CREATE TABLE leave_requests (
  id          SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  leave_type  VARCHAR(20) NOT NULL CHECK (leave_type IN ('casual', 'sick', 'earned')),
  start_date  DATE NOT NULL,
  end_date    DATE NOT NULL,
  reason      TEXT,
  status      VARCHAR(20) NOT NULL DEFAULT 'pending_manager'
                CHECK (status IN ('pending_manager', 'pending_hr', 'approved', 'rejected')),
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

-- Leave approvals audit log
CREATE TABLE leave_approvals (
  id               SERIAL PRIMARY KEY,
  leave_request_id INTEGER NOT NULL REFERENCES leave_requests(id) ON DELETE CASCADE,
  approver_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role             VARCHAR(20) NOT NULL CHECK (role IN ('manager', 'hr')),
  action           VARCHAR(20) NOT NULL CHECK (action IN ('approved', 'rejected')),
  comments         TEXT,
  action_at        TIMESTAMP DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX idx_leave_requests_employee ON leave_requests(employee_id);
CREATE INDEX idx_leave_requests_status   ON leave_requests(status);
CREATE INDEX idx_users_manager           ON users(manager_id);
