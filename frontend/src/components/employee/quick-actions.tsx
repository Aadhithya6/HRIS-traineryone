import { Palmtree, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

interface QuickActionsProps {
  onApplyLeave?: () => void;
}

export function QuickActions({ onApplyLeave }: QuickActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-4 animate-[fadeUp_0.6s_ease_both] [animation-delay:0.1s]">
      {/* Apply for Leave */}
      <div
        onClick={onApplyLeave}
        className="relative bg-gradient-to-br from-[#2F80ED] via-[#3B8EF5] to-[#56CCF2] rounded-2xl p-7 cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#2F80ED]/30 transition-all overflow-hidden group"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5"></div>
        <div className="w-14 h-14 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 relative z-10 shadow-lg">
          <Palmtree className="w-7 h-7 text-white" />
        </div>
        <div className="relative z-10">
          <div className="text-xl font-bold text-white mb-1">Apply for Leave</div>
          <div className="text-base text-white/90 mt-1 leading-relaxed">Submit & track leave requests instantly</div>
        </div>
        <div className="flex gap-2 mt-4 relative z-10">
          <span className="text-sm px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium">Casual · Sick · Earned</span>
        </div>
        <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
          <ArrowRight className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Check-In */}
      <div
        onClick={() => navigate('/employee/attendance')}
        className="relative bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] border-2 border-[#27AE60]/20 rounded-2xl p-6 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-[#27AE60]/10 hover:border-[#27AE60]/40 transition-all"
      >
        <div className="w-14 h-14 bg-[#27AE60] rounded-xl flex items-center justify-center mb-3 shadow-md shadow-[#27AE60]/20">
          <MapPin className="w-7 h-7 text-white" />
        </div>
        <div className="text-lg font-bold text-[#1F2937] mb-1">Check-In</div>
        <div className="text-sm text-[#6B7280] leading-relaxed">Mark your attendance</div>
        <div className="absolute bottom-5 right-5 w-9 h-9 rounded-full bg-[#27AE60]/15 flex items-center justify-center hover:bg-[#27AE60]/25 transition-colors">
          <ArrowRight className="w-4 h-4 text-[#27AE60]" />
        </div>
      </div>

      {/* Payslip */}
      <div
        onClick={() => navigate('/employee/payroll')}
        className="relative bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border-2 border-[#F2C94C]/20 rounded-2xl p-6 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F2C94C]/10 hover:border-[#F2C94C]/40 transition-all"
      >
        <div className="w-14 h-14 bg-[#F2C94C] rounded-xl flex items-center justify-center mb-3 shadow-md shadow-[#F2C94C]/20">
          <DollarSign className="w-7 h-7 text-white" />
        </div>
        <div className="text-lg font-bold text-[#1F2937] mb-1">Payslip</div>
        <div className="text-sm text-[#6B7280] leading-relaxed">View & download</div>
        <div className="absolute bottom-5 right-5 w-9 h-9 rounded-full bg-[#F2C94C]/15 flex items-center justify-center hover:bg-[#F2C94C]/25 transition-colors">
          <ArrowRight className="w-4 h-4 text-[#F2C94C]" />
        </div>
      </div>
    </div>
  );
}
