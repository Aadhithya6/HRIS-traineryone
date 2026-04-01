import { useState } from 'react';
import { BookOpen, TrendingUp, CheckCircle2, Clock, AlertCircle, Plus } from 'lucide-react';

interface SkillGap {
  name: string;
  role: string;
  avatar: string;
  gaps: Array<{ skill: string; current: number; required: number; priority: 'critical' | 'high' | 'medium' }>;
}

const skillGaps: SkillGap[] = [
  {
    name: 'Dev Kumar', role: 'QA Engineer', avatar: '#ef4444',
    gaps: [
      { skill: 'Automated Testing (Playwright)', current: 30, required: 80, priority: 'critical' },
      { skill: 'CI/CD Pipeline Knowledge',       current: 45, required: 70, priority: 'high'     },
      { skill: 'Performance Testing',             current: 40, required: 65, priority: 'medium'   },
    ],
  },
  {
    name: 'Vijay Lobo', role: 'Backend Dev', avatar: '#9CA3AF',
    gaps: [
      { skill: 'System Design',          current: 55, required: 80, priority: 'critical' },
      { skill: 'Microservices Patterns', current: 50, required: 75, priority: 'high'     },
      { skill: 'GraphQL',                current: 25, required: 60, priority: 'medium'   },
    ],
  },
  {
    name: 'Nisha Patel', role: 'UX Designer', avatar: '#10b981',
    gaps: [
      { skill: 'Design Systems',   current: 60, required: 85, priority: 'high'   },
      { skill: 'User Research',    current: 65, required: 80, priority: 'medium' },
    ],
  },
  {
    name: 'Tina Fernandez', role: 'Biz Analyst', avatar: '#F59E0B',
    gaps: [
      { skill: 'SQL & Data Analysis', current: 40, required: 75, priority: 'high'   },
      { skill: 'Stakeholder Mgmt',    current: 70, required: 85, priority: 'medium' },
    ],
  },
];

interface TrainingPlan {
  id: number;
  title: string;
  assignee: string;
  skill: string;
  type: 'Course' | 'Workshop' | 'Mentorship' | 'Book';
  duration: string;
  status: 'not_started' | 'in_progress' | 'completed';
  dueDate: string;
  progress: number;
}

const trainingPlans: TrainingPlan[] = [
  { id: 1, title: 'Playwright Test Automation Masterclass', assignee: 'Dev K.',   skill: 'Automated Testing', type: 'Course',     duration: '20 hrs', status: 'in_progress', dueDate: 'Apr 30', progress: 45 },
  { id: 2, title: 'System Design Interview Prep',           assignee: 'Vijay L.', skill: 'System Design',     type: 'Course',     duration: '15 hrs', status: 'in_progress', dueDate: 'Apr 20', progress: 30 },
  { id: 3, title: 'Figma Advanced Design Systems',          assignee: 'Nisha P.', skill: 'Design Systems',    type: 'Workshop',   duration: '8 hrs',  status: 'not_started', dueDate: 'May 10', progress: 0  },
  { id: 4, title: 'SQL for Business Analytics',             assignee: 'Tina F.',  skill: 'SQL & Data Analysis', type: 'Course',   duration: '12 hrs', status: 'not_started', dueDate: 'May 5',  progress: 0  },
  { id: 5, title: '1:1 Mentorship — Microservices',         assignee: 'Vijay L.', skill: 'Microservices',     type: 'Mentorship', duration: '4 sessions', status: 'in_progress', dueDate: 'Apr 25', progress: 50 },
  { id: 6, title: 'Designing Data-Intensive Applications',  assignee: 'Vijay L.', skill: 'System Design',     type: 'Book',       duration: 'Self-paced', status: 'completed', dueDate: 'Mar 31', progress: 100 },
];

const priorityCfg = {
  critical: { bg: '#FEE2E2', color: '#ef4444' },
  high:     { bg: '#FEF3C7', color: '#F59E0B' },
  medium:   { bg: '#EFF6FF', color: '#2F80ED' },
};

const statusCfg: Record<string, { label: string; bg: string; color: string }> = {
  not_started:  { label: 'Not Started', bg: '#F3F4F6', color: '#6B7280' },
  in_progress:  { label: 'In Progress', bg: '#EFF6FF', color: '#2F80ED' },
  completed:    { label: 'Completed',   bg: '#ECFDF5', color: '#10b981' },
};

const typeColors: Record<string, string> = {
  Course: '#2F80ED', Workshop: '#a855f7', Mentorship: '#10b981', Book: '#F59E0B',
};

export default function ManagerTrainingPage() {
  const [tab, setTab] = useState<'gaps' | 'plans'>('gaps');
  const [plans, setPlans] = useState<TrainingPlan[]>(trainingPlans);

  function markDone(id: number) {
    setPlans((prev) => prev.map((p) => p.id === id ? { ...p, status: 'completed', progress: 100 } : p));
  }

  const totalGaps = skillGaps.reduce((s, sg) => s + sg.gaps.length, 0);
  const criticalGaps = skillGaps.reduce((s, sg) => s + sg.gaps.filter((g) => g.priority === 'critical').length, 0);
  const inProgress = plans.filter((p) => p.status === 'in_progress').length;
  const completed = plans.filter((p) => p.status === 'completed').length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-[800] text-[#111827]">Skill Gap & Training</h1>
          <p className="text-[13px] text-[#6B7280] mt-1">Identify skill gaps and track training progress across your team</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-white text-[13px] font-[600]"
          style={{ background: '#2F80ED', boxShadow: '0 4px 14px rgba(47,128,237,0.3)' }}>
          <Plus size={16} /> Assign Training
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Skill Gaps Identified', value: totalGaps,    color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)'  },
          { label: 'Critical Gaps',         value: criticalGaps, color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)'   },
          { label: 'Training In Progress',  value: inProgress,   color: '#2F80ED', bg: 'rgba(47,128,237,0.08)',  border: 'rgba(47,128,237,0.2)'  },
          { label: 'Completed',             value: completed,    color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className="rounded-[14px] p-5 border-[1.5px]" style={{ background: bg, borderColor: border }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2">
        {(['gaps', 'plans'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="px-5 py-2 rounded-[10px] text-[13px] font-[600] border transition-all"
            style={{ background: tab === t ? '#111827' : 'white', color: tab === t ? 'white' : '#6B7280', borderColor: tab === t ? '#111827' : '#E5E7EB' }}>
            {t === 'gaps' ? 'Skill Gap Analysis' : 'Training Plans'}
          </button>
        ))}
      </div>

      {tab === 'gaps' && (
        <div className="flex flex-col gap-4">
          {skillGaps.map((sg, i) => (
            <div key={i} className="bg-white rounded-[16px] border border-[#E5E7EB] p-5"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-[700]"
                  style={{ background: sg.avatar }}>
                  {sg.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <div className="text-[14px] font-[700] text-[#111827]">{sg.name}</div>
                  <div className="text-[12px] text-[#6B7280]">{sg.role}</div>
                </div>
                <span className="ml-auto text-[11px] font-[700] px-2.5 py-1 rounded-[8px] bg-[#FEE2E2] text-[#ef4444]">
                  {sg.gaps.filter((g) => g.priority === 'critical').length} Critical Gap{sg.gaps.filter((g) => g.priority === 'critical').length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {sg.gaps.map((gap, j) => {
                  const pc = priorityCfg[gap.priority];
                  const gapSize = gap.required - gap.current;
                  return (
                    <div key={j}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-[600] text-[#374151]">{gap.skill}</span>
                          <span className="px-1.5 py-0.5 rounded-[5px] text-[9px] font-[700]"
                            style={{ background: pc.bg, color: pc.color }}>
                            {gap.priority.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#9CA3AF]">{gap.current}% → {gap.required}% ({gapSize > 0 ? '+' : ''}{gapSize}% needed)</span>
                      </div>
                      <div className="relative h-2 rounded-full bg-[#F3F4F6]">
                        <div className="h-full rounded-full bg-[#9CA3AF]" style={{ width: `${gap.required}%`, opacity: 0.2 }} />
                        <div className="absolute top-0 left-0 h-full rounded-full" style={{ width: `${gap.current}%`, background: pc.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'plans' && (
        <div className="flex flex-col gap-3">
          {plans.map((plan) => {
            const sc = statusCfg[plan.status];
            const tc = typeColors[plan.type] || '#9CA3AF';
            return (
              <div key={plan.id} className="bg-white rounded-[14px] border border-[#E5E7EB] p-4"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                    style={{ background: tc + '18', color: tc }}>
                    <BookOpen size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[13px] font-[700] text-[#111827]">{plan.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-[#9CA3AF] mb-2">
                      <span style={{ color: tc, fontWeight: 700 }}>{plan.type}</span>
                      <span>{plan.assignee}</span>
                      <span>{plan.duration}</span>
                      <span className="flex items-center gap-0.5"><Clock size={10} /> {plan.dueDate}</span>
                    </div>
                    {plan.status !== 'not_started' && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-[#F3F4F6]">
                          <div className="h-full rounded-full transition-all" style={{ width: `${plan.progress}%`, background: tc }} />
                        </div>
                        <span className="text-[11px] font-[700]" style={{ color: tc }}>{plan.progress}%</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="px-2.5 py-1 rounded-[8px] text-[10px] font-[700]"
                      style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                    {plan.status !== 'completed' && (
                      <button onClick={() => markDone(plan.id)}
                        className="px-3 py-1.5 rounded-[8px] text-[11px] font-[600] text-white"
                        style={{ background: '#10b981' }}>
                        Complete
                      </button>
                    )}
                    {plan.status === 'completed' && (
                      <CheckCircle2 size={18} className="text-[#10b981]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
