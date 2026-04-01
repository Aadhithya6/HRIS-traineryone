import { useState } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

type DeadlineStatus = 'upcoming' | 'due_today' | 'overdue' | 'completed';

interface Deadline {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: DeadlineStatus;
  owner: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

const deadlines: Deadline[] = [
  { id: 1,  title: 'Q1 Performance Reviews submission',  description: 'All manager reviews to be submitted to HR before COB.',               dueDate: 'Apr 1, 2026',  status: 'due_today',  owner: 'Self',      category: 'HR',        priority: 'high'   },
  { id: 2,  title: 'Sprint 12 Demo to stakeholders',     description: 'Prepare and present sprint achievements to product leadership.',       dueDate: 'Apr 2, 2026',  status: 'upcoming',  owner: 'Meena V.',  category: 'Delivery',  priority: 'high'   },
  { id: 3,  title: 'Architecture review sign-off',       description: 'Final review of microservices migration plan needs manager approval.',  dueDate: 'Apr 3, 2026',  status: 'upcoming',  owner: 'Rahul K.',  category: 'Technical', priority: 'high'   },
  { id: 4,  title: 'Budget reforecast submission',       description: 'Q2 budget revisions to be submitted to finance.',                      dueDate: 'Apr 4, 2026',  status: 'upcoming',  owner: 'Self',      category: 'Finance',   priority: 'medium' },
  { id: 5,  title: 'Onboarding completion for 2 new hires', description: 'Ensure 30-day plan is on track for Raj and Tina.',                  dueDate: 'Apr 7, 2026',  status: 'upcoming',  owner: 'Anjali D.', category: 'HR',        priority: 'medium' },
  { id: 6,  title: 'Security patch deployment',         description: 'Apply patches to all staging and production servers.',                  dueDate: 'Apr 8, 2026',  status: 'upcoming',  owner: 'Karan B.',  category: 'Technical', priority: 'high'   },
  { id: 7,  title: 'Client quarterly business review',  description: 'Prepare slides and metrics for enterprise client QBR.',                 dueDate: 'Apr 10, 2026', status: 'upcoming',  owner: 'Tina F.',   category: 'Client',    priority: 'high'   },
  { id: 8,  title: 'Team skill assessment completion',  description: 'Collect individual self-assessments for Q2 training plan.',             dueDate: 'Apr 12, 2026', status: 'upcoming',  owner: 'Self',      category: 'Training',  priority: 'medium' },
  { id: 9,  title: 'March expenses reconciliation',     description: 'Submit team expense reports before finance cut-off.',                   dueDate: 'Mar 30, 2026', status: 'overdue',   owner: 'Self',      category: 'Finance',   priority: 'medium' },
  { id: 10, title: 'Vendor contract renewal',           description: 'SaaS vendor contract expires. Renew or switch.',                       dueDate: 'Mar 28, 2026', status: 'overdue',   owner: 'Self',      category: 'Finance',   priority: 'low'    },
  { id: 11, title: 'Q4 retrospective document',         description: 'Finalize and share Q4 retrospective summary.',                         dueDate: 'Mar 20, 2026', status: 'completed', owner: 'Self',      category: 'Delivery',  priority: 'low'    },
];

const statusCfg: Record<DeadlineStatus, { label: string; bg: string; color: string; border: string }> = {
  due_today: { label: 'Due Today', bg: '#FEF3C7', color: '#F59E0B', border: '#FDE68A' },
  overdue:   { label: 'Overdue',   bg: '#FEE2E2', color: '#ef4444', border: '#FCA5A5' },
  upcoming:  { label: 'Upcoming',  bg: '#EFF6FF', color: '#2F80ED', border: '#BFDBFE' },
  completed: { label: 'Completed', bg: '#ECFDF5', color: '#10b981', border: '#A7F3D0' },
};

const catColors: Record<string, string> = {
  HR: '#a855f7', Delivery: '#2F80ED', Technical: '#38bdf8', Finance: '#10b981', Client: '#F59E0B', Training: '#ef4444',
};

export default function ManagerDeadlinesPage() {
  const [filter, setFilter] = useState<'all' | DeadlineStatus>('all');
  const [items, setItems]   = useState<Deadline[]>(deadlines);

  function complete(id: number) {
    setItems((prev) => prev.map((d) => d.id === id ? { ...d, status: 'completed' } : d));
  }

  const counts = {
    all:       items.length,
    due_today: items.filter((d) => d.status === 'due_today').length,
    overdue:   items.filter((d) => d.status === 'overdue').length,
    upcoming:  items.filter((d) => d.status === 'upcoming').length,
    completed: items.filter((d) => d.status === 'completed').length,
  };

  const filtered = filter === 'all' ? items : items.filter((d) => d.status === filter);

  // Group by week for upcoming
  const sorted = [...filtered].sort((a, b) => {
    const order: Record<DeadlineStatus, number> = { overdue: 0, due_today: 1, upcoming: 2, completed: 3 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-[800] text-[#111827]">Deadlines</h1>
          <p className="text-[13px] text-[#6B7280] mt-1">Track upcoming work milestones and time-sensitive tasks</p>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-[#6B7280]">
          <Calendar size={16} />
          <span className="font-[600]">April 2026</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {([
          { key: 'overdue',   label: 'Overdue',   },
          { key: 'due_today', label: 'Due Today',  },
          { key: 'upcoming',  label: 'Upcoming',   },
          { key: 'completed', label: 'Completed',  },
        ] as const).map(({ key, label }) => {
          const cfg = statusCfg[key];
          return (
            <div key={key}
              onClick={() => setFilter(key)}
              className="rounded-[14px] p-5 border-[1.5px] cursor-pointer transition-all"
              style={{ background: cfg.bg, borderColor: filter === key ? cfg.color : cfg.border }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: cfg.color, lineHeight: 1 }}>{counts[key]}</div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', fontWeight: 600 }}>{label}</div>
            </div>
          );
        })}
      </div>

      {/* Overdue alert */}
      {counts.overdue > 0 && (
        <div className="flex items-center gap-3 rounded-[12px] bg-[#FEF2F2] border border-[#FCA5A5] px-4 py-3">
          <AlertCircle size={16} className="text-[#ef4444] flex-shrink-0" />
          <div className="text-[13px] font-[600] text-[#ef4444]">
            {counts.overdue} item{counts.overdue !== 1 ? 's' : ''} overdue — take action now to avoid compounding delays.
          </div>
          <button onClick={() => setFilter('overdue')}
            className="ml-auto text-[12px] font-[600] text-[#ef4444] border border-[#FCA5A5] px-3 py-1 rounded-[7px] hover:bg-[#FEE2E2] transition-all">
            View
          </button>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'overdue', 'due_today', 'upcoming', 'completed'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-[8px] text-[12px] font-[600] border transition-all"
            style={{ background: filter === f ? '#111827' : 'white', color: filter === f ? 'white' : '#6B7280', borderColor: filter === f ? '#111827' : '#E5E7EB' }}>
            {f === 'all' ? 'All' : f === 'due_today' ? 'Due Today' : f.charAt(0).toUpperCase() + f.slice(1)}
            {' '}({counts[f] ?? items.filter((d) => d.status === f).length})
          </button>
        ))}
      </div>

      {/* Deadline list */}
      <div className="flex flex-col gap-3">
        {sorted.map((d) => {
          const sc = statusCfg[d.status];
          const catColor = catColors[d.category] || '#9CA3AF';
          return (
            <div key={d.id}
              className="bg-white rounded-[14px] border border-[#E5E7EB] p-4 flex items-start gap-4 hover:shadow-md transition-all"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)', borderLeftWidth: '3px', borderLeftColor: sc.color }}>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-[700]"
                    style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-[600]"
                    style={{ background: catColor + '18', color: catColor }}>{d.category}</span>
                  {d.priority === 'high' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-[700] bg-[#FEE2E2] text-[#ef4444]">High Priority</span>
                  )}
                </div>
                <div className="text-[14px] font-[700] text-[#111827] mb-0.5">{d.title}</div>
                <div className="text-[12px] text-[#6B7280] mb-2">{d.description}</div>
                <div className="flex items-center gap-4 text-[11px] text-[#9CA3AF]">
                  <span className="flex items-center gap-1"><Clock size={11} /> {d.dueDate}</span>
                  <span>Owner: {d.owner}</span>
                </div>
              </div>

              {d.status !== 'completed' && (
                <button onClick={() => complete(d.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[11px] font-[600] text-white flex-shrink-0"
                  style={{ background: '#10b981' }}>
                  <CheckCircle2 size={12} /> Done
                </button>
              )}
              {d.status === 'completed' && (
                <CheckCircle2 size={20} className="text-[#10b981] flex-shrink-0 mt-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
