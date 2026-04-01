import { Bell } from 'lucide-react';
import { useState } from 'react';

export function NotificationsBell() {
  const [unreadCount] = useState(3);

  return (
    <button className="relative group">
      <div className="w-12 h-12 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 hover:border-[#2F80ED] flex items-center justify-center transition-all group-hover:scale-105">
        <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#2F80ED] transition-colors" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#EB5757] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
            {unreadCount}
          </div>
        )}
      </div>
    </button>
  );
}
