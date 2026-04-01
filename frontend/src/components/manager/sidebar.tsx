import { useState } from 'react';
import { LayoutDashboard, Users, CheckSquare, BarChart3, Calendar, Settings, LogOut } from 'lucide-react';
import { logout, getUser } from '../../api/client';

export function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const user = getUser();

  const navItems = [
    { icon: LayoutDashboard, title: 'Dashboard' },
    { icon: Users,           title: 'Team'      },
    { icon: CheckSquare,     title: 'Tasks',    badge: true },
    { icon: BarChart3,       title: 'Reports'   },
    { icon: Calendar,        title: 'Meetings'  },
  ];

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'MG';

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[240px] bg-gradient-to-b from-[#111827] to-[#1F2937] border-r border-[#374151] flex flex-col py-6 px-4 gap-1 z-[100]">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 bg-[#2F80ED] rounded-[10px] flex items-center justify-center flex-shrink-0 shadow-lg">
          <LayoutDashboard size={20} className="text-white" />
        </div>
        <div>
          <div className="text-[15px] font-[700] text-white tracking-[-0.02em]">{user?.name || 'Manager'}</div>
          <div className="text-[10px] text-[#9CA3AF] font-[500] tracking-[0.06em]">COMMAND CENTER</div>
        </div>
      </div>

      {/* Nav */}
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeIndex === index;
        return (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] cursor-pointer transition-all duration-200 relative ${
              isActive ? 'bg-[#1F2937] text-white shadow-lg' : 'text-[#9CA3AF] hover:bg-[#1F2937] hover:text-white'
            }`}
          >
            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2F80ED] rounded-r" />}
            <Icon size={18} className="flex-shrink-0" />
            <span className="text-[14px] font-[500]">{item.title}</span>
            {item.badge && <div className="ml-auto w-2 h-2 bg-[#EB5757] rounded-full flex-shrink-0 animate-pulse" />}
          </div>
        );
      })}

      <div className="mt-auto flex flex-col gap-1">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] cursor-pointer text-[#9CA3AF] hover:bg-[#1F2937] hover:text-white transition-all">
          <Settings size={18} className="flex-shrink-0" />
          <span className="text-[14px] font-[500]">Settings</span>
        </div>
        <div
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] cursor-pointer text-[#EB5757] hover:bg-[#EB5757]/10 transition-all"
        >
          <LogOut size={18} className="flex-shrink-0" />
          <span className="text-[14px] font-[500]">Logout</span>
        </div>
      </div>
    </div>
  );
}
