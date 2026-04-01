import { Calendar, Umbrella, CheckCircle2 } from 'lucide-react';

interface StatusCardsProps {
  currentTime: Date;
}

export function StatusCards({ currentTime }: StatusCardsProps) {
  // Calculate hours since 9:04 AM check-in
  const calculateHoursWorked = (date: Date) => {
    const checkin = new Date(date);
    checkin.setHours(9, 4, 0, 0);
    const diff = Math.max(0, date.getTime() - checkin.getTime());
    const hrs = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-[fadeUp_0.65s_ease_both] [animation-delay:0.15s]">
      {/* Attendance Card */}
      <div className="bg-gradient-to-br from-[#EFF6FF] to-white border-2 border-[#2F80ED]/20 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#2F80ED]/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2F80ED]/10 transition-all">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-[#2F80ED] rounded-xl flex items-center justify-center shadow-md shadow-[#2F80ED]/20">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm px-3 py-1.5 bg-[#2F80ED]/10 text-[#2F80ED] border border-[#2F80ED]/20 rounded-lg font-semibold">
            This Month
          </span>
        </div>
        
        <div className="text-5xl font-extrabold leading-none text-[#2F80ED]">
          22 <span className="text-xl text-muted-foreground font-semibold">/ 26</span>
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="text-base font-bold text-foreground">Attendance</span>
          <span className="text-sm text-muted-foreground font-medium">3 late · 1 half-day</span>
        </div>
        
        <div className="mt-1">
          <div className="h-2 rounded-full bg-[#E5E7EB] overflow-hidden mb-2 shadow-inner">
            <div className="h-full rounded-full bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] shadow-sm" style={{ width: '84.6%' }}></div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground font-medium">
            <span>84.6% Present</span>
            <span>26 days</span>
          </div>
        </div>
      </div>

      {/* Leave Balance Card */}
      <div className="bg-gradient-to-br from-[#F0F9FF] to-white border-2 border-[#56CCF2]/20 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#56CCF2]/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#56CCF2]/10 transition-all">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-[#56CCF2] rounded-xl flex items-center justify-center shadow-md shadow-[#56CCF2]/20">
            <Umbrella className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm px-3 py-1.5 bg-[#56CCF2]/10 text-[#56CCF2] border border-[#56CCF2]/20 rounded-lg font-semibold">
            Balance
          </span>
        </div>
        
        <div className="flex items-center gap-4 mt-1">
          <svg className="flex-shrink-0 drop-shadow-md" width="80" height="80" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="28" fill="none" stroke="#E5E7EB" strokeWidth="10"/>
            <circle cx="36" cy="36" r="28" fill="none" stroke="url(#gradient)" strokeWidth="10"
              strokeDasharray="105.6 70.4" strokeDashoffset="44" strokeLinecap="round"/>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2F80ED" />
                <stop offset="100%" stopColor="#56CCF2" />
              </linearGradient>
            </defs>
            <text x="36" y="42" textAnchor="middle" fill="#1F2937" fontFamily="system-ui" fontWeight="800" fontSize="16">12</text>
          </svg>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2F80ED] shadow-sm"></span>
              <span className="text-sm font-medium">Casual: 5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#56CCF2] shadow-sm"></span>
              <span className="text-sm font-medium">Earned: 5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#27AE60] shadow-sm"></span>
              <span className="text-sm font-medium">Sick: 2</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="text-base font-bold text-foreground">Leave Balance</span>
          <span className="text-sm text-muted-foreground font-medium">12 days remaining</span>
        </div>
      </div>

      {/* Today Status Card */}
      <div className="bg-gradient-to-br from-[#ECFDF5] to-white border-2 border-[#27AE60]/20 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#27AE60]/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#27AE60]/10 transition-all">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-[#27AE60] rounded-xl flex items-center justify-center shadow-md shadow-[#27AE60]/20">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm px-3 py-1.5 bg-[#27AE60]/10 text-[#27AE60] border border-[#27AE60]/20 rounded-lg font-semibold">
            Active
          </span>
        </div>
        
        <div className="text-3xl font-extrabold text-[#27AE60] mt-1">Present</div>
        
        <div className="flex flex-col gap-2.5 mt-0.5">
          <div className="flex justify-between text-sm p-2 bg-white rounded-lg border border-border">
            <span className="text-muted-foreground font-medium">Check-in</span>
            <span className="font-bold text-[#27AE60]">09:04 AM</span>
          </div>
          <div className="flex justify-between text-sm p-2 bg-white rounded-lg border border-border">
            <span className="text-muted-foreground font-medium">Shift</span>
            <span className="font-bold">9 AM – 6 PM</span>
          </div>
          <div className="flex justify-between text-sm p-2 bg-white rounded-lg border border-border">
            <span className="text-muted-foreground font-medium">Work Mode</span>
            <span className="font-bold text-[#2F80ED]">Office</span>
          </div>
          <div className="flex justify-between text-sm p-2 bg-white rounded-lg border border-border">
            <span className="text-muted-foreground font-medium">Hours Today</span>
            <span className="font-bold">{calculateHoursWorked(currentTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}