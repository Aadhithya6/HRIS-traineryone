import { useState } from 'react';
import { MessageSquare, Calendar, Clock, Plus, CheckCircle2, ChevronDown, ChevronUp, User } from 'lucide-react';

interface OneOnOne {
  id: number;
  member: string;
  role: string;
  avatar: string;
  lastMeeting: string | null;
  nextMeeting: string | null;
  frequency: string;
  status: 'scheduled' | 'overdue' | 'completed' | 'pending';
  notes?: string;
  actionItems: string[];
}

const oneOnOnes: OneOnOne[] = [
  { id: 1, member: 'Rahul Kumar',    role: 'Frontend Dev',     avatar: '#2F80ED', lastMeeting: 'Mar 25',  nextMeeting: 'Apr 8',  frequency: 'Biweekly', status: 'scheduled', notes: 'Discussed career goals and current sprint workload.', actionItems: ['Share React workshop links', 'Discuss promotion timeline'] },
  { id: 2, member: 'Priya Sharma',   role: 'Backend Dev',      avatar: '#10b981', lastMeeting: 'Mar 18',  nextMeeting: 'Apr 1',  frequency: 'Biweekly', status: 'overdue',   notes: 'Performance improving. DB optimization skills to be reinforced.', actionItems: ['Send Node.js course recommendation'] },
  { id: 3, member: 'Meena Verma',    role: 'Product Manager',  avatar: '#a855f7', lastMeeting: 'Mar 28',  nextMeeting: 'Apr 4',  frequency: 'Weekly',   status: 'scheduled', notes: 'Sprint planning alignment.', actionItems: ['Review Q2 roadmap together'] },
  { id: 4, member: 'Karan Bhatia',   role: 'DevOps',           avatar: '#F59E0B', lastMeeting: 'Mar 20',  nextMeeting: 'Apr 3',  frequency: 'Biweekly', status: 'scheduled', notes: 'Infra cost review completed.', actionItems: ['Follow up on K8s migration timeline'] },
  { id: 5, member: 'Dev Kumar',      role: 'QA Engineer',      avatar: '#ef4444', lastMeeting: null,      nextMeeting: 'Apr 5',  frequency: 'Monthly',  status: 'pending',   notes: undefined, actionItems: ['First 1:1 — set up initial check-in agenda'] },
  { id: 6, member: 'Sita Rao',       role: 'Data Analyst',     avatar: '#38bdf8', lastMeeting: 'Mar 15',  nextMeeting: 'Apr 12', frequency: 'Monthly',  status: 'scheduled', notes: 'Dashboard performance concern raised.', actionItems: ['Share analytics optimization resources'] },
  { id: 7, member: 'Anjali Das',     role: 'Scrum Master',     avatar: '#2F80ED', lastMeeting: 'Mar 28',  nextMeeting: 'Apr 11', frequency: 'Biweekly', status: 'scheduled', notes: 'Retrospective improvements discussed.', actionItems: ['Review new retro format'] },
  { id: 8, member: 'Nisha Patel',    role: 'UX Designer',      avatar: '#10b981', lastMeeting: 'Feb 28',  nextMeeting: null,     frequency: 'Monthly',  status: 'overdue',   notes: undefined, actionItems: ['Schedule overdue 1:1 ASAP'] },
];

const statusCfg: Record<string, { label: string; bg: string; color: string }> = {
  scheduled: { label: 'Scheduled',  bg: '#EFF6FF', color: '#2F80ED' },
  overdue:   { label: 'Overdue',    bg: '#FEE2E2', color: '#ef4444' },
  completed: { label: 'Completed',  bg: '#ECFDF5', color: '#10b981' },
  pending:   { label: 'Pending',    bg: '#F3F4F6', color: '#6B7280' },
};

export default function ManagerMeetingsPage() {
  const [items, setItems]   = useState<OneOnOne[]>(oneOnOnes);
  const [expanded, setExp]  = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'overdue' | 'scheduled' | 'pending'>('all');

  function markDone(id: number) {
    setItems((prev) => prev.map((m) => m.id === id ? { ...m, status: 'completed' } : m));
  }

  const counts = {
    all:       items.length,
    overdue:   items.filter((m) => m.status === 'overdue').length,
    scheduled: items.filter((m) => m.status === 'scheduled').length,
    pending:   items.filter((m) => m.status === 'pending').length,
  };

  const filtered = filter === 'all' ? items : items.filter((m) => m.status === filter);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-[800] text-[#111827]">1:1 Meetings</h1>
          <p className="text-[13px] text-[#6B7280] mt-1">Track and schedule your regular team check-ins</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-white text-[13px] font-[600]"
          style={{ background: '#2F80ED', boxShadow: '0 4px 14px rgba(47,128,237,0.3)' }}>
          <Plus size={16} /> Schedule Meeting
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { key: 'all',       label: 'Team Members', color: '#2F80ED', bg: 'rgba(47,128,237,0.08)', border: 'rgba(47,128,237,0.2)' },
          { key: 'scheduled', label: 'Scheduled',    color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
          { key: 'overdue',   label: 'Overdue',      color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)'  },
          { key: 'pending',   label: 'Not Scheduled',color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
        ].map(({ key, label, color, bg, border }) => (
          <div key={key}
            onClick={() => setFilter(key as any)}
            className="rounded-[14px] p-5 border-[1.5px] cursor-pointer transition-all"
            style={{ background: bg, borderColor: filter === key ? color : border }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{counts[key as keyof typeof counts] ?? 0}</div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'overdue', 'scheduled', 'pending'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-[8px] text-[12px] font-[600] border transition-all"
            style={{ background: filter === f ? '#111827' : 'white', color: filter === f ? 'white' : '#6B7280', borderColor: filter === f ? '#111827' : '#E5E7EB' }}>
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f] ?? 0})
          </button>
        ))}
      </div>

      {/* 1:1 list */}
      <div className="flex flex-col gap-3">
        {filtered.map((m) => {
          const sc = statusCfg[m.status];
          const isOpen = expanded === m.id;
          return (
            <div key={m.id} className="bg-white rounded-[14px] border border-[#E5E7EB] overflow-hidden"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#F9FAFB] transition-colors"
                onClick={() => setExp(isOpen ? null : m.id)}>

                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-[700] flex-shrink-0"
                  style={{ background: m.avatar }}>
                  {m.member.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14px] font-[700] text-[#111827]">{m.member}</span>
                    <span className="text-[11px] text-[#6B7280]">{m.role}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-[700]"
                      style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-[11px] text-[#9CA3AF]">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {m.frequency}</span>
                    <span>Last: {m.lastMeeting || 'Never'}</span>
                    <span className={m.status === 'overdue' ? 'text-[#ef4444] font-[600]' : ''}>
                      Next: {m.nextMeeting || 'Not set'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {m.status !== 'completed' && (
                    <button onClick={(e) => { e.stopPropagation(); markDone(m.id); }}
                      className="px-3 py-1.5 rounded-[8px] text-[11px] font-[600] text-white"
                      style={{ background: '#10b981' }}>
                      Done
                    </button>
                  )}
                  <button className="px-3 py-1.5 rounded-[8px] text-[11px] font-[600] border border-[#2F80ED] text-[#2F80ED] hover:bg-[#EFF6FF] transition-all"
                    onClick={(e) => e.stopPropagation()}>
                    Schedule
                  </button>
                  {isOpen ? <ChevronUp size={16} className="text-[#9CA3AF]" /> : <ChevronDown size={16} className="text-[#9CA3AF]" />}
                </div>
              </div>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-[#F3F4F6] bg-[#FAFAFA]">
                  {m.notes && (
                    <div className="mt-3">
                      <div className="text-[11px] font-[700] text-[#9CA3AF] uppercase tracking-[0.06em] mb-1.5">Notes from last meeting</div>
                      <div className="text-[13px] text-[#374151] bg-white rounded-[10px] px-3 py-2.5 border border-[#E5E7EB]">{m.notes}</div>
                    </div>
                  )}
                  {m.actionItems.length > 0 && (
                    <div className="mt-3">
                      <div className="text-[11px] font-[700] text-[#9CA3AF] uppercase tracking-[0.06em] mb-1.5">Action Items</div>
                      <div className="flex flex-col gap-1.5">
                        {m.actionItems.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-[12px] text-[#374151]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2F80ED] mt-1.5 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
