import { TrendingUp, TrendingDown, Star, Award, Users } from 'lucide-react';

const teamPerformance = [
  { name: 'Rahul Kumar',    role: 'Frontend Dev',    score: 92, trend: +5,  tasks: 28, onTime: 96, quality: 94, collab: 88, avatar: '#2F80ED', level: 'Top Performer'   },
  { name: 'Priya Sharma',   role: 'Backend Dev',     score: 88, trend: +3,  tasks: 24, onTime: 92, quality: 90, collab: 85, avatar: '#10b981', level: 'High Performer'  },
  { name: 'Meena Verma',    role: 'Product Manager', score: 85, trend: +2,  tasks: 31, onTime: 88, quality: 86, collab: 92, avatar: '#a855f7', level: 'High Performer'  },
  { name: 'Anjali Das',     role: 'Scrum Master',    score: 83, trend: +1,  tasks: 18, onTime: 89, quality: 82, collab: 95, avatar: '#38bdf8', level: 'Good'            },
  { name: 'Karan Bhatia',   role: 'DevOps',          score: 81, trend: -2,  tasks: 22, onTime: 85, quality: 85, collab: 79, avatar: '#F59E0B', level: 'Good'            },
  { name: 'Sita Rao',       role: 'Data Analyst',    score: 78, trend: +4,  tasks: 19, onTime: 82, quality: 80, collab: 83, avatar: '#2F80ED', level: 'Good'            },
  { name: 'Nisha Patel',    role: 'UX Designer',     score: 76, trend: +2,  tasks: 15, onTime: 80, quality: 79, collab: 86, avatar: '#10b981', level: 'Average'         },
  { name: 'Tina Fernandez', role: 'Biz Analyst',     score: 74, trend: -1,  tasks: 21, onTime: 78, quality: 76, collab: 82, avatar: '#F59E0B', level: 'Average'         },
  { name: 'Dev Kumar',      role: 'QA Engineer',     score: 70, trend: +6,  tasks: 16, onTime: 72, quality: 74, collab: 78, avatar: '#ef4444', level: 'Improving'       },
  { name: 'Vijay Lobo',     role: 'Backend Dev',     score: 62, trend: -4,  tasks: 12, onTime: 65, quality: 66, collab: 68, avatar: '#9CA3AF', level: 'Needs Attention' },
];

const weeklyTrend = [
  { week: 'W1', avg: 74 }, { week: 'W2', avg: 76 }, { week: 'W3', avg: 75 },
  { week: 'W4', avg: 79 }, { week: 'W5', avg: 78 }, { week: 'W6', avg: 81 },
];

const levelCfg: Record<string, { bg: string; color: string }> = {
  'Top Performer':   { bg: '#FEF9C3', color: '#CA8A04' },
  'High Performer':  { bg: '#ECFDF5', color: '#10b981' },
  'Good':            { bg: '#EFF6FF', color: '#2F80ED' },
  'Average':         { bg: '#F3F4F6', color: '#6B7280' },
  'Improving':       { bg: '#F0FDF4', color: '#16a34a' },
  'Needs Attention': { bg: '#FEE2E2', color: '#ef4444' },
};

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-[#F3F4F6]">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-[11px] font-[700] w-8 text-right" style={{ color }}>{value}</span>
    </div>
  );
}

export default function ManagerPerformancePage() {
  const avg = Math.round(teamPerformance.reduce((s, m) => s + m.score, 0) / teamPerformance.length);
  const top = teamPerformance.filter((m) => m.score >= 85).length;
  const atRisk = teamPerformance.filter((m) => m.score < 70).length;
  const maxWeek = Math.max(...weeklyTrend.map((w) => w.avg));
  const minWeek = Math.min(...weeklyTrend.map((w) => w.avg));

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-[800] text-[#111827]">Performance Monitoring</h1>
        <p className="text-[13px] text-[#6B7280] mt-1">Q1 2026 · Team performance overview and individual metrics</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Team Avg Score',    value: `${avg}%`,           color: '#2F80ED', bg: 'rgba(47,128,237,0.08)',  border: 'rgba(47,128,237,0.2)'  },
          { label: 'Top Performers',    value: top,                 color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)'  },
          { label: 'Needs Attention',   value: atRisk,              color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)'   },
          { label: 'QoQ Improvement',   value: '+4.2%',             color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className="rounded-[14px] p-5 border-[1.5px]" style={{ background: bg, borderColor: border }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-5">
        {/* Team table */}
        <div className="bg-white rounded-[18px] border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #2F80ED, #56CCF2)' }} />
          <div className="px-5 py-4 border-b border-[#E5E7EB]">
            <div className="text-[14px] font-[700] text-[#111827]">
              <Users size={15} className="inline mr-1.5 text-[#2F80ED]" />
              Individual Scores
            </div>
          </div>
          {teamPerformance.map((m, i) => {
            const lc = levelCfg[m.level] || levelCfg['Average'];
            return (
              <div key={i} className="flex items-center gap-4 px-5 py-3 border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F9FAFB] transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-[700] flex-shrink-0"
                  style={{ background: m.avatar }}>
                  {m.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div className="w-36 flex-shrink-0">
                  <div className="text-[13px] font-[600] text-[#111827]">{m.name}</div>
                  <div className="text-[11px] text-[#9CA3AF]">{m.role}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <ScoreBar value={m.score} color="#2F80ED" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div><div className="text-[9px] text-[#9CA3AF] mb-0.5">On-Time</div><ScoreBar value={m.onTime} color="#10b981" /></div>
                    <div><div className="text-[9px] text-[#9CA3AF] mb-0.5">Quality</div><ScoreBar value={m.quality} color="#a855f7" /></div>
                    <div><div className="text-[9px] text-[#9CA3AF] mb-0.5">Collab</div><ScoreBar value={m.collab} color="#F59E0B" /></div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-[700]" style={{ background: lc.bg, color: lc.color }}>{m.level}</span>
                  <div className="flex items-center gap-0.5 text-[11px] font-[700]"
                    style={{ color: m.trend > 0 ? '#10b981' : '#ef4444' }}>
                    {m.trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {m.trend > 0 ? '+' : ''}{m.trend}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trend chart + legend */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-[18px] border border-[#E5E7EB] p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="text-[14px] font-[700] text-[#111827] mb-1">
              <TrendingUp size={15} className="inline mr-1.5 text-[#10b981]" />
              Weekly Avg Trend
            </div>
            <div className="text-[12px] text-[#9CA3AF] mb-4">6-week rolling average</div>
            <div className="flex items-end gap-2" style={{ height: '100px' }}>
              {weeklyTrend.map(({ week, avg }) => {
                const h = ((avg - minWeek + 2) / (maxWeek - minWeek + 4)) * 100;
                return (
                  <div key={week} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-[10px] font-[700] text-[#2F80ED]">{avg}</div>
                    <div className="w-full rounded-t-[4px]" style={{ height: `${h}%`, background: '#2F80ED', opacity: 0.8 }} />
                    <div className="text-[9px] text-[#9CA3AF] font-[600]">{week}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-[18px] border border-[#E5E7EB] p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="text-[13px] font-[700] text-[#111827] mb-3">
              <Award size={15} className="inline mr-1.5 text-[#F59E0B]" />
              Performance Distribution
            </div>
            {Object.entries(levelCfg).map(([level, cfg]) => {
              const count = teamPerformance.filter((m) => m.level === level).length;
              if (count === 0) return null;
              return (
                <div key={level} className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-[700]"
                    style={{ background: cfg.bg, color: cfg.color }}>{level}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 rounded-full" style={{ width: `${count * 16}px`, background: cfg.color }} />
                    <span className="text-[12px] font-[700]" style={{ color: cfg.color }}>{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
