import { useState } from 'react';
import { Flame, AlertCircle, CheckCircle2, Clock, Plus, X, UserCheck } from 'lucide-react';

type Priority = 'critical' | 'high' | 'medium' | 'low';
type TaskStatus = 'open' | 'in_progress' | 'resolved';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  assignee: string;
  due: string;
  isBlocker: boolean;
}

const initialTasks: Task[] = [
  { id: 1,  title: 'API rate limiting causing mobile app crashes',   description: 'Auth service returning 429 for 30% of mobile requests. Urgent fix needed.', priority: 'critical', status: 'open',        assignee: 'Rahul K.',   due: 'Today',    isBlocker: true  },
  { id: 2,  title: 'Sprint 12 scope not finalized',                  description: 'Product spec delayed. 3 team members blocked on starting their tasks.',       priority: 'critical', status: 'in_progress', assignee: 'Meena V.',   due: 'Today',    isBlocker: true  },
  { id: 3,  title: 'CI/CD pipeline broken on staging',               description: 'Deployments to staging failing since last merge. Test runs skipped.',         priority: 'high',     status: 'in_progress', assignee: 'Karan B.',   due: 'Tomorrow', isBlocker: true  },
  { id: 4,  title: 'Design tokens not matching component library',   description: 'Color mismatch between Figma and implemented components.',                    priority: 'high',     status: 'open',        assignee: 'Nisha P.',   due: 'Apr 3',    isBlocker: false },
  { id: 5,  title: 'Database migration script needs review',         description: 'Schema changes for v2.3 release. Needs sign-off before deployment.',         priority: 'high',     status: 'open',        assignee: 'Priya S.',   due: 'Apr 3',    isBlocker: false },
  { id: 6,  title: 'Unit test coverage below threshold',             description: 'Coverage dropped to 62%. CI gate requires 75%.',                             priority: 'medium',   status: 'open',        assignee: 'Dev K.',     due: 'Apr 5',    isBlocker: false },
  { id: 7,  title: 'Analytics dashboard loading slow',               description: 'P95 load time is 4.2s. Target is 1.5s.',                                    priority: 'medium',   status: 'in_progress', assignee: 'Sita R.',    due: 'Apr 4',    isBlocker: false },
  { id: 8,  title: 'Onboarding docs outdated',                       description: 'New hires are confused by old setup guide.',                                 priority: 'low',      status: 'open',        assignee: 'Anjali D.',  due: 'Apr 7',    isBlocker: false },
  { id: 9,  title: 'Performance review forms to be distributed',     description: 'Q1 review cycle starts. Send forms to all team members.',                   priority: 'low',      status: 'resolved',    assignee: 'Tina F.',    due: 'Mar 31',   isBlocker: false },
];

const priorityCfg: Record<Priority, { label: string; bg: string; color: string; border: string }> = {
  critical: { label: 'Critical', bg: '#FEE2E2', color: '#ef4444', border: '#FCA5A5' },
  high:     { label: 'High',     bg: '#FEF3C7', color: '#F59E0B', border: '#FDE68A' },
  medium:   { label: 'Medium',   bg: '#EFF6FF', color: '#2F80ED', border: '#BFDBFE' },
  low:      { label: 'Low',      bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB' },
};

const statusCfg: Record<TaskStatus, { label: string; bg: string; color: string }> = {
  open:        { label: 'Open',        bg: '#F3F4F6', color: '#6B7280' },
  in_progress: { label: 'In Progress', bg: '#EFF6FF', color: '#2F80ED' },
  resolved:    { label: 'Resolved',    bg: '#ECFDF5', color: '#10b981' },
};

export default function ManagerTasksPage() {
  const [tasks, setTasks]         = useState<Task[]>(initialTasks);
  const [filterPriority, setFP]   = useState<'all' | Priority>('all');
  const [filterStatus, setFS]     = useState<'all' | TaskStatus>('all');
  const [blockersOnly, setBo]     = useState(false);

  function resolve(id: number) {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: 'resolved' } : t));
  }

  function startProgress(id: number) {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: 'in_progress' } : t));
  }

  const filtered = tasks.filter((t) => {
    if (blockersOnly && !t.isBlocker) return false;
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    return true;
  });

  const blockerCount = tasks.filter((t) => t.isBlocker && t.status !== 'resolved').length;
  const openCount    = tasks.filter((t) => t.status === 'open').length;
  const inProgCount  = tasks.filter((t) => t.status === 'in_progress').length;
  const doneCount    = tasks.filter((t) => t.status === 'resolved').length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-[800] text-[#111827]">Tasks & Blockers</h1>
          <p className="text-[13px] text-[#6B7280] mt-1">Track and resolve issues affecting your team's productivity</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-white text-[13px] font-[600] transition-all"
          style={{ background: '#2F80ED', boxShadow: '0 4px 14px rgba(47,128,237,0.3)' }}>
          <Plus size={16} /> Add Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Active Blockers', value: blockerCount, color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)'  },
          { label: 'Open Tasks',      value: openCount,    color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
          { label: 'In Progress',     value: inProgCount,  color: '#2F80ED', bg: 'rgba(47,128,237,0.08)', border: 'rgba(47,128,237,0.2)' },
          { label: 'Resolved',        value: doneCount,    color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className="rounded-[14px] p-5 border-[1.5px]"
            style={{ background: bg, borderColor: border }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Active Blockers callout */}
      {blockerCount > 0 && (
        <div className="rounded-[14px] border-[1.5px] border-[#FCA5A5] bg-[#FEF2F2] px-5 py-4 flex items-start gap-3">
          <Flame size={18} className="text-[#ef4444] mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[13px] font-[700] text-[#ef4444] mb-1">{blockerCount} Active Blocker{blockerCount !== 1 ? 's' : ''} — Immediate Action Required</div>
            <div className="text-[12px] text-[#7F1D1D]">These issues are blocking your team. Resolve them before tackling other tasks.</div>
          </div>
          <button onClick={() => { setBo(true); setFS('all'); setFP('all'); }}
            className="ml-auto px-3 py-1.5 rounded-[8px] text-[12px] font-[600] text-white flex-shrink-0"
            style={{ background: '#ef4444' }}>
            Show Blockers
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setBo(!blockersOnly)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-[600] border transition-all"
          style={{ background: blockersOnly ? '#ef4444' : 'white', color: blockersOnly ? 'white' : '#6B7280', borderColor: blockersOnly ? '#ef4444' : '#E5E7EB' }}>
          <AlertCircle size={13} /> Blockers Only
        </button>
        {(['all', 'critical', 'high', 'medium', 'low'] as const).map((p) => (
          <button key={p} onClick={() => setFP(p)}
            className="px-3 py-1.5 rounded-[8px] text-[12px] font-[600] border transition-all"
            style={{ background: filterPriority === p ? '#111827' : 'white', color: filterPriority === p ? 'white' : '#6B7280', borderColor: filterPriority === p ? '#111827' : '#E5E7EB' }}>
            {p === 'all' ? 'All Priority' : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
        <div className="flex gap-2 ml-auto">
          {(['all', 'open', 'in_progress', 'resolved'] as const).map((s) => (
            <button key={s} onClick={() => setFS(s)}
              className="px-3 py-1.5 rounded-[8px] text-[12px] font-[600] border transition-all"
              style={{ background: filterStatus === s ? '#2F80ED' : 'white', color: filterStatus === s ? 'white' : '#6B7280', borderColor: filterStatus === s ? '#2F80ED' : '#E5E7EB' }}>
              {s === 'all' ? 'All' : s === 'in_progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-3">
        {filtered.map((task) => {
          const pc = priorityCfg[task.priority];
          const sc = statusCfg[task.status];
          return (
            <div key={task.id}
              className="bg-white rounded-[14px] border border-[#E5E7EB] p-4 flex items-start gap-4 hover:shadow-md transition-all"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)', borderColor: task.isBlocker && task.status !== 'resolved' ? '#FCA5A5' : '#E5E7EB' }}>

              {/* Priority indicator */}
              <div className="w-1 self-stretch rounded-full flex-shrink-0"
                style={{ background: pc.color }} />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {task.isBlocker && task.status !== 'resolved' && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-[700] bg-[#FEE2E2] text-[#ef4444]">
                      <Flame size={9} /> BLOCKER
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-[700]"
                    style={{ background: pc.bg, color: pc.color }}>
                    {pc.label}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-[700]"
                    style={{ background: sc.bg, color: sc.color }}>
                    {sc.label}
                  </span>
                </div>
                <div className="text-[14px] font-[700] text-[#111827] mb-1">{task.title}</div>
                <div className="text-[12px] text-[#6B7280] mb-2">{task.description}</div>
                <div className="flex items-center gap-4 text-[11px] text-[#9CA3AF]">
                  <span className="flex items-center gap-1"><UserCheck size={11} /> {task.assignee}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> Due: {task.due}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                {task.status === 'open' && (
                  <button onClick={() => startProgress(task.id)}
                    className="px-3 py-1.5 rounded-[8px] text-[11px] font-[600] border border-[#2F80ED] text-[#2F80ED] transition-all hover:bg-[#EFF6FF]">
                    Start
                  </button>
                )}
                {task.status !== 'resolved' && (
                  <button onClick={() => resolve(task.id)}
                    className="px-3 py-1.5 rounded-[8px] text-[11px] font-[600] text-white transition-all"
                    style={{ background: '#10b981' }}>
                    Resolve
                  </button>
                )}
                {task.status === 'resolved' && (
                  <CheckCircle2 size={20} className="text-[#10b981] mx-auto" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
