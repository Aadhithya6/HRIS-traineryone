import { useState } from 'react';
import { FileText, Download, BarChart3, Users, TrendingUp, UserPlus, Calendar, CheckCircle2, Clock } from 'lucide-react';

const reports = [
  { title: 'Team Performance Report — Q1 2026',  icon: TrendingUp, category: 'Performance', date: 'Mar 31, 2026', size: '1.8 MB', color: '#2F80ED', bg: 'rgba(47,128,237,0.08)'   },
  { title: 'Sprint Velocity & Delivery Report',   icon: BarChart3,  category: 'Delivery',   date: 'Mar 31, 2026', size: '1.2 MB', color: '#10b981', bg: 'rgba(16,185,129,0.08)'   },
  { title: 'Team Attendance Summary — March',     icon: Calendar,   category: 'Attendance', date: 'Mar 31, 2026', size: '890 KB', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)'   },
  { title: 'Skill Gap & Training Progress',       icon: Users,      category: 'Training',   date: 'Mar 31, 2026', size: '640 KB', color: '#a855f7', bg: 'rgba(168,85,247,0.08)'   },
  { title: 'Workload Distribution Report',        icon: BarChart3,  category: 'Workload',   date: 'Mar 31, 2026', size: '750 KB', color: '#ef4444', bg: 'rgba(239,68,68,0.08)'    },
  { title: 'Leave Utilisation — Q1',              icon: Calendar,   category: 'Leave',      date: 'Mar 31, 2026', size: '520 KB', color: '#38bdf8', bg: 'rgba(56,189,248,0.08)'   },
];

interface HiringRequest {
  id: number;
  role: string;
  dept: string;
  reason: string;
  priority: 'urgent' | 'normal' | 'low';
  status: 'pending' | 'approved' | 'rejected';
  submittedOn: string;
}

const hiringRequests: HiringRequest[] = [
  { id: 1, role: 'Senior Backend Engineer', dept: 'Engineering', reason: 'Team expansion for Q2 product launch', priority: 'urgent', status: 'approved',  submittedOn: 'Mar 15' },
  { id: 2, role: 'QA Automation Engineer',  dept: 'Engineering', reason: 'Replace contractor, need full-time',   priority: 'normal', status: 'pending',   submittedOn: 'Mar 22' },
  { id: 3, role: 'Product Designer',        dept: 'Design',      reason: 'Backfill for Arun Mehta resignation',  priority: 'urgent', status: 'pending',   submittedOn: 'Mar 28' },
  { id: 4, role: 'Business Analyst',        dept: 'Product',     reason: 'Support expanded client onboarding',   priority: 'low',    status: 'rejected',  submittedOn: 'Feb 10' },
];

const priorityCfg = {
  urgent: { bg: '#FEE2E2', color: '#ef4444' },
  normal: { bg: '#EFF6FF', color: '#2F80ED' },
  low:    { bg: '#F3F4F6', color: '#6B7280' },
};

const hrStatusCfg = {
  pending:  { bg: '#FEF3C7', color: '#F59E0B', label: 'Pending HR' },
  approved: { bg: '#ECFDF5', color: '#10b981', label: 'Approved'   },
  rejected: { bg: '#FEE2E2', color: '#ef4444', label: 'Rejected'   },
};

const quickStats = [
  { label: 'Reports This Month', value: '12',  change: '+3 vs last month', color: '#2F80ED' },
  { label: 'Total Downloads',    value: '68',  change: '+11 this week',    color: '#10b981' },
  { label: 'Hiring Requests',    value: '4',   change: '2 pending review', color: '#F59E0B' },
  { label: 'Team Compliance',    value: '94%', change: '+2% vs Q4',        color: '#a855f7' },
];

export default function ManagerReportsPage() {
  const [requests, setRequests]   = useState<HiringRequest[]>(hiringRequests);
  const [showHiringForm, setSHF]  = useState(false);
  const [tab, setTab]             = useState<'reports' | 'hiring'>('reports');
  const [newRole, setNewRole]     = useState('');
  const [newDept, setNewDept]     = useState('');
  const [newReason, setNewReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function submitHiring(e: React.FormEvent) {
    e.preventDefault();
    if (!newRole || !newDept) return;
    setRequests((prev) => [
      { id: prev.length + 1, role: newRole, dept: newDept, reason: newReason, priority: 'normal', status: 'pending', submittedOn: 'Apr 1' },
      ...prev,
    ]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setSHF(false); setNewRole(''); setNewDept(''); setNewReason(''); }, 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-[800] text-[#111827]">Reports & Hiring</h1>
          <p className="text-[13px] text-[#6B7280] mt-1">Generate team reports and submit hiring requests</p>
        </div>
        <button onClick={() => setTab('hiring')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-white text-[13px] font-[600]"
          style={{ background: '#2F80ED', boxShadow: '0 4px 14px rgba(47,128,237,0.3)' }}>
          <UserPlus size={16} /> Request Hiring
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map(({ label, value, change, color }) => (
          <div key={label} className="bg-white rounded-[14px] p-5 border border-[#E5E7EB]"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#374151', marginTop: '4px', fontWeight: 600 }}>{label}</div>
            <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>{change}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['reports', 'hiring'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="px-5 py-2 rounded-[10px] text-[13px] font-[600] border transition-all"
            style={{ background: tab === t ? '#111827' : 'white', color: tab === t ? 'white' : '#6B7280', borderColor: tab === t ? '#111827' : '#E5E7EB' }}>
            {t === 'reports' ? 'Reports' : 'Hiring Requests'}
          </button>
        ))}
      </div>

      {tab === 'reports' && (
        <div className="bg-white rounded-[18px] border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #2F80ED, #56CCF2)' }} />
          <div className="px-5 py-4 border-b border-[#E5E7EB]">
            <div className="text-[14px] font-[700] text-[#111827]">Team Reports — March 2026</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            {reports.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title}
                  className="flex items-center gap-4 p-4 rounded-[12px] border border-[#E5E7EB] cursor-pointer transition-all group"
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.background = r.bg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = 'transparent'; }}>
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                    style={{ background: r.bg, color: r.color }}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-[600] text-[#111827] truncate">{r.title}</div>
                    <div className="text-[11px] text-[#9CA3AF] mt-0.5">{r.category} · {r.date} · {r.size}</div>
                  </div>
                  <button
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center border border-[#E5E7EB] transition-all flex-shrink-0 opacity-0 group-hover:opacity-100"
                    style={{ borderColor: r.color, color: r.color }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = r.color; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = r.color; }}>
                    <Download size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'hiring' && (
        <div className="flex flex-col gap-4">
          {/* New request form */}
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-[14px] font-[700] text-[#111827]">
                <UserPlus size={15} className="inline mr-1.5 text-[#2F80ED]" /> New Hiring Request
              </div>
              <button onClick={() => setSHF(!showHiringForm)}
                className="text-[12px] font-[600] px-3 py-1.5 rounded-[8px] border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB] transition-all">
                {showHiringForm ? 'Cancel' : 'Open Form'}
              </button>
            </div>

            {showHiringForm && (
              <form onSubmit={submitHiring} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-[600] text-[#6B7280] mb-1">Role *</label>
                    <input type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)}
                      placeholder="e.g. Senior Backend Engineer"
                      className="w-full px-3 py-2 rounded-[10px] border border-[#E5E7EB] text-[13px] outline-none transition-all"
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#2F80ED'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; }} />
                  </div>
                  <div>
                    <label className="block text-[12px] font-[600] text-[#6B7280] mb-1">Department *</label>
                    <input type="text" value={newDept} onChange={(e) => setNewDept(e.target.value)}
                      placeholder="e.g. Engineering"
                      className="w-full px-3 py-2 rounded-[10px] border border-[#E5E7EB] text-[13px] outline-none transition-all"
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#2F80ED'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; }} />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-[600] text-[#6B7280] mb-1">Business Justification</label>
                  <textarea rows={2} value={newReason} onChange={(e) => setNewReason(e.target.value)}
                    placeholder="Why is this hire needed?"
                    className="w-full px-3 py-2 rounded-[10px] border border-[#E5E7EB] text-[13px] outline-none transition-all resize-none"
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#2F80ED'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; }} />
                </div>
                <div className="flex items-center gap-3">
                  <button type="submit"
                    className="px-5 py-2.5 rounded-[10px] text-white text-[13px] font-[600]"
                    style={{ background: '#2F80ED' }}>
                    Submit Request
                  </button>
                  {submitted && (
                    <div className="flex items-center gap-1.5 text-[13px] text-[#10b981] font-[600]">
                      <CheckCircle2 size={16} /> Submitted!
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Existing requests */}
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="px-5 py-4 border-b border-[#E5E7EB]">
              <div className="text-[14px] font-[700] text-[#111827]">Submitted Requests</div>
            </div>
            {requests.map((r) => {
              const pc = priorityCfg[r.priority];
              const sc = hrStatusCfg[r.status];
              return (
                <div key={r.id} className="flex items-center gap-4 px-5 py-4 border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F9FAFB] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[13px] font-[700] text-[#111827]">{r.role}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-[700]" style={{ background: pc.bg, color: pc.color }}>
                        {r.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#9CA3AF]">{r.dept} · Submitted {r.submittedOn}</div>
                    {r.reason && <div className="text-[12px] text-[#6B7280] mt-1">{r.reason}</div>}
                  </div>
                  <div className="ml-auto flex-shrink-0">
                    <span className="px-2.5 py-1 rounded-[8px] text-[11px] font-[700]"
                      style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
