const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ── Storage helpers ───────────────────────────────────────────────────────────

export function getToken(): string | null {
  return localStorage.getItem('hris_token');
}

export function getUser(): { id: number; name: string; email: string; role: string } | null {
  const raw = localStorage.getItem('hris_user');
  return raw ? JSON.parse(raw) : null;
}

export function saveAuth(token: string, user: object) {
  localStorage.setItem('hris_token', token);
  localStorage.setItem('hris_user', JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem('hris_token');
  localStorage.removeItem('hris_user');
  window.location.href = '/login';
}

// ── Core fetch wrapper ────────────────────────────────────────────────────────

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    logout();
    throw new Error('Session expired');
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data as T;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'employee' | 'manager' | 'hr';
}

export interface LeaveRequest {
  id: number;
  leave_type: 'casual' | 'sick' | 'earned';
  start_date: string;
  end_date: string;
  reason: string;
  status: 'pending_manager' | 'pending_hr' | 'approved' | 'rejected';
  created_at: string;
  total_days: number;
  employee_name?: string;
  employee_email?: string;
  manager_name?: string;
  approvals?: Array<{
    role: string;
    action: string;
    comments: string;
    action_at: string;
  }>;
}

// ── Auth API ──────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => request<{ user: User }>('/auth/me'),
};

// ── Leave API ─────────────────────────────────────────────────────────────────

export const leaveApi = {
  // Employee
  apply: (payload: { leave_type: string; start_date: string; end_date: string; reason?: string }) =>
    request<{ message: string; leave: LeaveRequest }>('/leave/apply', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  myLeaves: () => request<{ leaves: LeaveRequest[] }>('/leave/my'),

  // Manager
  teamLeaves: () => request<{ leaves: LeaveRequest[] }>('/leave/team'),

  managerAction: (id: number, action: 'approved' | 'rejected', comments?: string) =>
    request<{ message: string; new_status: string }>(`/leave/${id}/manager-action`, {
      method: 'PATCH',
      body: JSON.stringify({ action, comments }),
    }),

  // HR
  allLeaves: () => request<{ leaves: LeaveRequest[] }>('/leave/all'),

  hrAction: (id: number, action: 'approved' | 'rejected', comments?: string) =>
    request<{ message: string; new_status: string }>(`/leave/${id}/hr-action`, {
      method: 'PATCH',
      body: JSON.stringify({ action, comments }),
    }),
};
