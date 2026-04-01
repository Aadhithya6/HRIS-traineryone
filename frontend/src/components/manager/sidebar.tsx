import {
  LayoutDashboard, CheckSquare, Users, Flame, AlertTriangle,
  Calendar, MessageSquare, BarChart3, TrendingUp, BookOpen,
  FileText, Settings, LogOut,
} from 'lucide-react';
import { NavLink } from 'react-router';
import { logout, getUser } from '../../api/client';

const navSections = [
  {
    section: 'Priority',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard',   to: '/manager',              end: true  },
      { icon: CheckSquare,     label: 'Approvals',   to: '/manager/approvals',    badge: '!', badgeColor: '#EB5757' },
      { icon: Users,           label: 'Team',        to: '/manager/team'                     },
    ],
  },
  {
    section: 'Execution',
    items: [
      { icon: Flame,           label: 'Tasks',       to: '/manager/tasks',        badge: '3', badgeColor: '#F59E0B' },
      { icon: AlertTriangle,   label: 'Escalations', to: '/manager/escalations'              },
      { icon: Calendar,        label: 'Deadlines',   to: '/manager/deadlines'                },
      { icon: MessageSquare,   label: 'Meetings',    to: '/manager/meetings'                 },
    ],
  },
  {
    section: 'Insights',
    items: [
      { icon: BarChart3,       label: 'Workload',    to: '/manager/workload'                 },
      { icon: TrendingUp,      label: 'Performance', to: '/manager/performance'              },
      { icon: BookOpen,        label: 'Training',    to: '/manager/training'                 },
      { icon: FileText,        label: 'Reports',     to: '/manager/reports'                  },
    ],
  },
];

export function Sidebar() {
  const user = getUser();
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'MG';

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[240px] bg-gradient-to-b from-[#111827] to-[#1F2937] border-r border-[#374151] flex flex-col z-[100] overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#374151]">
        <div className="w-10 h-10 bg-[#2F80ED] rounded-[10px] flex items-center justify-center flex-shrink-0 shadow-lg">
          <LayoutDashboard size={20} className="text-white" />
        </div>
        <div>
          <div className="text-[15px] font-[700] text-white tracking-[-0.02em]">{user?.name || 'Manager'}</div>
          <div className="text-[10px] text-[#9CA3AF] font-[500] tracking-[0.06em]">COMMAND CENTER</div>
        </div>
      </div>

      {/* Nav Sections */}
      <div className="flex-1 overflow-y-auto py-3 px-3">
        {navSections.map((section) => (
          <div key={section.section} className="mb-4">
            <div className="text-[10px] font-[600] tracking-[0.1em] text-[#6B7280] uppercase px-3 mb-1.5">
              {section.section}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] mb-0.5 transition-all duration-150 relative no-underline"
                  style={({ isActive }) => ({
                    background: isActive ? 'rgba(47,128,237,0.15)' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#9CA3AF',
                    borderLeft: isActive ? '3px solid #2F80ED' : '3px solid transparent',
                    marginLeft: '-3px',
                    paddingLeft: isActive ? '21px' : '12px',
                  })}
                >
                  <Icon size={17} className="flex-shrink-0" strokeWidth={2} />
                  <span className="text-[13px] font-[500] flex-1">{item.label}</span>
                  {item.badge && (
                    <span
                      className="text-[10px] font-[700] text-white px-1.5 py-0.5 rounded-full leading-none"
                      style={{ background: item.badgeColor }}
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

      {/* Footer */}
      <div className="border-t border-[#374151] px-3 py-3 flex flex-col gap-0.5">
        <NavLink
          to="/manager/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-all no-underline"
          style={({ isActive }) => ({
            color: isActive ? '#FFFFFF' : '#9CA3AF',
            background: isActive ? 'rgba(47,128,237,0.15)' : 'transparent',
          })}
        >
          <Settings size={17} strokeWidth={2} className="flex-shrink-0" />
          <span className="text-[13px] font-[500]">Settings</span>
        </NavLink>

        {/* User card */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] mt-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-[700] flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #2F80ED, #56CCF2)' }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-[600] text-white truncate">{user?.name || 'Manager'}</div>
            <div className="text-[10px] text-[#9CA3AF]">Team Manager</div>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-all w-full text-left cursor-pointer"
          style={{ color: '#EB5757', background: 'transparent' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(235,87,87,0.08)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <LogOut size={17} strokeWidth={2} className="flex-shrink-0" />
          <span className="text-[13px] font-[500]">Logout</span>
        </button>
      </div>
    </div>
  );
}
