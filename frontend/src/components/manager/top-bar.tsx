import { Clock } from 'lucide-react';
import { getUser } from '../../api/client';

export function TopBar() {
  const user = getUser();
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'MG';

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="flex items-center justify-between py-5 pb-6 border-b border-[#E5E7EB] mb-7 sticky top-0 z-50 bg-[#F9FAFB]">
      <div>
        <h1 className="text-[24px] font-[800] tracking-[-0.02em] text-[#111827]">Command Center</h1>
        <p className="text-[11px] text-[#9CA3AF] mt-0.5 font-[500] tracking-[0.06em] uppercase">
          Manager View · {user?.name || 'Manager'}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] px-3.5 py-2 text-[12px] text-[#4B5563] font-[500] shadow-sm flex items-center gap-2">
          <Clock size={14} className="text-[#9CA3AF]" />
          {dateStr} · {timeStr}
        </div>
        <div className="w-9 h-9 rounded-full bg-[#2F80ED] flex items-center justify-center text-[13px] font-[600] text-white cursor-pointer shadow-md hover:bg-[#2563EB] transition-all">
          {initials}
        </div>
      </div>
    </div>
  );
}
