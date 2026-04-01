import { useState, useEffect } from 'react';
import { 
  Users, 
  BarChart3, 
  Calendar, 
  UserCircle2,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ArrowRightLeft,
  UserCheck,
  Clock,
  Home,
  AlertCircle,
  Target,
  CheckSquare,
  Flame,
  AlertOctagon,
  Zap,
  Check,
  X,
  FileText,
  CalendarCheck,
  CheckCircle2,
  UserPlus,
  Award
} from 'lucide-react';

export function DashboardLayout() {
  return (
    <div className="space-y-7">
      {/* ACTION ZONE */}
      <ZoneHeader icon={Flame} title="ACTION ZONE" subtitle="High Priority · Daily Execution" />
      
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={AlertCircle}
          num="5"
          label="Pending Approvals"
          numColor="#EB5757"
          iconBg="#FEE2E2"
          iconColor="#EB5757"
          badge="URGENT"
          badgeType="error"
        />
        <StatCard
          icon={CheckSquare}
          num="11"
          label="Present Today"
          numColor="#27AE60"
          iconBg="#ECFDF5"
          iconColor="#27AE60"
          badge="+2 WFH"
          badgeType="success"
        />
        <StatCard
          icon={AlertOctagon}
          num="3"
          label="Active Blockers"
          numColor="#EB5757"
          iconBg="#FEE2E2"
          iconColor="#EB5757"
          badge="↑ from 1"
          badgeType="error"
          cardBg="#FEE2E2"
        />
        <StatCard
          icon={Zap}
          num="2"
          label="Escalations"
          numColor="#EB5757"
          iconBg="#FEE2E2"
          iconColor="#EB5757"
          badge="REVIEW"
          badgeType="warning"
        />
      </div>

      {/* Blockers + Escalations Row */}
      <div className="grid grid-cols-2 gap-4">
        <BlockersCard />
        <EscalationsCard />
      </div>

      {/* Leave Approvals */}
      <LeaveApprovalsCard />

      {/* Row 2: Upcoming Deadlines */}
      <UpcomingDeadlinesCard />

      {/* Row 3: 1:1 Meeting Tracker */}
      <MeetingTrackerCard />

      {/* Row 1: Today's Availability + Team Workload Distribution */}
      <div className="grid grid-cols-2 gap-4">
        <TodayAvailabilityCard />
        <TeamWorkloadCard />
      </div>

      {/* Row 4: Weekly Performance */}
      <WeeklyPerformanceCard />

      {/* Skill Gaps + Reports */}
      <div className="grid grid-cols-[1fr,2fr] gap-4">
        <SkillGapsCard />
        <ReportsCard />
      </div>
    </div>
  );
}

// Zone Header Component
function ZoneHeader({ icon: Icon, title, subtitle }: any) {
  return (
    <div className="flex items-center gap-2.5 mb-4 text-[11px] tracking-[0.1em] text-[#9CA3AF] uppercase font-[600]">
      <span className="bg-[#2F80ED] text-white px-2.5 py-1 rounded-[8px] text-[11px] font-[700] tracking-[0.06em] flex items-center gap-1.5">
        <Icon size={14} />
        {title}
      </span>
      <span>{subtitle}</span>
      <div className="flex-1 h-px bg-[#E5E7EB]" />
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, num, label, numColor, iconBg, iconColor, badge, badgeType, cardBg }: any) {
  const badgeStyles = {
    success: 'bg-[#ECFDF5] text-[#27AE60]',
    error: 'bg-[#FEE2E2] text-[#EB5757]',
    warning: 'bg-[#FEF3C7] text-[#F59E0B]',
  };

  return (
    <div className={`bg-white border border-[#E5E7EB] rounded-[18px] p-5 relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5`} style={{
      animation: 'fadeUp 0.4s both',
      background: cardBg || 'white',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
    }}>
      <div className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-3.5" style={{ background: iconBg }}>
        <Icon size={22} style={{ color: iconColor }} strokeWidth={2.5} />
      </div>
      <div className="text-[38px] font-[800] leading-none tracking-[-0.02em] mb-1" style={{ color: numColor }}>
        {num}
      </div>
      <div className="text-[13px] text-[#4B5563] font-[500]">{label}</div>
      <div className={`absolute top-5 right-5 text-[10px] px-2 py-1 rounded-full font-[700] ${badgeStyles[badgeType]}`}>
        {badge}
      </div>
    </div>
  );
}

// Card Wrapper Component
function Card({ title, icon: Icon, action, children, cardBg }: any) {
  return (
    <div className={`bg-white border border-[#E5E7EB] rounded-[18px] p-5 relative overflow-hidden transition-all duration-200 hover:shadow-md`} style={{ 
      animation: 'fadeUp 0.4s both',
      background: cardBg || 'white',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
    }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[15px] font-[700] text-[#111827]">
          {Icon && <Icon size={18} className="text-[#4B5563]" />}
          {title}
        </div>
        {action && (
          <a className="text-[12px] text-[#2F80ED] cursor-pointer hover:underline font-[600] flex items-center gap-1">
            {action}
          </a>
        )}
      </div>
      {children}
    </div>
  );
}

// Blockers Card
function BlockersCard() {
  return (
    <Card title="Reported Blockers" icon={AlertOctagon} action="Manage" cardBg="#FEE2E2">
      <BlockerItem
        severity="critical"
        title="API Gateway integration stalled"
        subtitle="Rahul K · Sprint-14 Task #42"
        ago="2h ago"
      />
      <BlockerItem
        severity="medium"
        title="Design assets not received from UI team"
        subtitle="Priya S · Feature: Dashboard v2"
        ago="5h ago"
      />
      <BlockerItem
        severity="critical"
        title="Prod DB access denied — DevOps ticket pending"
        subtitle="Karan B · Release #3.1.0"
        ago="1d ago"
      />
    </Card>
  );
}

function BlockerItem({ severity, title, subtitle, ago }: any) {
  const severityConfig = {
    critical: {
      icon: AlertOctagon,
      label: 'CRITICAL',
      bg: '#FEF2F2',
      border: '#FEE2E2',
      badgeBg: '#EB5757',
    },
    medium: {
      icon: AlertTriangle,
      label: 'MEDIUM',
      bg: '#FEF3C7',
      border: '#FDE68A',
      badgeBg: '#F59E0B',
    },
  };

  const config = severityConfig[severity as keyof typeof severityConfig];
  const IconComponent = config.icon;

  return (
    <div className={`flex gap-3 p-3.5 rounded-[12px] mb-2.5 cursor-pointer transition-all border-2 hover:shadow-sm`} style={{
      background: config.bg,
      borderColor: config.border,
    }}>
      <div className="flex-shrink-0">
        <IconComponent size={18} style={{ color: config.badgeBg }} strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <div className="flex items-start gap-2 mb-1">
          <div 
            className="text-[10px] font-[700] px-2 py-0.5 rounded-[6px] text-white uppercase tracking-[0.06em]"
            style={{ background: config.badgeBg }}
          >
            {config.label}
          </div>
        </div>
        <div className="text-[13px] font-[700] text-[#111827] mb-1">{title}</div>
        <div className="text-[11px] text-[#4B5563] mb-2 font-[500]">{subtitle}</div>
        <div className="flex gap-2">
          <button className="text-[12px] px-3 py-1.5 rounded-[8px] bg-[#2F80ED] text-white font-[600] hover:bg-[#2563EB] transition-all">
            Assign
          </button>
          <button className="text-[12px] px-3 py-1.5 rounded-[8px] bg-white text-[#4B5563] border border-[#E5E7EB] font-[500] hover:bg-[#F3F4F6] transition-all">
            Resolve
          </button>
        </div>
      </div>
      <div className="text-[11px] text-[#9CA3AF] flex-shrink-0 font-[500]">{ago}</div>
    </div>
  );
}

// Escalations Card
function EscalationsCard() {
  return (
    <Card title="Escalations" icon={Zap} action="View All">
      <div className="flex gap-3 p-3.5 rounded-[12px] bg-[#FEF2F2] border-2 border-[#EB5757] mb-2.5" style={{ boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)' }}>
        <div className="bg-[#EB5757] text-white text-[10px] font-[700] px-2 py-1 rounded-[6px] h-fit flex-shrink-0 uppercase tracking-[0.06em]">
          MISSED
        </div>
        <div>
          <div className="text-[13px] font-[700] text-[#111827]">Sprint-13 delivery missed by 3 days</div>
          <div className="text-[11px] text-[#4B5563] mt-0.5 font-[500]">
            Reported by: Product Lead · Mar 28
          </div>
        </div>
      </div>
      <div className="flex gap-3 p-3.5 rounded-[12px] bg-[#FEF2F2] border-2 border-[#EB5757] mb-2.5" style={{ boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)' }}>
        <div className="bg-[#EB5757] text-white text-[10px] font-[700] px-2 py-1 rounded-[6px] h-fit flex-shrink-0 uppercase tracking-[0.06em]">
          COMPLAINT
        </div>
        <div>
          <div className="text-[13px] font-[700] text-[#111827]">Interpersonal conflict — Dev & QA team</div>
          <div className="text-[11px] text-[#4B5563] mt-0.5 font-[500]">
            Raised by: Meena V · Mar 30
          </div>
        </div>
      </div>
      <div className="p-3 rounded-[12px] bg-[#ECFDF5] border border-[#A7F3D0] flex items-center gap-2.5">
        <CheckSquare size={18} className="text-[#27AE60] flex-shrink-0" />
        <div>
          <div className="text-[13px] font-[600] text-[#27AE60]">3 escalations resolved</div>
          <div className="text-[11px] text-[#4B5563] font-[500]">This week · Well done!</div>
        </div>
      </div>
    </Card>
  );
}

// Leave Approvals Card
function LeaveApprovalsCard() {
  const [approvals, setApprovals] = useState([
    { id: 1, name: 'Rahul K.', type: 'SICK LEAVE · Apr 1–2 · 2 days', initials: 'RK', color: '#2F80ED', impact: 2 },
    { id: 2, name: 'Priya S.', type: 'CASUAL · Apr 3 · 1 day', initials: 'PS', color: '#2F80ED', impact: 1 },
    { id: 3, name: 'Meena V.', type: 'HALF DAY · Apr 1 · AM', initials: 'MV', color: '#27AE60', impact: 0 },
    { id: 4, name: 'Arjun T.', type: 'ANNUAL · Apr 7–11 · 5 days', initials: 'AT', color: '#EB5757', impact: 3 },
  ]);

  const handleApprove = (id: number) => {
    setApprovals(approvals.filter(a => a.id !== id));
  };

  return (
    <Card title="Leave Approvals" icon={UserCheck} action="View All">
      <div className="grid grid-cols-2 gap-3">
        {approvals.map((approval) => (
          <div key={approval.id} className="flex items-start justify-between p-4 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB] transition-all hover:border-[#2F80ED] hover:shadow-sm">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[13px] font-[600] flex-shrink-0" style={{
                background: `${approval.color}15`,
                color: approval.color,
              }}>
                {approval.initials}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-[700] text-[#111827] mb-1">{approval.name}</div>
                <div className="text-[11px] text-[#4B5563] mb-2 font-[500]">
                  {approval.type}
                </div>
                {approval.impact > 0 && (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#F59E0B] bg-[#FEF3C7] px-2 py-1 rounded-[8px] w-fit font-[600]">
                    <Users size={12} />
                    <span>{approval.impact} on leave</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 ml-3">
              <button 
                onClick={() => handleApprove(approval.id)}
                className="bg-[#27AE60] text-white border-0 rounded-[10px] px-3 py-1.5 text-[12px] font-[600] hover:bg-[#229954] transition-all flex items-center gap-1.5 justify-center"
                style={{ boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)' }}
              >
                <Check size={12} />
                Approve
              </button>
              <button 
                onClick={() => handleApprove(approval.id)}
                className="bg-white text-[#EB5757] border-2 border-[#EB5757] rounded-[10px] px-3 py-1.5 text-[12px] font-[600] hover:bg-[#FEF2F2] transition-all flex items-center justify-center"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Today's Availability Card
function TodayAvailabilityCard() {
  const [showOnlyUnavailable, setShowOnlyUnavailable] = useState(false);

  const allAttendees = [
    { name: 'Rahul K', status: 'present' },
    { name: 'Priya S', status: 'present' },
    { name: 'Arun M', status: 'absent' },
    { name: 'Meena V', status: 'wfh' },
    { name: 'Dev K', status: 'late' },
    { name: 'Sita R', status: 'present' },
    { name: 'Karan B', status: 'present' },
    { name: 'Nisha P', status: 'wfh' },
    { name: 'Vijay L', status: 'absent' },
    { name: 'Anjali D', status: 'present' },
  ];

  const filteredAttendees = showOnlyUnavailable 
    ? allAttendees.filter(a => a.status === 'absent' || a.status === 'late')
    : allAttendees;

  return (
    <Card title="Today's Availability" icon={Users} action="Full View">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex gap-4 text-[11px] font-[600]">
          <div className="flex items-center gap-1.5"><span className="text-[#27AE60]">●</span> Present 11</div>
          <div className="flex items-center gap-1.5"><span className="text-[#EB5757]">●</span> Absent 2</div>
          <div className="flex items-center gap-1.5"><span className="text-[#F59E0B]">●</span> Late 1</div>
          <div className="flex items-center gap-1.5"><span className="text-[#2F80ED]">●</span> WFH 2</div>
        </div>
        <button
          onClick={() => setShowOnlyUnavailable(!showOnlyUnavailable)}
          className={`text-[11px] px-3 py-1.5 rounded-[8px] font-[600] transition-all ${
            showOnlyUnavailable 
              ? 'bg-[#2F80ED] text-white shadow-sm' 
              : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:border-[#2F80ED]'
          }`}
        >
          {showOnlyUnavailable ? 'Show All' : 'Issues Only'}
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2 mt-1">
        {filteredAttendees.map((att, i) => (
          <AttPill key={i} name={att.name} status={att.status} highlighted={showOnlyUnavailable} />
        ))}
      </div>
    </Card>
  );
}

function AttPill({ name, status, highlighted }: any) {
  const styles = {
    present: { bg: '#ECFDF5', border: '#A7F3D0', color: '#27AE60', icon: UserCheck, text: 'Present', highlight: false },
    absent: { bg: '#FEE2E2', border: '#EB5757', color: '#EB5757', icon: AlertCircle, text: 'Absent', highlight: true },
    late: { bg: '#FEF3C7', border: '#F59E0B', color: '#F59E0B', icon: Clock, text: 'Late', highlight: true },
    wfh: { bg: '#EFF6FF', border: '#BFDBFE', color: '#2F80ED', icon: Home, text: 'WFH', highlight: false },
  };

  const style = styles[status as keyof typeof styles];
  const shouldHighlight = highlighted && style.highlight;
  const StatusIcon = style.icon;

  return (
    <div className={`aspect-square rounded-[12px] flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-105 text-center p-2 ${
      shouldHighlight ? 'border-2 shadow-md' : 'border'
    }`} style={{
      background: style.bg,
      borderColor: style.border,
    }}>
      <StatusIcon size={16} style={{ color: style.color }} strokeWidth={2.5} />
      <div className="text-[10px] font-[700] leading-tight text-[#111827]">{name}</div>
      <div className="text-[9px] font-[600]" style={{ color: style.color }}>
        {style.text}
      </div>
    </div>
  );
}

// Team Workload Card
function TeamWorkloadCard() {
  return (
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

// Upcoming Deadlines Card
function UpcomingDeadlinesCard() {
  return (
    <Card title="Upcoming Deadlines" icon={Calendar} action="View Calendar">
      <div className="grid grid-cols-2 gap-3">
        <DeadlineItem day="02" month="APR" dayColor="#EB5757" title="Sprint-14 Delivery" subtitle="PRODUCT ENGINEERING · ALL HANDS" urgency="2 DAYS" urgencyType="hot" />
        <DeadlineItem day="07" month="APR" dayColor="#F59E0B" title="Q1 Performance Reviews" subtitle="HR DEADLINE · ALL REPORTS" urgency="7 DAYS" urgencyType="near" />
        <DeadlineItem day="15" month="APR" dayColor="#27AE60" title="API v3.0 Go-Live" subtitle="INFRA TEAM · RELEASE GATE" urgency="15 DAYS" urgencyType="ok" />
        <DeadlineItem day="22" month="APR" dayColor="#27AE60" title="Budget Proposal — Q2" subtitle="FINANCE · MANAGER SUBMISSION" urgency="22 DAYS" urgencyType="ok" />
      </div>
    </Card>
  );
}

function DeadlineItem({ day, month, dayColor, title, subtitle, urgency, urgencyType }: any) {
  const urgencyStyles = {
    hot: 'bg-[#FEE2E2] text-[#EB5757]',
    near: 'bg-[#FEF3C7] text-[#F59E0B]',
    ok: 'bg-[#ECFDF5] text-[#27AE60]',
  };

  return (
    <div className="flex items-center gap-3.5 p-3 rounded-[12px] hover:bg-[#F9FAFB] transition-all cursor-pointer border border-transparent hover:border-[#E5E7EB]">
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

// 1:1 Meeting Tracker Card
function MeetingTrackerCard() {
  return (
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
      <div className="grid grid-cols-4 gap-3">
        <MeetingItem name="Rahul K." time="TODAY · 2:00 PM" initials="RK" color="#2F80ED" status="SCHEDULED" statusType="scheduled" />
        <MeetingItem name="Priya S." time="APR 2 · 10:00 AM" initials="PS" color="#2F80ED" status="SCHEDULED" statusType="scheduled" />
        <MeetingItem name="Dev K." time="No meeting in 3 weeks" initials="DK" color="#F59E0B" status="OVERDUE" statusType="pending" />
        <MeetingItem name="Meena V." time="Mar 25 — DONE" initials="MV" color="#27AE60" status="DONE" statusType="done" />
      </div>
    </Card>
  );
}

function MeetingItem({ name, time, initials, color, status, statusType }: any) {
  const statusStyles = {
    scheduled: 'bg-[#EFF6FF] text-[#2F80ED]',
    pending: 'bg-[#FEF3C7] text-[#F59E0B]',
    done: 'bg-[#ECFDF5] text-[#27AE60]',
  };

  return (
    <div className="flex flex-col gap-2 p-3 rounded-[12px] hover:bg-[#F9FAFB] transition-all cursor-pointer border border-transparent hover:border-[#E5E7EB]">
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-[700]" style={{
        background: `${color}15`,
        color: color,
      }}>
        {initials}
      </div>
      <div className="flex-1">
        <div className="text-[13px] font-[600] text-[#111827]">{name}</div>
        <div className="text-[10px] text-[#4B5563] mt-0.5 font-[500]">{time}</div>
      </div>
      <div className={`text-[10px] px-2 py-1 rounded-full font-[700] tracking-[0.06em] text-center ${statusStyles[statusType as keyof typeof statusStyles]}`}>
        {status}
      </div>
    </div>
  );
}

// Weekly Performance Card
function WeeklyPerformanceCard() {
  return (
    <Card title="Weekly Performance Trend" icon={TrendingUp} action="Report">
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

// Skill Gaps Card
function SkillGapsCard() {
  return (
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

// Reports Card
function ReportsCard() {
  return (
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