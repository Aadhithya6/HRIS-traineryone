import { useState, useEffect } from 'react';
import { BarChart3, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';

type WorkloadTag = 'OVERLOADED' | 'HIGH' | 'OPTIMAL' | 'IDLE';

interface TeamMember {
  name: string;
  role: string;
  percentage: number;
  activeTasks: number;
  avatar: string;
}

const initialTeam: TeamMember[] = [
  { name: 'Rahul K.',   role: 'Frontend Dev',    percentage: 95, activeTasks: 8, avatar: '#2F80ED' },
  { name: 'Karan B.',   role: 'DevOps',          percentage: 85, activeTasks: 7, avatar: '#F59E0B' },
  { name: 'Priya S.',   role: 'Backend Dev',     percentage: 75, activeTasks: 6, avatar: '#10b981' },
  { name: 'Meena V.',   role: 'Product Manager', percentage: 70, activeTasks: 9, avatar: '#a855f7' },
  { name: 'Anjali D.',  role: 'Scrum Master',    percentage: 65, activeTasks: 5, avatar: '#38bdf8' },
  { name: 'Sita R.',    role: 'Data Analyst',    percentage: 60, activeTasks: 4, avatar: '#2F80ED' },
  { name: 'Nisha P.',   role: 'UX Designer',     percentage: 40, activeTasks: 3, avatar: '#10b981' },
  { name: 'Tina F.',    role: 'Biz Analyst',     percentage: 35, activeTasks: 2, avatar: '#F59E0B' },
  { name: 'Dev K.',     role: 'QA Engineer',     percentage: 25, activeTasks: 2, avatar: '#ef4444' },
  { name: 'Vijay L.',   role: 'Backend Dev',     percentage: 15, activeTasks: 1, avatar: '#9CA3AF' },
];

function getTag(pct: number): WorkloadTag {
  if (pct >= 90) return 'OVERLOADED';
  if (pct >= 75) return 'HIGH';
  if (pct >= 50) return 'OPTIMAL';
  return 'IDLE';
}

const tagStyles: Record<WorkloadTag, { bg: string; color: string; bar: string }> = {
  OVERLOADED: { bg: '#FEE2E2', color: '#ef4444', bar: '#ef4444' },
  HIGH:       { bg: '#FEF3C7', color: '#F59E0B', bar: '#F59E0B' },
  OPTIMAL:    { bg: '#ECFDF5', color: '#10b981', bar: '#10b981' },
  IDLE:       { bg: '#F3F4F6', color: '#9CA3AF', bar: '#9CA3AF' },
};

interface Reassignment {
  from: string;
  to: string;
  task: string;
}

const suggestions: Reassignment[] = [
  { from: 'Rahul K.', to: 'Dev K.',   task: 'Unit test coverage improvement' },
  { from: 'Rahul K.', to: 'Vijay L.', task: 'API documentation update'        },
  { from: 'Karan B.', to: 'Tina F.',  task: 'Vendor onboarding checklist'     },
];

export default function ManagerWorkloadPage() {
  const [team, setTeam]               = useState(initialTeam);
  const [bars, setBars]               = useState<Record<string, number>>({});
  const [applied, setApplied]         = useState<number[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const b: Record<string, number> = {};
      initialTeam.forEach((m) => { b[m.name] = m.percentage; });
      setBars(b);
    }, 300);
  }, []);

  function applyReassignment(idx: number, s: Reassignment) {
    setApplied((prev) => [...prev, idx]);
    setTeam((prev) => prev.map((m) => {
      if (m.name === s.from) return { ...m, percentage: Math.max(m.percentage - 12, 10), activeTasks: Math.max(m.activeTasks - 1, 0) };
      if (m.name === s.to)   return { ...m, percentage: Math.min(m.percentage + 12, 100), activeTasks: m.activeTasks + 1 };
      return m;
    }));
    setTimeout(() => {
      const b: Record<string, number> = {};
      setTeam((prev) => { prev.forEach((m) => { b[m.name] = m.percentage; }); return prev; });
      setBars(b);
    }, 50);
  }

  const overloaded = team.filter((m) => getTag(m.percentage) === 'OVERLOADED').length;
  const idle       = team.filter((m) => getTag(m.percentage) === 'IDLE').length;
  const optimal    = team.filter((m) => getTag(m.percentage) === 'OPTIMAL').length;
  const avg        = Math.round(team.reduce((s, m) => s + m.percentage, 0) / team.length);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-[800] text-[#111827]">Workload Management</h1>
        <p className="text-[13px] text-[#6B7280] mt-1">Balance task distribution across your team</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Overloaded',    value: overloaded, color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)'  },
          { label: 'High Load',     value: team.filter((m) => getTag(m.percentage) === 'HIGH').length, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
          { label: 'Optimal',       value: optimal,    color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
          { label: 'Avg Workload',  value: `${avg}%`,  color: '#2F80ED', bg: 'rgba(47,128,237,0.08)', border: 'rgba(47,128,237,0.2)' },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className="rounded-[14px] p-5 border-[1.5px]" style={{ background: bg, borderColor: border }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1.5fr_1fr] gap-5">
        {/* Workload bars */}
        <div className="bg-white rounded-[18px] border border-[#E5E7EB] p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div className="text-[14px] font-[700] text-[#111827] mb-4">
            <BarChart3 size={16} className="inline mr-1.5 text-[#2F80ED]" />
            Team Workload Distribution
          </div>
          <div className="flex flex-col gap-3.5">
            {team.map((m) => {
              const tag = getTag(m.percentage);
              const ts  = tagStyles[tag];
              return (
                <div key={m.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-[700]"
                        style={{ background: m.avatar }}>
                        {m.name.replace('.', '').split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-[13px] font-[600] text-[#111827]">{m.name}</span>
                      <span className="text-[11px] text-[#9CA3AF]">{m.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-[700]" style={{ color: ts.bar }}>{m.percentage}%</span>
                      <span className="text-[10px] font-[700] px-2 py-0.5 rounded-[5px]" style={{ background: ts.bg, color: ts.color }}>
                        {tag}
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#F3F4F6] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-[700ms]"
                      style={{ width: `${bars[m.name] ?? 0}%`, background: ts.bar }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI suggestions */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-[18px] border border-[#E5E7EB] p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center gap-2 text-[14px] font-[700] text-[#111827] mb-3">
              <Lightbulb size={16} className="text-[#F59E0B]" />
              Suggested Reassignments
            </div>
            <div className="flex flex-col gap-3">
              {suggestions.map((s, idx) => (
                <div key={idx} className="rounded-[12px] border border-[#E5E7EB] p-3"
                  style={{ background: applied.includes(idx) ? '#F0FDF4' : '#FFFBEB', borderColor: applied.includes(idx) ? '#A7F3D0' : '#FDE68A' }}>
                  <div className="text-[12px] font-[600] text-[#374151] mb-1.5">{s.task}</div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-[#ef4444] font-[600]">{s.from}</span>
                    <ArrowRight size={12} className="text-[#9CA3AF]" />
                    <span className="text-[#10b981] font-[600]">{s.to}</span>
                  </div>
                  {!applied.includes(idx) ? (
                    <button onClick={() => applyReassignment(idx, s)}
                      className="mt-2 w-full py-1.5 rounded-[8px] text-[11px] font-[600] border border-[#F59E0B] text-[#F59E0B] hover:bg-[#FEF3C7] transition-all">
                      Apply Reassignment
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#10b981] font-[600]">
                      <CheckCircle2 size={13} /> Applied
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[18px] border border-[#E5E7EB] p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="text-[13px] font-[700] text-[#111827] mb-3">By Load Level</div>
            {(['OVERLOADED', 'HIGH', 'OPTIMAL', 'IDLE'] as WorkloadTag[]).map((tag) => {
              const ts = tagStyles[tag];
              const count = team.filter((m) => getTag(m.percentage) === tag).length;
              return (
                <div key={tag} className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: ts.bar }} />
                    <span className="text-[12px] text-[#374151]">{tag}</span>
                  </div>
                  <span className="text-[13px] font-[700]" style={{ color: ts.color }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
