import { useState } from 'react';
import { UserCheck, UserX, Home, Clock, Search, Users, Wifi } from 'lucide-react';

const teamMembers = [
  { name: 'Rahul Kumar',    role: 'Frontend Dev',   status: 'present', dept: 'Engineering', in: '09:02', out: null,    avatar: '#2F80ED' },
  { name: 'Priya Sharma',   role: 'Backend Dev',    status: 'present', dept: 'Engineering', in: '08:55', out: null,    avatar: '#10b981' },
  { name: 'Arun Mehta',     role: 'Designer',       status: 'absent',  dept: 'Design',      in: null,    out: null,    avatar: '#ef4444' },
  { name: 'Meena Verma',    role: 'Product Manager',status: 'wfh',     dept: 'Product',     in: '09:30', out: null,    avatar: '#a855f7' },
  { name: 'Dev Kumar',      role: 'QA Engineer',    status: 'late',    dept: 'Engineering', in: '10:15', out: null,    avatar: '#F59E0B' },
  { name: 'Sita Rao',       role: 'Data Analyst',   status: 'present', dept: 'Analytics',   in: '08:48', out: null,    avatar: '#38bdf8' },
  { name: 'Karan Bhatia',   role: 'DevOps',         status: 'present', dept: 'Engineering', in: '09:05', out: null,    avatar: '#2F80ED' },
  { name: 'Nisha Patel',    role: 'UX Designer',    status: 'wfh',     dept: 'Design',      in: '09:00', out: null,    avatar: '#10b981' },
  { name: 'Vijay Lobo',     role: 'Backend Dev',    status: 'absent',  dept: 'Engineering', in: null,    out: null,    avatar: '#ef4444' },
  { name: 'Anjali Das',     role: 'Scrum Master',   status: 'present', dept: 'Engineering', in: '08:50', out: null,    avatar: '#a855f7' },
  { name: 'Raj Singh',      role: 'Frontend Dev',   status: 'present', dept: 'Engineering', in: '09:10', out: null,    avatar: '#F59E0B' },
  { name: 'Tina Fernandez', role: 'Business Analyst',status:'present', dept: 'Product',     in: '09:00', out: null,    avatar: '#38bdf8' },
];

const statusConfig: Record<string, { label: string; bg: string; color: string; icon: any; dot: string }> = {
  present: { label: 'Present', bg: '#ECFDF5', color: '#10b981', icon: UserCheck, dot: '#10b981' },
  absent:  { label: 'Absent',  bg: '#FEE2E2', color: '#ef4444', icon: UserX,     dot: '#ef4444' },
  wfh:     { label: 'WFH',     bg: '#EFF6FF', color: '#2F80ED', icon: Home,      dot: '#2F80ED' },
  late:    { label: 'Late',    bg: '#FEF3C7', color: '#F59E0B', icon: Clock,     dot: '#F59E0B' },
};

const depts = ['All', 'Engineering', 'Design', 'Product', 'Analytics'];

export default function ManagerTeamPage() {
  const [search, setSearch]   = useState('');
  const [dept, setDept]       = useState('All');
  const [view, setView]       = useState<'grid' | 'list'>('grid');

  const filtered = teamMembers.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                        m.role.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === 'All' || m.dept === dept;
    return matchSearch && matchDept;
  });

  const counts = {
    present: teamMembers.filter((m) => m.status === 'present').length,
    absent:  teamMembers.filter((m) => m.status === 'absent').length,
    wfh:     teamMembers.filter((m) => m.status === 'wfh').length,
    late:    teamMembers.filter((m) => m.status === 'late').length,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-[800] text-[#111827]">Team Availability</h1>
        <p className="text-[13px] text-[#6B7280] mt-1">Real-time status of your team members today</p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-4 gap-4">
        {(Object.entries(counts) as [string, number][]).map(([status, count]) => {
          const cfg = statusConfig[status];
          const Icon = cfg.icon;
          return (
            <div key={status} className="rounded-[14px] p-4 border-[1.5px] flex items-center gap-3"
              style={{ background: cfg.bg, borderColor: cfg.color + '40' }}>
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center"
                style={{ background: cfg.color, color: '#fff' }}>
                <Icon size={18} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: cfg.color, lineHeight: 1 }}>{count}</div>
                <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>{cfg.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search by name or role…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-[10px] border border-[#E5E7EB] text-[13px] text-[#111827] outline-none"
            onFocus={(e) => { e.currentTarget.style.borderColor = '#2F80ED'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; }}
          />
        </div>
        <div className="flex gap-2">
          {depts.map((d) => (
            <button key={d}
              onClick={() => setDept(d)}
              className="px-3 py-1.5 rounded-[8px] text-[12px] font-[600] border transition-all"
              style={{ background: dept === d ? '#111827' : 'white', color: dept === d ? 'white' : '#6B7280', borderColor: dept === d ? '#111827' : '#E5E7EB' }}>
              {d}
            </button>
          ))}
        </div>
        <div className="flex gap-1 ml-auto">
          {(['grid', 'list'] as const).map((v) => (
            <button key={v}
              onClick={() => setView(v)}
              className="px-3 py-1.5 rounded-[8px] text-[12px] font-[600] border transition-all"
              style={{ background: view === v ? '#2F80ED' : 'white', color: view === v ? 'white' : '#6B7280', borderColor: view === v ? '#2F80ED' : '#E5E7EB' }}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Team grid / list */}
      {view === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((m, i) => {
            const cfg = statusConfig[m.status];
            const Icon = cfg.icon;
            return (
              <div key={i} className="bg-white rounded-[16px] border border-[#E5E7EB] p-4 flex flex-col items-center text-center gap-2 hover:shadow-md transition-all"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[15px] font-[700]"
                    style={{ background: m.avatar }}>
                    {m.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white"
                    style={{ background: cfg.dot }} />
                </div>
                <div>
                  <div className="text-[13px] font-[700] text-[#111827]">{m.name}</div>
                  <div className="text-[11px] text-[#6B7280]">{m.role}</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-[700]"
                  style={{ background: cfg.bg, color: cfg.color }}>
                  <Icon size={9} className="inline mr-1" />{cfg.label}
                </span>
                {m.in && (
                  <div className="text-[10px] text-[#9CA3AF]">In: {m.in}</div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-[18px] border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div className="grid px-5 py-3 border-b border-[#E5E7EB]"
            style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr' }}>
            {['Name', 'Role', 'Department', 'Status', 'Check-in'].map((h) => (
              <div key={h} className="text-[11px] font-[700] text-[#9CA3AF] uppercase tracking-[0.06em]">{h}</div>
            ))}
          </div>
          {filtered.map((m, i) => {
            const cfg = statusConfig[m.status];
            return (
              <div key={i} className="grid items-center px-5 py-3 border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F9FAFB] transition-colors"
                style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-[700]"
                    style={{ background: m.avatar }}>
                    {m.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-[13px] font-[600] text-[#111827]">{m.name}</div>
                    <div className="text-[11px] text-[#9CA3AF]">{m.dept}</div>
                  </div>
                </div>
                <div className="text-[12px] text-[#374151]">{m.role}</div>
                <div className="text-[12px] text-[#374151]">{m.dept}</div>
                <span className="px-2 py-0.5 rounded-[6px] text-[11px] font-[700] w-fit"
                  style={{ background: cfg.bg, color: cfg.color }}>
                  {cfg.label}
                </span>
                <div className="text-[12px] text-[#6B7280]">{m.in || '—'}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Connectivity note */}
      <div className="flex items-center gap-2 text-[12px] text-[#9CA3AF] justify-end">
        <Wifi size={13} /> Live data · Last synced just now
      </div>
    </div>
  );
}
