import { CalendarDays, PartyPopper, Users, MapPin, Video, Building } from 'lucide-react';

export function PlanningGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-[fadeUp_0.7s_ease_both] [animation-delay:0.2s]">
      {/* Upcoming Events */}
      <div className="bg-white border-2 border-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-xl hover:border-[#2F80ED]/30 transition-all">
        <div className="text-base font-bold text-foreground flex items-center gap-2.5">
          <CalendarDays className="w-5 h-5 text-[#2F80ED]" />
          Upcoming Events
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex gap-3.5 items-start p-3 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-xl cursor-pointer hover:shadow-md transition-all border border-[#2F80ED]/20">
            <div className="flex flex-col items-center bg-white border-2 border-[#2F80ED]/40 rounded-xl px-3 py-2 min-w-[50px] flex-shrink-0 shadow-sm">
              <span className="text-xl font-extrabold leading-none text-[#2F80ED]">05</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Apr</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold leading-tight text-foreground mb-1">Team Offsite 2026</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                Bangalore · All-day
              </div>
            </div>
          </div>

          <div className="flex gap-3.5 items-start p-3 bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] rounded-xl cursor-pointer hover:shadow-md transition-all border border-[#56CCF2]/20">
            <div className="flex flex-col items-center bg-white border-2 border-[#56CCF2]/40 rounded-xl px-3 py-2 min-w-[50px] flex-shrink-0 shadow-sm">
              <span className="text-xl font-extrabold leading-none text-[#56CCF2]">12</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Apr</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold leading-tight text-foreground mb-1">Company Town Hall</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Video className="w-3 h-3" />
                Virtual · 3:00 PM
              </div>
            </div>
          </div>

          <div className="flex gap-3.5 items-start p-3 bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] rounded-xl cursor-pointer hover:shadow-md transition-all border border-[#27AE60]/20">
            <div className="flex flex-col items-center bg-white border-2 border-[#27AE60]/40 rounded-xl px-3 py-2 min-w-[50px] flex-shrink-0 shadow-sm">
              <span className="text-xl font-extrabold leading-none text-[#27AE60]">20</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Apr</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold leading-tight text-foreground mb-1">Q2 Kickoff Meet</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Building className="w-3 h-3" />
                Conference Hall A
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Holidays */}
      <div className="bg-white border-2 border-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-xl hover:border-[#27AE60]/30 transition-all">
        <div className="text-base font-bold text-foreground flex items-center gap-2.5">
          <PartyPopper className="w-5 h-5 text-[#27AE60]" />
          Upcoming Holidays
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 p-2.5 px-3.5 bg-gradient-to-br from-[#ECFDF5] to-white rounded-xl border border-[#27AE60]/20 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#27AE60] flex-shrink-0 shadow-sm"></span>
            <div className="flex-1">
              <div className="text-sm font-bold">Dr. Ambedkar Jayanti</div>
              <div className="text-xs text-muted-foreground mt-0.5 font-medium">Thu, 14 Apr 2026</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 px-3.5 bg-gradient-to-br from-[#EFF6FF] to-white rounded-xl border border-[#2F80ED]/20 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2F80ED] flex-shrink-0 shadow-sm"></span>
            <div className="flex-1">
              <div className="text-sm font-bold">Good Friday</div>
              <div className="text-xs text-muted-foreground mt-0.5 font-medium">Fri, 18 Apr 2026</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 px-3.5 bg-gradient-to-br from-[#F0F9FF] to-white rounded-xl border border-[#56CCF2]/20 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#56CCF2] flex-shrink-0 shadow-sm"></span>
            <div className="flex-1">
              <div className="text-sm font-bold">Tamil New Year</div>
              <div className="text-xs text-muted-foreground mt-0.5 font-medium">Tue, 14 Apr 2026</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 px-3.5 bg-gradient-to-br from-[#FFFBEB] to-white rounded-xl border border-[#F2C94C]/20 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2C94C] flex-shrink-0 shadow-sm"></span>
            <div className="flex-1">
              <div className="text-sm font-bold">Maharashtra Day</div>
              <div className="text-xs text-muted-foreground mt-0.5 font-medium">Fri, 01 May 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Meetings */}
      <div className="bg-white border-2 border-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-xl hover:border-[#56CCF2]/30 transition-all">
        <div className="text-base font-bold text-foreground flex items-center gap-2.5">
          <Users className="w-5 h-5 text-[#56CCF2]" />
          Today's Meetings
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center p-2.5 px-3.5 bg-gradient-to-br from-[#EFF6FF] to-white rounded-xl border border-[#2F80ED]/20 shadow-sm">
            <div className="text-sm font-bold text-[#2F80ED] min-w-[55px] text-center">10:00</div>
            <div className="text-sm font-bold flex-1">Daily Standup</div>
            <span className="text-xs px-2.5 py-1 bg-[#2F80ED]/10 text-[#2F80ED] rounded-lg font-semibold">Zoom</span>
          </div>

          <div className="flex gap-3 items-center p-2.5 px-3.5 bg-gradient-to-br from-[#F0F9FF] to-white rounded-xl border border-[#56CCF2]/20 shadow-sm">
            <div className="text-sm font-bold text-[#56CCF2] min-w-[55px] text-center">12:30</div>
            <div className="text-sm font-bold flex-1">Design Review</div>
            <span className="text-xs px-2.5 py-1 bg-[#56CCF2]/10 text-[#56CCF2] rounded-lg font-semibold">Teams</span>
          </div>

          <div className="flex gap-3 items-center p-2.5 px-3.5 bg-gradient-to-br from-[#ECFDF5] to-white rounded-xl border border-[#27AE60]/20 shadow-sm">
            <div className="text-sm font-bold text-[#27AE60] min-w-[55px] text-center">15:00</div>
            <div className="text-sm font-bold flex-1">Sprint Planning</div>
            <span className="text-xs px-2.5 py-1 bg-[#27AE60]/10 text-[#27AE60] rounded-lg font-semibold">Office</span>
          </div>

          <div className="flex gap-3 items-center p-2.5 px-3.5 bg-gradient-to-br from-[#FFFBEB] to-white rounded-xl border border-[#F2C94C]/20 shadow-sm">
            <div className="text-sm font-bold text-[#F2C94C] min-w-[55px] text-center">17:30</div>
            <div className="text-sm font-bold flex-1">1:1 with Manager</div>
            <span className="text-xs px-2.5 py-1 bg-[#F2C94C]/10 text-[#1F2937] rounded-lg font-semibold">Zoom</span>
          </div>
        </div>
      </div>
    </div>
  );
}