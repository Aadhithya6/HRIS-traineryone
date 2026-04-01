import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock, User, ArrowUpRight, MessageSquare } from 'lucide-react';

type EscLevel = 'critical' | 'high' | 'medium';
type EscStatus = 'open' | 'in_progress' | 'resolved';

interface Escalation {
  id: number;
  title: string;
  description: string;
  level: EscLevel;
  status: EscStatus;
  raisedBy: string;
  assignedTo: string;
  raisedAt: string;
  dueBy: string;
  category: string;
  notes?: string;
}

const escalations: Escalation[] = [
  { id: 1, title: 'Production outage affecting checkout flow', description: 'Payments failing for 15% of users on checkout. Revenue impact ~₹2.1L/hr.', level: 'critical', status: 'in_progress', raisedBy: 'Karan B.', assignedTo: 'Rahul K.', raisedAt: '2 hrs ago', dueBy: 'ASAP', category: 'Technical', notes: 'Root cause identified: DB connection pool exhaustion' },
  { id: 2, title: 'Client complaint: SLA breach on support tickets', description: 'Enterprise client reporting 3-day average response time, SLA is 4 hours.', level: 'critical', status: 'open', raisedBy: 'Tina F.', assignedTo: 'Anjali D.', raisedAt: '4 hrs ago', dueBy: 'Today', category: 'Client', notes: undefined },
  { id: 3, title: 'Team conflict affecting sprint delivery', description: 'Interpersonal conflict between two senior devs causing merge delays.', level: 'high', status: 'in_progress', raisedBy: 'Meena V.', assignedTo: 'Self', raisedAt: 'Yesterday', dueBy: 'Apr 3', category: 'HR', notes: '1:1 scheduled with both parties' },
  { id: 4, title: 'Security vulnerability in auth module', description: 'Penetration test found JWT token not expiring properly.', level: 'high', status: 'open', raisedBy: 'Priya S.', assignedTo: 'Dev K.', raisedAt: 'Yesterday', dueBy: 'Apr 4', category: 'Security', notes: undefined },
  { id: 5, title: 'Delayed delivery risk for Q2 milestone', description: 'Current velocity puts sprint 13 completion at risk by 8 days.', level: 'medium', status: 'open', raisedBy: 'Meena V.', assignedTo: 'Self', raisedAt: '2 days ago', dueBy: 'Apr 5', category: 'Delivery', notes: undefined },
  { id: 6, title: 'Budget overrun on cloud infrastructure', description: 'AWS costs exceeded monthly budget by 24%. Needs immediate review.', level: 'medium', status: 'resolved', raisedBy: 'Sita R.', assignedTo: 'Karan B.', raisedAt: '3 days ago', dueBy: 'Apr 2', category: 'Finance', notes: 'Cost optimizations applied. Auto-scaling adjusted.' },
];

const levelCfg: Record<EscLevel, { label: string; bg: string; color: string; border: string }> = {
  critical: { label: 'Critical', bg: '#FEE2E2', color: '#ef4444', border: '#FCA5A5' },
  high:     { label: 'High',     bg: '#FEF3C7', color: '#F59E0B', border: '#FDE68A' },
  medium:   { label: 'Medium',   bg: '#EFF6FF', color: '#2F80ED', border: '#BFDBFE' },
};

const statusCfg: Record<EscStatus, { label: string; bg: string; color: string }> = {
  open:        { label: 'Open',        bg: '#F3F4F6', color: '#6B7280' },
  in_progress: { label: 'In Progress', bg: '#EFF6FF', color: '#2F80ED' },
  resolved:    { label: 'Resolved',    bg: '#ECFDF5', color: '#10b981' },
};

const catColors: Record<string, string> = {
  Technical: '#2F80ED', Client: '#a855f7', HR: '#F59E0B', Security: '#ef4444', Delivery: '#38bdf8', Finance: '#10b981',
};

export default function ManagerEscalationsPage() {
  const [items, setItems]     = useState<Escalation[]>(escalations);
  const [filter, setFilter]   = useState<'all' | EscLevel | EscStatus>('all');
  const [expanded, setExpand] = useState<number | null>(null);

  function resolve(id: number) {
    setItems((prev) => prev.map((e) => e.id === id ? { ...e, status: 'resolved' } : e));
  }
  function takeOwnership(id: number) {
    setItems((prev) => prev.map((e) => e.id === id ? { ...e, status: 'in_progress', assignedTo: 'Self' } : e));
  }

  const open     = items.filter((e) => e.status !== 'resolved').length;
  const critical = items.filter((e) => e.level === 'critical' && e.status !== 'resolved').length;
  const resolved = items.filter((e) => e.status === 'resolved').length;

  const filtered = filter === 'all' ? items
    : items.filter((e) => e.level === filter || e.status === filter);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-[800] text-[#111827]">Escalations</h1>
        <p className="text-[13px] text-[#6B7280] mt-1">High-impact issues that require your immediate attention</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Open Escalations', value: open,     color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)'  },
          { label: 'Critical',         value: critical, color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)'   },
          { label: 'Resolved',         value: resolved, color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
          { label: 'Total',            value: items.length, color: '#2F80ED', bg: 'rgba(47,128,237,0.08)', border: 'rgba(47,128,237,0.2)' },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className="rounded-[14px] p-5 border-[1.5px]" style={{ background: bg, borderColor: border }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'critical', 'high', 'medium', 'open', 'in_progress', 'resolved'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-[8px] text-[12px] font-[600] border transition-all"
            style={{ background: filter === f ? '#111827' : 'white', color: filter === f ? 'white' : '#6B7280', borderColor: filter === f ? '#111827' : '#E5E7EB' }}>
            {f === 'all' ? 'All' : f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Escalation cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((e) => {
          const lc = levelCfg[e.level];
          const sc = statusCfg[e.status];
          const isOpen = expanded === e.id;
          return (
            <div key={e.id} className="bg-white rounded-[14px] border overflow-hidden transition-all"
              style={{ borderColor: e.status !== 'resolved' ? lc.border : '#E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div className="flex items-start gap-4 p-4 cursor-pointer" onClick={() => setExpand(isOpen ? null : e.id)}>
                {/* Level dot */}
                <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: lc.color }} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-[700]" style={{ background: lc.bg, color: lc.color }}>{lc.label}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-[700]" style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-[600]" style={{ background: (catColors[e.category] || '#9CA3AF') + '18', color: catColors[e.category] || '#9CA3AF' }}>
                      {e.category}
                    </span>
                  </div>
                  <div className="text-[14px] font-[700] text-[#111827]">{e.title}</div>
                  <div className="text-[12px] text-[#6B7280] mt-0.5">{e.description}</div>
                  <div className="flex items-center gap-4 mt-2 text-[11px] text-[#9CA3AF]">
                    <span className="flex items-center gap-1"><User size={11} /> {e.raisedBy}</span>
                    <span className="flex items-center gap-1"><ArrowUpRight size={11} /> {e.assignedTo}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {e.raisedAt}</span>
                    <span className="text-[#ef4444] font-[600]">Due: {e.dueBy}</span>
                  </div>
                </div>

                {e.status !== 'resolved' && (
                  <div className="flex gap-2 flex-shrink-0" onClick={(ev) => ev.stopPropagation()}>
                    {e.status === 'open' && (
                      <button onClick={() => takeOwnership(e.id)}
                        className="px-3 py-1.5 rounded-[8px] text-[11px] font-[600] border border-[#2F80ED] text-[#2F80ED] hover:bg-[#EFF6FF] transition-all">
                        Take Over
                      </button>
                    )}
                    <button onClick={() => resolve(e.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-[8px] text-[11px] font-[600] text-white transition-all"
                      style={{ background: '#10b981' }}>
                      <CheckCircle2 size={12} /> Resolve
                    </button>
                  </div>
                )}
                {e.status === 'resolved' && (
                  <CheckCircle2 size={20} className="text-[#10b981] flex-shrink-0" />
                )}
              </div>

              {isOpen && e.notes && (
                <div className="px-4 pb-4 pt-0 border-t border-[#F3F4F6]">
                  <div className="flex items-start gap-2 mt-3 bg-[#F9FAFB] rounded-[10px] px-3 py-2.5">
                    <MessageSquare size={13} className="text-[#9CA3AF] mt-0.5" />
                    <div className="text-[12px] text-[#374151]">{e.notes}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
