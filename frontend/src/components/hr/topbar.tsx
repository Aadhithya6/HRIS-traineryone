import { Search, Bell, MessageSquare } from 'lucide-react';
import { getUser } from '../../api/client';

export function Topbar() {
  const user = getUser();

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'HR';

  return (
    <header
      className="h-[68px] flex items-center px-7 gap-4 sticky top-0 z-40 border-b"
      style={{ background: '#FFFFFF', borderColor: 'var(--hris-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--hris-text)' }}>
        Dashboard{' '}
        <span style={{ color: 'var(--hris-muted)', fontWeight: 400, fontSize: '13px' }}>
          HR Overview
        </span>
      </div>

      <div className="flex-1 max-w-[380px] ml-5 relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: 'var(--hris-muted)' }}
        />
        <input
          type="text"
          placeholder="Search employees, payroll, reports…"
          className="w-full rounded-[10px] pl-[38px] pr-3.5 py-2 border-[1.5px] outline-none transition-all"
          style={{ background: '#F3F4F6', borderColor: '#F3F4F6', color: 'var(--hris-text)', fontSize: '13px' }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--hris-primary)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(47,128,237,0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#F3F4F6';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div
          className="px-3 py-1.5 rounded-lg border-[1.5px]"
          style={{ background: '#F3F4F6', borderColor: '#F3F4F6', fontSize: '12px', fontWeight: 500, color: 'var(--hris-text2)' }}
        >
          {dateStr}
        </div>

        <button
          className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center border-[1.5px] relative transition-all"
          style={{ background: '#FFFFFF', borderColor: 'var(--hris-border)', color: 'var(--hris-muted)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--hris-primary)';
            e.currentTarget.style.color = 'var(--hris-primary)';
            e.currentTarget.style.background = 'var(--hris-primary-light)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--hris-border)';
            e.currentTarget.style.color = 'var(--hris-muted)';
            e.currentTarget.style.background = '#FFFFFF';
          }}
        >
          <Bell className="w-[18px] h-[18px]" />
          <span
            className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full border-2"
            style={{ background: 'var(--hris-danger)', borderColor: '#FFFFFF' }}
          />
        </button>

        <button
          className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center border-[1.5px] transition-all"
          style={{ background: '#FFFFFF', borderColor: 'var(--hris-border)', color: 'var(--hris-muted)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--hris-primary)';
            e.currentTarget.style.color = 'var(--hris-primary)';
            e.currentTarget.style.background = 'var(--hris-primary-light)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--hris-border)';
            e.currentTarget.style.color = 'var(--hris-muted)';
            e.currentTarget.style.background = '#FFFFFF';
          }}
        >
          <MessageSquare className="w-[18px] h-[18px]" />
        </button>

        <div
          className="w-[38px] h-[38px] rounded-full flex items-center justify-center cursor-pointer border-2"
          style={{
            background: 'linear-gradient(135deg, var(--hris-gradient-from), var(--hris-gradient-to))',
            borderColor: 'var(--hris-border)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '13px',
          }}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
