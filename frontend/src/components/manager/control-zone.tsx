import { useEffect, useState } from 'react';
import { 
  ArrowRightLeft, 
  BarChart3, 
  Calendar, 
  UserCircle2,
  Lightbulb,
  TrendingUp,
  Activity
} from 'lucide-react';

export function ControlZone() {
  return (
    <div className="mb-9">
      <div className="flex items-center gap-2.5 mb-4 text-[11px] tracking-[0.1em] text-[#9CA3AF] uppercase font-[600]">
        <span className="bg-[#2F80ED] text-white px-2.5 py-1 rounded-[8px] text-[11px] font-[700] tracking-[0.06em] flex items-center gap-1.5">
          <Activity size={14} />
          CONTROL ZONE
        </span>
        <span>Monitoring · Performance · Deadlines</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      {/* Workload + Performance */}
      <div className="grid grid-cols-2 gap-4 mb-7">
        <Card title="Team Workload Distribution" icon={BarChart3} action="Reassign">
          <WorkloadItem name="Rahul K." percentage={95} color="#EB5757" tag="OVERLOADED" tagStyle="over" />
          <WorkloadItem name="Karan B." percentage={85} color="#F59E0B" tag="HIGH" tagStyle="warn" />
          <WorkloadItem name="Priya S." percentage={70} color="#27AE60" tag="OPTIMAL" tagStyle="ok" />
          <WorkloadItem name="Meena V." percentage={60} color="#27AE60" tag="OPTIMAL" tagStyle="ok" />
          <WorkloadItem name="Dev K." percentage={25} color="#9CA3AF" tag="IDLE" tagStyle="idle" />
          <WorkloadItem name="Sita R." percentage={15} color="#9CA3AF" tag="IDLE" tagStyle="idle" />
          <div className="mt-3 p-2.5 bg-[#FEF3C7] border border-[#FDE68A] rounded-[12px] text-[11px] text-[#111827] font-[500] flex items-start gap-2">
            <Lightbulb size={14} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
            Recommend reassigning 2 tasks from Rahul K → Dev K / Sita R
          </div>
        </Card>

        <Card title="Weekly Performance Trend" icon={TrendingUp} action="Report" titleExtra={
          <span className="bg-[#EFF6FF] text-[#2F80ED] px-2 py-1 rounded-full text-[10px] font-[700] tracking-[0.06em]">MARCH</span>
        }>
          <div className="flex gap-5 mb-4">
            <div>
              <div className="text-[28px] font-[800] text-[#2F80ED] tracking-[-0.02em]">
                82<span className="text-[16px]">%</span>
              </div>
              <div className="text-[10px] text-[#9CA3AF] font-[600] tracking-[0.06em]">TEAM AVG</div>
            </div>
            <div>
              <div className="text-[28px] font-[800] text-[#27AE60] tracking-[-0.02em]">↑4%</div>
              <div className="text-[10px] text-[#9CA3AF] font-[600] tracking-[0.06em]">VS LAST WK</div>
            </div>
            <div>
              <div className="text-[28px] font-[800] text-[#2F80ED] tracking-[-0.02em]">14</div>
              <div className="text-[10px] text-[#9CA3AF] font-[600] tracking-[0.06em]">TASKS DONE</div>
            </div>
          </div>
          <PerformanceChart />
          <div className="mt-3 p-2.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-[12px] flex items-start gap-2">
            <Lightbulb size={16} className="text-[#2F80ED] flex-shrink-0 mt-0.5" />
            <div className="text-[11px] text-[#111827] font-[500]">
              <span className="font-[700]">Insight:</span> Performance dropped in W3 due to 3 reported blockers. Recovery in W4 after blocker resolution.
            </div>
          </div>
          <div className="h-px bg-[#E5E7EB] my-3" />
          <div className="text-[11px] text-[#9CA3AF] mb-2.5 font-[600] tracking-[0.06em]">TOP PERFORMERS</div>
          <MemberRow name="Priya S." role="Frontend Dev" initials="PS" color="#27AE60" score="94%" scoreColor="#27AE60" statusColor="#27AE60" />
          <MemberRow name="Karan B." role="Backend Dev" initials="KB" color="#27AE60" score="89%" scoreColor="#27AE60" statusColor="#27AE60" />
          <MemberRow name="Meena V." role="QA Engineer" initials="MV" color="#F59E0B" score="71%" scoreColor="#F59E0B" statusColor="#F59E0B" />
        </Card>
      </div>

      {/* Deadlines + 1:1 Meetings */}
      <div className="grid grid-cols-[1.2fr,0.8fr] gap-4">
        <Card title="Upcoming Deadlines" icon={Calendar} action="View Calendar">
          <DeadlineItem day="02" month="APR" dayColor="#EB5757" title="Sprint-14 Delivery" subtitle="PRODUCT ENGINEERING · ALL HANDS" urgency="2 DAYS" urgencyType="hot" />
          <DeadlineItem day="07" month="APR" dayColor="#F59E0B" title="Q1 Performance Reviews" subtitle="HR DEADLINE · ALL REPORTS" urgency="7 DAYS" urgencyType="near" />
          <DeadlineItem day="15" month="APR" dayColor="#27AE60" title="API v3.0 Go-Live" subtitle="INFRA TEAM · RELEASE GATE" urgency="15 DAYS" urgencyType="ok" />
          <DeadlineItem day="22" month="APR" dayColor="#27AE60" title="Budget Proposal — Q2" subtitle="FINANCE · MANAGER SUBMISSION" urgency="22 DAYS" urgencyType="ok" />
        </Card>

        <Card title="1:1 Meeting Tracker" icon={UserCircle2} action="Schedule">
          <div className="flex gap-3.5 mb-3.5">
            <div className="text-center">
              <div className="text-[24px] font-[800] text-[#27AE60] tracking-[-0.02em]">4</div>
              <div className="text-[10px] text-[#9CA3AF] font-[600] tracking-[0.06em]">DONE</div>
            </div>
            <div className="text-center">
              <div className="text-[24px] font-[800] text-[#2F80ED] tracking-[-0.02em]">3</div>
              <div className="text-[10px] text-[#9CA3AF] font-[600] tracking-[0.06em]">SCHEDULED</div>
            </div>
            <div className="text-center">
              <div className="text-[24px] font-[800] text-[#F59E0B] tracking-[-0.02em]">4</div>
              <div className="text-[10px] text-[#9CA3AF] font-[600] tracking-[0.06em]">PENDING</div>
            </div>
          </div>
          <MeetingItem name="Rahul K." time="TODAY · 2:00 PM" initials="RK" color="#2F80ED" status="SCHEDULED" statusType="scheduled" />
          <MeetingItem name="Priya S." time="APR 2 · 10:00 AM" initials="PS" color="#2F80ED" status="SCHEDULED" statusType="scheduled" />
          <MeetingItem name="Dev K." time="No meeting in 3 weeks" initials="DK" color="#F59E0B" status="OVERDUE" statusType="pending" />
          <MeetingItem name="Meena V." time="Mar 25 — DONE" initials="MV" color="#27AE60" status="DONE" statusType="done" />
        </Card>
      </div>
    </div>
  );
}

function Card({ title, icon: Icon, action, children, titleExtra }: any) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 relative overflow-hidden transition-all duration-200 hover:shadow-md" style={{ 
      animation: 'fadeUp 0.4s both',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
    }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-[15px] font-[700] text-[#111827]">
            {Icon && <Icon size={18} className="text-[#4B5563]" />}
            {title}
          </div>
          {titleExtra}
        </div>
        <a className="text-[12px] text-[#2F80ED] cursor-pointer hover:underline font-[600]">
          {action}
        </a>
      </div>
      {children}
    </div>
  );
}

function WorkloadItem({ name, percentage, color, tag, tagStyle }: any) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => setWidth(percentage), 300);
  }, [percentage]);

  const tagStyles = {
    over: 'bg-[#FEE2E2] text-[#EB5757] border border-[#FCA5A5]',
    ok: 'bg-[#ECFDF5] text-[#27AE60] border border-[#A7F3D0]',
    idle: 'bg-[#F3F4F6] text-[#9CA3AF] border border-[#E5E7EB]',
    warn: 'bg-[#FEF3C7] text-[#F59E0B] border border-[#FDE68A]',
  };

  const isActionable = tagStyle === 'over' || tagStyle === 'idle';

  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="text-[13px] w-[90px] flex-shrink-0 text-[#111827] font-[600]">{name}</div>
      <div className="flex-1 h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-[800ms]" style={{ 
          width: `${width}%`,
          background: color,
          transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)'
        }} />
      </div>
      <div className="text-[14px] w-[42px] text-right flex-shrink-0 font-[800] tracking-[-0.02em]" style={{ color }}>
        {percentage}%
      </div>
      <div className={`text-[10px] px-2 py-1 rounded-full flex-shrink-0 font-[700] tracking-[0.06em] ${tagStyles[tagStyle as keyof typeof tagStyles]}`}>
        {tag}
      </div>
      {isActionable && (
        <button className="text-[11px] px-2.5 py-1.5 rounded-[8px] bg-[#2F80ED] text-white font-[600] hover:bg-[#2563EB] transition-all flex items-center gap-1 flex-shrink-0">
          <ArrowRightLeft size={12} />
          Reassign
        </button>
      )}
    </div>
  );
}

function PerformanceChart() {
  const weeks = [
    { label: 'W1', value: 78, color: '#2F80ED' },
    { label: 'W2', value: 85, color: '#2F80ED' },
    { label: 'W3', value: 72, color: '#EB5757' },
    { label: 'W4', value: 82, color: '#27AE60' },
  ];

  return (
    <div className="flex items-end justify-between gap-3 h-24 mb-3">
      {weeks.map((week, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-[#F3F4F6] rounded-t-[8px] flex items-end overflow-hidden" style={{ height: '80px' }}>
            <div 
              className="w-full rounded-t-[8px] transition-all duration-700"
              style={{ 
                height: `${week.value}%`,
                background: week.color,
              }} />
          </div>
          <div className="text-[10px] text-[#9CA3AF] text-center mt-1.5 font-[600]">
            {week.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function MemberRow({ name, role, initials, color, score, scoreColor, statusColor }: any) {
  return (
    <div className="flex items-center gap-3 mb-2.5 p-2 rounded-[10px] hover:bg-[#F9FAFB] transition-all">
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-[700] flex-shrink-0" style={{
        background: `${color}15`,
        color: color,
      }}>
        {initials}
      </div>
      <div className="flex-1">
        <div className="text-[13px] font-[600] text-[#111827]">{name}</div>
        <div className="text-[11px] text-[#4B5563] font-[500]">{role}</div>
      </div>
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: statusColor }} />
      <div className="text-[13px] w-10 text-right font-[700]" style={{ color: scoreColor }}>
        {score}
      </div>
    </div>
  );
}

function DeadlineItem({ day, month, dayColor, title, subtitle, urgency, urgencyType }: any) {
  const urgencyStyles = {
    hot: 'bg-[#FEE2E2] text-[#EB5757]',
    near: 'bg-[#FEF3C7] text-[#F59E0B]',
    ok: 'bg-[#ECFDF5] text-[#27AE60]',
  };

  return (
    <div className="flex items-center gap-3.5 mb-3 p-3 rounded-[12px] hover:bg-[#F9FAFB] transition-all cursor-pointer">
      <div className="text-center flex-shrink-0 w-11">
        <div className="text-[26px] font-[800] leading-none tracking-[-0.02em]" style={{ color: dayColor }}>
          {day}
        </div>
        <div className="text-[10px] text-[#9CA3AF] uppercase font-[600] tracking-[0.06em]">{month}</div>
      </div>

      <div className="flex-1">
        <div className="text-[13px] font-[700] text-[#111827]">{title}</div>
        <div className="text-[11px] text-[#4B5563] mt-0.5 font-[500]">{subtitle}</div>
      </div>
      <div className={`text-[10px] px-2 py-1 rounded-full flex-shrink-0 font-[700] tracking-[0.06em] ${urgencyStyles[urgencyType as keyof typeof urgencyStyles]}`}>
        {urgency}
      </div>
    </div>
  );
}

function MeetingItem({ name, time, initials, color, status, statusType }: any) {
  const statusStyles = {
    scheduled: 'bg-[#EFF6FF] text-[#2F80ED]',
    pending: 'bg-[#FEF3C7] text-[#F59E0B]',
    done: 'bg-[#ECFDF5] text-[#27AE60]',
  };

  return (
    <div className="flex items-center gap-3 mb-2.5 p-2 rounded-[10px] hover:bg-[#F9FAFB] transition-all cursor-pointer">
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-[700] flex-shrink-0" style={{
        background: `${color}15`,
        color: color,
      }}>
        {initials}
      </div>
      <div className="flex-1">
        <div className="text-[13px] font-[600] text-[#111827]">{name}</div>
        <div className="text-[10px] text-[#4B5563] mt-0.5 font-[500]">{time}</div>
      </div>
      <div className={`text-[10px] px-2 py-1 rounded-full font-[700] tracking-[0.06em] ${statusStyles[statusType as keyof typeof statusStyles]}`}>
        {status}
      </div>
    </div>
  );
}
