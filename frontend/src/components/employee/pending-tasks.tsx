import { Clock, Calendar, CheckCircle2, Circle } from 'lucide-react';

export function PendingTasks() {
  return (
    <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2F80ED] rounded-2xl p-6 shadow-2xl animate-[fadeUp_0.55s_ease_both] [animation-delay:0.05s]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-white">Pending Actions Required</h3>
            <p className="text-xs text-[#EB5757] font-semibold mt-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              3 tasks need attention today
            </p>
          </div>
        </div>
        <div className="w-14 h-14 bg-[#EB5757] text-white font-extrabold text-xl rounded-full flex items-center justify-center shadow-xl shadow-[#EB5757]/50">
          5
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Today's Tasks */}
        <div className="bg-[#EB5757]/20 backdrop-blur-sm rounded-xl p-4 border border-[#EB5757]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#EB5757]/30 backdrop-blur-sm rounded-lg flex items-center justify-center border border-[#EB5757]/40">
                <Clock className="w-4.5 h-4.5 text-[#EB5757]" />
              </div>
              <span className="font-bold text-lg text-white">Today</span>
            </div>
            <span className="text-sm font-bold bg-[#EB5757] text-white px-3.5 py-1.5 rounded-full shadow-lg">3</span>
          </div>
          
          <div className="flex flex-col gap-2.5">
            {/* Critical Priority */}
            <div className="flex items-start gap-2.5 p-3 bg-[#1e3a5f]/60 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-[#1e3a5f]/80 transition-all group cursor-pointer">
              <Circle className="w-4.5 h-4.5 text-white/40 mt-0.5 flex-shrink-0 group-hover:text-white transition-colors" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight mb-1.5">Fix login API bug</p>
                <span className="text-xs font-extrabold bg-[#EB5757] text-white px-2.5 py-1 rounded-full">CRITICAL</span>
              </div>
            </div>

            {/* High Priority */}
            <div className="flex items-start gap-2.5 p-3 bg-[#1e3a5f]/60 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-[#1e3a5f]/80 transition-all group cursor-pointer">
              <Circle className="w-4.5 h-4.5 text-white/40 mt-0.5 flex-shrink-0 group-hover:text-white transition-colors" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight mb-1.5">Review PR #142</p>
                <span className="text-xs font-bold bg-[#F2C94C] text-[#1F2937] px-2.5 py-1 rounded-full">HIGH</span>
              </div>
            </div>

            {/* Daily Priority */}
            <div className="flex items-start gap-2.5 p-3 bg-[#1e3a5f]/60 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-[#1e3a5f]/80 transition-all group cursor-pointer">
              <Circle className="w-4.5 h-4.5 text-white/40 mt-0.5 flex-shrink-0 group-hover:text-white transition-colors" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight mb-1.5">Submit standup update</p>
                <span className="text-xs font-bold bg-[#56CCF2] text-white px-2.5 py-1 rounded-full">DAILY</span>
              </div>
            </div>
          </div>
        </div>

        {/* This Week's Tasks */}
        <div className="bg-[#2F80ED]/20 backdrop-blur-sm rounded-xl p-4 border border-[#2F80ED]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#2F80ED]/30 backdrop-blur-sm rounded-lg flex items-center justify-center border border-[#2F80ED]/40">
                <Calendar className="w-4.5 h-4.5 text-[#56CCF2]" />
              </div>
              <span className="font-bold text-lg text-white">This Week</span>
            </div>
            <span className="text-sm font-bold bg-[#56CCF2] text-white px-3.5 py-1.5 rounded-full shadow-lg">2</span>
          </div>
          
          <div className="flex flex-col gap-2.5">
            {/* Feature Task */}
            <div className="flex items-start gap-2.5 p-3 bg-[#1e3a5f]/60 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-[#1e3a5f]/80 transition-all group cursor-pointer">
              <Circle className="w-4.5 h-4.5 text-white/40 mt-0.5 flex-shrink-0 group-hover:text-white transition-colors" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight mb-1.5">Complete leave API</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold bg-[#56CCF2] text-white px-2.5 py-1 rounded-full">FEATURE</span>
                  <span className="text-xs font-semibold text-white/60">Due: Thu</span>
                </div>
              </div>
            </div>

            {/* Testing Task */}
            <div className="flex items-start gap-2.5 p-3 bg-[#1e3a5f]/60 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-[#1e3a5f]/80 transition-all group cursor-pointer">
              <Circle className="w-4.5 h-4.5 text-white/40 mt-0.5 flex-shrink-0 group-hover:text-white transition-colors" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight mb-1.5">Write unit tests</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold bg-[#27AE60] text-white px-2.5 py-1 rounded-full">TESTING</span>
                  <span className="text-xs font-semibold text-white/60">Due: Fri</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button className="text-sm font-bold text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20">
          View all tasks →
        </button>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#27AE60]/20 backdrop-blur-sm rounded-lg border border-[#27AE60]/30">
          <CheckCircle2 className="w-4.5 h-4.5 text-[#27AE60]" />
          <span className="text-sm font-bold text-[#27AE60]">12 completed today</span>
        </div>
      </div>
    </div>
  );
}