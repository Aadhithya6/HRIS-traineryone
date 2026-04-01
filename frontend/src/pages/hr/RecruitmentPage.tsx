import { useState } from 'react';
import { MapPin, Plus, Users, ChevronDown, ChevronUp, X, CheckCircle2, Clock } from 'lucide-react';

const positions = [
  {
    id: 1, title: 'Senior Frontend Developer', dept: 'Engineering', status: 'Urgent',   progress: 70,
    candidates: [
      { name: 'Aisha Rahman',    stage: 'Interview', score: 88, applied: 'Mar 10', note: 'Strong React skills' },
      { name: 'Carlos M.',       stage: 'Offer',     score: 92, applied: 'Mar 05', note: 'Final round passed' },
      { name: 'Jake Thornton',   stage: 'Screening', score: 72, applied: 'Mar 20', note: 'Good portfolio'      },
      { name: 'Priya Nair',      stage: 'Interview', score: 81, applied: 'Mar 15', note: 'Technical round 2'   },
    ],
  },
  {
    id: 2, title: 'Product Manager', dept: 'Product', status: 'Active', progress: 45,
    candidates: [
      { name: 'Lena Schultz',    stage: 'Screening', score: 78, applied: 'Mar 18', note: 'PM background'       },
      { name: 'Omar Hassan',     stage: 'Interview', score: 84, applied: 'Mar 12', note: 'Ex-Google PM'         },
      { name: 'Sofia Tan',       stage: 'Applied',   score: 65, applied: 'Mar 25', note: 'Awaiting review'      },
    ],
  },
  {
    id: 3, title: 'UX Designer', dept: 'Design', status: 'Active', progress: 85,
    candidates: [
      { name: 'Kenji Mori',      stage: 'Offer',     score: 95, applied: 'Feb 28', note: 'Offer sent Apr 1'    },
      { name: 'Maya Patel',      stage: 'Hired',     score: 91, applied: 'Feb 20', note: 'Starting May 1'      },
      { name: 'Rita Okonkwo',    stage: 'Interview', score: 79, applied: 'Mar 08', note: 'Final round'          },
    ],
  },
  {
    id: 4, title: 'Data Analyst', dept: 'Analytics', status: 'On Hold', progress: 20,
    candidates: [
      { name: 'Alan Brooks',     stage: 'Applied',   score: 60, applied: 'Mar 22', note: 'On hold — budget'    },
      { name: 'Nina Vasquez',    stage: 'Applied',   score: 64, applied: 'Mar 24', note: 'Pending approval'     },
    ],
  },
  {
    id: 5, title: 'DevOps Engineer', dept: 'Infrastructure', status: 'Active', progress: 55,
    candidates: [
      { name: 'Drew Hoffman',    stage: 'Interview', score: 83, applied: 'Mar 14', note: 'AWS certified'        },
      { name: 'Yuki Tanaka',     stage: 'Screening', score: 75, applied: 'Mar 19', note: 'K8s experience'       },
      { name: 'Lucas Ferreira',  stage: 'Applied',   score: 68, applied: 'Mar 26', note: 'Reviewed'             },
    ],
  },
];

const stageColors: Record<string, { bg: string; color: string }> = {
  Applied:   { bg: '#F3F4F6', color: '#6B7280' },
  Screening: { bg: '#EFF6FF', color: '#2F80ED' },
  Interview: { bg: '#FEF3C7', color: '#F59E0B' },
  Offer:     { bg: '#ECFDF5', color: '#10b981' },
  Hired:     { bg: '#D1FAE5', color: '#059669' },
};

const statusColors: Record<string, { bg: string; color: string }> = {
  Urgent:  { bg: '#FEE2E2', color: '#ef4444' },
  Active:  { bg: '#EFF6FF', color: '#2F80ED' },
  'On Hold': { bg: '#F3F4F6', color: '#6B7280' },
};

const pipelineStages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];

export default function RecruitmentPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const allCandidates = positions.flatMap((p) => p.candidates);
  const stageCounts   = pipelineStages.map((s) => ({ stage: s, count: allCandidates.filter((c) => c.stage === s).length }));

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--hris-text)' }}>Recruitment</h1>
          <p style={{ fontSize: '13px', color: 'var(--hris-muted)', marginTop: '4px' }}>Track open positions and candidates</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold"
          style={{ background: 'var(--hris-primary)', fontSize: '13px', boxShadow: '0 4px 14px rgba(47,128,237,0.3)' }}
        >
          <Plus className="w-4 h-4" />
          Post New Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Open Positions', value: positions.length,                                           color: 'var(--hris-primary)', bg: 'rgba(47,128,237,0.08)', border: 'rgba(47,128,237,0.15)' },
          { label: 'Total Candidates',value: allCandidates.length,                                      color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.15)' },
          { label: 'In Interview',    value: allCandidates.filter((c) => c.stage === 'Interview').length, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.15)' },
          { label: 'Hired This Month',value: allCandidates.filter((c) => c.stage === 'Hired').length,   color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.15)' },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className="rounded-[14px] p-5 border-[1.5px]" style={{ background: bg, borderColor: border }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '12px', color: 'var(--hris-muted)', marginTop: '4px', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline Stage Overview */}
      <div className="rounded-[18px] border-[1.5px] p-5 bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)', marginBottom: '16px' }}>Pipeline Overview</div>
        <div className="flex gap-3">
          {stageCounts.map(({ stage, count }) => {
            const s = stageColors[stage];
            const maxCount = Math.max(...stageCounts.map((s) => s.count), 1);
            return (
              <div key={stage} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center" style={{ height: '80px' }}>
                  <div
                    className="w-full rounded-t-[8px] transition-all"
                    style={{ height: `${Math.max((count / maxCount) * 100, 8)}%`, background: s.color, opacity: 0.85 }}
                  />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: s.color }}>{count}</div>
                <div style={{ fontSize: '11px', color: 'var(--hris-muted)', fontWeight: 600, textAlign: 'center' }}>{stage}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Positions */}
      <div className="rounded-[18px] border-[1.5px] overflow-hidden bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, var(--hris-primary), var(--hris-gradient-to))' }} />
        <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--hris-border)' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)' }}>Open Positions & Candidates</div>
        </div>

        {positions.map((pos) => {
          const sc = statusColors[pos.status] || statusColors.Active;
          const isOpen = expanded === pos.id;
          return (
            <div key={pos.id} className="border-b last:border-b-0" style={{ borderColor: 'var(--hris-border)' }}>
              {/* Position Row */}
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors"
                onClick={() => setExpanded(isOpen ? null : pos.id)}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hris-primary-light)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: 'rgba(47,128,237,0.1)', color: 'var(--hris-primary)' }}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)' }}>{pos.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--hris-muted)', marginTop: '2px' }}>{pos.dept} · {pos.candidates.length} candidates</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full" style={{ background: 'var(--hris-border)' }}>
                        <div className="h-full rounded-full" style={{ width: `${pos.progress}%`, background: pos.status === 'Urgent' ? '#ef4444' : pos.status === 'On Hold' ? '#9CA3AF' : 'var(--hris-primary)' }} />
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--hris-muted)' }}>{pos.progress}%</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-[8px]" style={{ background: sc.bg, color: sc.color, fontSize: '11px', fontWeight: 700 }}>{pos.status}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4" style={{ color: 'var(--hris-muted)' }} /> : <ChevronDown className="w-4 h-4" style={{ color: 'var(--hris-muted)' }} />}
                </div>
              </div>

              {/* Candidates Panel */}
              {isOpen && (
                <div className="px-5 pb-4 border-t" style={{ borderColor: 'var(--hris-border)', background: 'var(--hris-surface2)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--hris-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '12px 0 8px' }}>
                    Candidates
                  </div>
                  <div className="grid gap-2">
                    {pos.candidates.map((c, i) => {
                      const ss = stageColors[c.stage] || stageColors.Applied;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-3 rounded-[10px] bg-white border-[1.5px]"
                          style={{ borderColor: 'var(--hris-border)' }}
                        >
                          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--hris-primary)', color: '#fff', fontWeight: 700, fontSize: '11px' }}>
                            {c.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div className="flex-1">
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text)' }}>{c.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--hris-muted)' }}>Applied: {c.applied} · {c.note}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div style={{ fontSize: '14px', fontWeight: 800, color: c.score >= 85 ? '#10b981' : c.score >= 70 ? 'var(--hris-primary)' : '#F59E0B' }}>
                              {c.score}%
                            </div>
                            <span className="px-2.5 py-1 rounded-[8px]" style={{ background: ss.bg, color: ss.color, fontSize: '11px', fontWeight: 700 }}>{c.stage}</span>
                            <div className="flex gap-1">
                              <button className="w-7 h-7 rounded-lg flex items-center justify-center border-[1.5px] transition-all" style={{ borderColor: 'rgba(16,185,129,0.3)', color: '#10b981' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#10b981'; }}>
                                <CheckCircle2 className="w-3 h-3" />
                              </button>
                              <button className="w-7 h-7 rounded-lg flex items-center justify-center border-[1.5px] transition-all" style={{ borderColor: 'rgba(239,68,68,0.3)', color: '#ef4444' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ef4444'; }}>
                                <X className="w-3 h-3" />
                              </button>
                              <button className="w-7 h-7 rounded-lg flex items-center justify-center border-[1.5px] transition-all" style={{ borderColor: 'rgba(245,158,11,0.3)', color: '#F59E0B' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#F59E0B'; e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#F59E0B'; }}>
                                <Clock className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className="mt-3 w-full py-2 rounded-[10px] border-[1.5px] transition-all"
                    style={{ borderColor: 'var(--hris-primary)', color: 'var(--hris-primary)', fontSize: '12px', fontWeight: 600 }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hris-primary-light)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <Users className="w-3.5 h-3.5 inline mr-1.5" />
                    Add Candidate
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
