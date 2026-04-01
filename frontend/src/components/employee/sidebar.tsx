import {
  Home, Calendar, Umbrella, DollarSign, FileText, Users, Settings, Bell, HelpCircle, LogOut, Building2,
} from 'lucide-react';
import { useState } from 'react';
import { logout, getUser } from '../../api/client';

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const user = getUser();

  const navItems = [
    { name: 'Dashboard',  icon: Home       },
    { name: 'Attendance', icon: Calendar   },
    { name: 'Leave',      icon: Umbrella   },
    { name: 'Payroll',    icon: DollarSign },
    { name: 'Documents',  icon: FileText   },
    { name: 'Team',       icon: Users      },
    { name: 'Settings',   icon: Settings   },
  ];

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'ME';

  return (
    <div className="w-64 h-screen bg-[#111827] flex flex-col fixed left-0 top-0 shadow-2xl overflow-hidden">
      {/* Top Section */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-[#2F80ED] to-[#56CCF2] rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-white">TechCorp</h2>
            <p className="text-xs text-gray-400">Employee Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-[#1F2937] rounded-xl border border-white/10">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2F80ED] to-[#56CCF2] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-white truncate">{user?.name || 'Employee'}</p>
            <p className="text-xs text-gray-400 truncate">Employee</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 py-3 px-3 min-h-0 overflow-y-auto">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white shadow-lg shadow-[#2F80ED]/30'
                    : 'text-gray-300 hover:bg-[#1F2937] hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-3 border-t border-white/10 space-y-1 flex-shrink-0">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm text-gray-300 hover:bg-[#1F2937] hover:text-white transition-all relative">
          <Bell className="w-5 h-5 text-gray-400" />
          <span>Notifications</span>
          <div className="absolute right-3 w-5 h-5 bg-[#EB5757] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">3</div>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm text-gray-300 hover:bg-[#1F2937] hover:text-white transition-all">
          <HelpCircle className="w-5 h-5 text-gray-400" />
          <span>Help</span>
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm text-[#EB5757] hover:bg-[#EB5757]/10 transition-all"
        >
          <LogOut className="w-5 h-5 text-[#EB5757]" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
