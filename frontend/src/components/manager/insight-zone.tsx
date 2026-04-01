import { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  FileText, 
  Clock, 
  CheckSquare, 
  UserPlus, 
  CalendarCheck, 
  Award,
  AlertTriangle
} from 'lucide-react';

export function InsightZone() {
  return (
    <div className="mb-9">
      <div className="flex items-center gap-2.5 mb-4 text-[11px] tracking-[0.1em] text-[#9CA3AF] uppercase font-[600]">
        <span className="bg-[#2F80ED] text-white px-2.5 py-1 rounded-[8px] text-[11px] font-[700] tracking-[0.06em] flex items-center gap-1.5">
          <TrendingUp size={14} />
          INSIGHT ZONE
        </span>
        <span>Team Overview · Growth · Reports</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      {/* Skill Gaps - Full Width */}
      <div className="mb-7">
        <Card title="Skill Gaps" icon={Target} action="View Plan">
          <SkillBar label="Cloud / AWS" percentage={38} color="#EB5757" />
          <SkillBar label="System Design" percentage={52} color="#F59E0B" />
          <SkillBar label="Unit Testing" percentage={60} color="#F59E0B" />
          <SkillBar label="React / TS" percentage={74} color="#27AE60" />
          <SkillBar label="Node / APIs" percentage={81} color="#27AE60" />
          <div className="h-px bg-[#E5E7EB] my-3" />
          <div className="text-[11px] text-[#111827] p-2.5 bg-[#FEF3C7] border border-[#FDE68A] rounded-[10px] font-[500] flex items-start gap-2">
            <AlertTriangle size={14} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
            4 members need AWS / Cloud training — Q2 plan recommended
          </div>
        </Card>
      </div>

      {/* Reports */}
      <Card title="Reports & Hiring" icon={FileText} action="Generate All">
        <div className="grid grid-cols-6 gap-3">
          <ReportCard icon={FileText} name="Performance" desc="Monthly team report" />
          <ReportCard icon={Clock} name="Attendance" desc="Presence & hours" />
          <ReportCard icon={CheckSquare} name="Task Delivery" desc="Sprint completion" />
          <ReportCard icon={UserPlus} name="Hiring Requests" desc="3 open positions" highlight />
          <ReportCard icon={CalendarCheck} name="Leave Summary" desc="Team availability" />
          <ReportCard icon={Award} name="Skill Report" desc="Gap & growth plan" />
        </div>
      </Card>
    </div>
  );
}

function Card({ title, icon: Icon, action, children }: any) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-6 relative overflow-hidden transition-all duration-200 hover:shadow-lg" style={{ 
      animation: 'fadeUp 0.4s both',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
    }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-[15px] font-[700] text-[#111827]">
          {Icon && <Icon size={18} className="text-[#4B5563]" />}
          {title}
        </div>
        {action && (
          <a className="text-[12px] text-[#2F80ED] cursor-pointer hover:underline font-[600]">
            {action}
          </a>
        )}
      </div>
      {children}
    </div>
  );
}

function SkillBar({ label, percentage, color }: any) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => setWidth(percentage), 300);
  }, [percentage]);

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-[12px] text-[#111827] font-[600]">{label}</div>
        <div className="text-[12px] font-[700] tracking-[-0.02em]" style={{ color }}>{percentage}%</div>
      </div>
      <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{
          width: `${width}%`,
          background: color,
          transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)'
        }} />
      </div>
    </div>
  );
}

function ReportCard({ icon: Icon, name, desc, highlight }: any) {
  return (
    <div className={`p-4 rounded-[12px] border ${
      highlight 
        ? 'bg-[#EFF6FF] border-[#2F80ED] border-2' 
        : 'bg-[#F9FAFB] border-[#E5E7EB]'
    } cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5`}>
      <div className={`w-10 h-10 rounded-[10px] ${
        highlight ? 'bg-[#2F80ED]' : 'bg-white'
      } flex items-center justify-center mb-3`}>
        <Icon 
          size={20} 
          className={highlight ? 'text-white' : 'text-[#4B5563]'} 
          strokeWidth={2.5} 
        />
      </div>
      <div className="text-[13px] font-[700] text-[#111827] mb-1">{name}</div>
      <div className="text-[11px] text-[#4B5563] font-[500]">{desc}</div>
    </div>
  );
}
