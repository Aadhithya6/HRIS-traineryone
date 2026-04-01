import { Star, Target, BookOpen, MessageCircle, TrendingUp, Check } from 'lucide-react';

export function GrowthGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-[fadeUp_0.75s_ease_both] [animation-delay:0.25s]">
      {/* Performance Card */}
      <div className="bg-gradient-to-br from-[#EFF6FF] to-white border-2 border-[#2F80ED]/20 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer hover:-translate-y-1 hover:border-[#2F80ED]/40 hover:shadow-xl hover:shadow-[#2F80ED]/10 transition-all">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-[#2F80ED] rounded-xl flex items-center justify-center shadow-md shadow-[#2F80ED]/20">
            <Star className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-bold text-[#27AE60] flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +4.2%
          </span>
        </div>
        
        <div>
          <div className="text-5xl font-extrabold leading-none text-[#2F80ED]">
            4.6<span className="text-lg text-muted-foreground font-semibold"> /5</span>
          </div>
          <div className="text-base font-bold text-foreground mt-2">Performance</div>
          <div className="text-sm text-muted-foreground mt-1 font-medium">Q1 2026 rating · Top 15%</div>
        </div>
        
        <div className="flex gap-1 items-end h-10 mt-2">
          <div className="flex-1 bg-[#2F80ED]/30 rounded-t shadow-sm" style={{ height: '40%' }}></div>
          <div className="flex-1 bg-[#2F80ED]/40 rounded-t shadow-sm" style={{ height: '55%' }}></div>
          <div className="flex-1 bg-[#2F80ED]/40 rounded-t shadow-sm" style={{ height: '45%' }}></div>
          <div className="flex-1 bg-[#2F80ED]/50 rounded-t shadow-sm" style={{ height: '70%' }}></div>
          <div className="flex-1 bg-[#2F80ED]/70 rounded-t shadow-sm" style={{ height: '80%' }}></div>
          <div className="flex-1 bg-[#2F80ED] rounded-t shadow-md" style={{ height: '90%' }}></div>
        </div>
      </div>

      {/* Goals Card */}
      <div className="bg-gradient-to-br from-[#ECFDF5] to-white border-2 border-[#27AE60]/20 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer hover:-translate-y-1 hover:border-[#27AE60]/40 hover:shadow-xl hover:shadow-[#27AE60]/10 transition-all">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-[#27AE60] rounded-xl flex items-center justify-center shadow-md shadow-[#27AE60]/20">
            <Target className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-bold text-[#27AE60]">3 Active</span>
        </div>
        
        <div>
          <div className="text-5xl font-extrabold leading-none text-[#27AE60]">
            68<span className="text-lg text-muted-foreground font-semibold">%</span>
          </div>
          <div className="text-base font-bold text-foreground mt-2">Goals</div>
          <div className="text-sm text-muted-foreground mt-1 font-medium">Q2 OKR completion</div>
        </div>
        
        <div className="flex flex-col gap-2.5 mt-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">API Integration</span>
              <span className="font-bold text-foreground">85%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#E5E7EB] overflow-hidden shadow-inner">
              <div className="h-full rounded-full bg-[#27AE60] shadow-sm" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">Unit Testing</span>
              <span className="font-bold text-foreground">60%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#E5E7EB] overflow-hidden shadow-inner">
              <div className="h-full rounded-full bg-[#2F80ED] shadow-sm" style={{ width: '60%' }}></div>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">Documentation</span>
              <span className="font-bold text-foreground">40%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#E5E7EB] overflow-hidden shadow-inner">
              <div className="h-full rounded-full bg-[#56CCF2] shadow-sm" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Card */}
      <div className="bg-gradient-to-br from-[#FEF3C7] to-white border-2 border-[#F2994A]/20 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer hover:-translate-y-1 hover:border-[#F2994A]/40 hover:shadow-xl hover:shadow-[#F2994A]/10 transition-all">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-[#F2994A] rounded-xl flex items-center justify-center shadow-md shadow-[#F2994A]/20">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-bold text-[#F2994A]">2 Active</span>
        </div>
        
        <div>
          <div className="text-5xl font-extrabold leading-none text-[#F2994A]">
            3<span className="text-lg text-muted-foreground font-semibold"> Done</span>
          </div>
          <div className="text-base font-bold text-foreground mt-2">Learning</div>
          <div className="text-sm text-muted-foreground mt-1 font-medium">Courses this quarter</div>
        </div>
        
        <div className="flex flex-col gap-2.5 mt-2">
          <div className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-[#F2994A]/30 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2994A] flex-shrink-0 shadow-sm"></span>
            <span className="text-sm font-bold flex-1">React Advanced</span>
            <span className="text-sm text-[#F2994A] font-bold">72%</span>
          </div>
          
          <div className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-[#56CCF2]/30 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#56CCF2] flex-shrink-0 shadow-sm"></span>
            <span className="text-sm font-bold flex-1">AWS Solutions</span>
            <span className="text-sm text-[#56CCF2] font-bold">45%</span>
          </div>
          
          <div className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-[#27AE60]/30 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#27AE60] flex-shrink-0 shadow-sm"></span>
            <span className="text-sm font-bold flex-1">Leadership 101</span>
            <Check className="w-4 h-4 text-[#27AE60]" />
          </div>
        </div>
      </div>

      {/* Feedback Card */}
      <div className="bg-gradient-to-br from-[#FEE2E2] to-white border-2 border-[#EB5757]/20 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer hover:-translate-y-1 hover:border-[#EB5757]/40 hover:shadow-xl hover:shadow-[#EB5757]/10 transition-all">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-[#EB5757] rounded-xl flex items-center justify-center shadow-md shadow-[#EB5757]/20">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-bold text-[#EB5757] px-2.5 py-1 bg-[#EB5757]/10 rounded-lg">New</span>
        </div>
        
        <div>
          <div className="text-5xl font-extrabold leading-none text-[#EB5757]">
            5<span className="text-lg text-muted-foreground font-semibold"> Reviews</span>
          </div>
          <div className="text-base font-bold text-foreground mt-2">Feedback</div>
          <div className="text-sm text-muted-foreground mt-1 font-medium">Recent peer reviews</div>
        </div>
        
        <div className="flex flex-col gap-2.5 mt-2">
          <div className="p-3 bg-white rounded-xl border-l-4 border-[#2F80ED] shadow-sm">
            <div className="text-xs text-foreground leading-relaxed font-medium">
              "Excellent attention to detail on Q1 deliverables."
            </div>
            <div className="text-xs text-muted-foreground mt-2 font-semibold">— Meera S. · Peer</div>
          </div>
          
          <div className="p-3 bg-white rounded-xl border-l-4 border-[#56CCF2] shadow-sm">
            <div className="text-xs text-foreground leading-relaxed font-medium">
              "Great team player, always steps up."
            </div>
            <div className="text-xs text-muted-foreground mt-2 font-semibold">— Ravi K. · Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
}