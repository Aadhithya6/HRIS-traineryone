import { LayoutGrid, Users, Calendar, DollarSign, MapPin, BarChart3, TrendingUp, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router';
import { getUser, logout } from '../../api/client';

const navSections = [
  { section: 'Main', items: [
    { icon: LayoutGrid, label: 'Dashboard',   to: '/hr',               end: true  },
    { icon: Users,      label: 'Employees',   to: '/hr/employees'                 },
    { icon: Calendar,   label: 'Leave',       to: '/hr/leave',         badge: 4,  badgeColor: 'danger' },
    { icon: DollarSign, label: 'Payroll',     to: '/hr/payroll'                   },
    { icon: MapPin,     label: 'Recruitment', to: '/hr/recruitment',   badge: 5,  badgeColor: 'blue'   },
  ]},
  { section: 'Analytics', items: [
    { icon: BarChart3,  label: 'Reports',     to: '/hr/reports'   },
    { icon: TrendingUp, label: 'Analytics',   to: '/hr/analytics' },
  ]},
  { section: 'System', items: [
    { icon: Settings,   label: 'Settings',    to: '/hr/settings'  },
  ]},
];

export function Sidebar() {
  const user = getUser();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'HR';

  return (
    <aside
      className="w-[220px] fixed top-0 left-0 bottom-0 flex flex-col overflow-hidden z-50"
      style={{ background: 'linear-gradient(180deg, #111827 0%, #1F2937 100%)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="w-[38px] h-[38px] flex items-center justify-center shrink-0 rounded-[10px]"
          style={{ background: 'var(--hris-primary)', color: '#fff', fontWeight: 800, fontSize: '14px', letterSpacing: '-0.5px' }}
        >
          HR
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--hris-sidebar-text)', letterSpacing: '-0.3px' }}>
            HRIS
          </div>
          <div style={{ fontSize: '11px', fontWeight: 400, color: 'var(--hris-sidebar-text-inactive)' }}>
            Admin Portal
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {navSections.map((section, idx) => (
          <div key={idx} className="py-5 px-3">
            <div
              className="px-2 mb-1.5"
              style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--hris-sidebar-text-inactive)', textTransform: 'uppercase' }}
            >
              {section.section}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className="w-full flex items-center gap-2.5 py-2.5 rounded-[10px] mb-0.5 transition-all duration-200 relative"
                  style={({ isActive }) => ({
                    background: isActive ? 'rgba(47,128,237,0.12)' : 'transparent',
                    color: isActive ? 'var(--hris-sidebar-text)' : 'var(--hris-sidebar-text-inactive)',
                    fontSize: '13px',
                    fontWeight: 500,
                    borderLeft: isActive ? '3px solid var(--hris-primary)' : '3px solid transparent',
                    marginLeft: '-12px',
                    paddingLeft: '21px',
                    paddingRight: '12px',
                    display: 'flex',
                    textDecoration: 'none',
                  })}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    if (!el.style.borderLeft.includes('var(--hris-primary)') || el.style.borderLeft.includes('transparent')) {
                      el.style.background = 'var(--hris-sidebar-hover)';
                      el.style.color = 'var(--hris-sidebar-text)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    if (!el.classList.contains('active')) {
                      el.style.background = 'transparent';
                      el.style.color = 'var(--hris-sidebar-text-inactive)';
                    }
                  }}
                >
                  <Icon className="w-[17px] h-[17px] shrink-0" strokeWidth={2} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span
                      className="flex items-center justify-center rounded-full min-w-[18px] h-[18px] px-1"
                      style={{
                        background: item.badgeColor === 'blue' ? 'var(--hris-primary)' : 'var(--hris-danger)',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 700,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Card + Logout */}
      <div className="mt-auto p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px]">
          <div
            className="w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--hris-gradient-from), var(--hris-gradient-to))', color: '#fff', fontWeight: 700, fontSize: '12px' }}
          >
            {initials}
          </div>
          <div className="flex-1 text-left">
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-sidebar-text)' }}>
              {user?.name || 'HR Manager'}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--hris-sidebar-text-inactive)' }}>
              HR Manager
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] transition-all"
          style={{ color: 'var(--hris-danger)', fontSize: '13px', fontWeight: 500 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(235,87,87,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <LogOut className="w-[17px] h-[17px] shrink-0" strokeWidth={2} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
