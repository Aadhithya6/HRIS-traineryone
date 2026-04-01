import { useEffect, useState } from 'react';
import { Check, X, Loader2, CheckCircle2, Clock, UserCheck } from 'lucide-react';
import { leaveApi, LeaveRequest } from '../../api/client';

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

function formatMeta(leave: LeaveRequest) {
  const type  = leave.leave_type.charAt(0).toUpperCase() + leave.leave_type.slice(1);
  const start = new Date(leave.start_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const end   = new Date(leave.end_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  return `${type} Leave · ${start}${leave.total_days > 1 ? ` – ${end}` : ''} · ${leave.total_days} ${leave.total_days === 1 ? 'day' : 'days'}`;
}

const statusMap: Record<string, { label: string; bg: string; color: string }> = {
  pending_manager: { label: 'Pending Approval', bg: '#FEF3C7', color: '#F59E0B' },
  pending_hr:      { label: 'Sent to HR',        bg: '#EFF6FF', color: '#2F80ED' },
  approved:        { label: 'Approved',           bg: '#ECFDF5', color: '#10b981' },
  rejected:        { label: 'Rejected',           bg: '#FEE2E2', color: '#ef4444' },
};

const AVATAR_COLORS = ['#2F80ED', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#38bdf8'];

type FilterKey = 'all' | 'pending_manager' | 'approved' | 'rejected';

export default function ManagerApprovalsPage() {
  const [leaves, setLeaves]           = useState<LeaveRequest[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [actioningId, setActioningId] = useState<number | null>(null);
  const [filter, setFilter]           = useState<FilterKey>('all');

  useEffect(() => {
    leaveApi.teamLeaves()
      .then((d) => setLeaves(d.leaves))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAction(id: number, action: 'approved' | 'rejected') {
    setActioningId(id);
    try {
      await leaveApi.managerAction(id, action);
      setLeaves((prev) => prev.map((l) => l.id === id ? { ...l, status: action } : l));
    } catch (err: any) {
      alert(err.message || 'Action failed');
    } finally {
      setActioningId(null);
    }
  }

  const counts = {
    all:             leaves.length,
    pending_manager: leaves.filter((l) => l.status === 'pending_manager').length,
    approved:        leaves.filter((l) => l.status === 'approved').length,
    rejected:        leaves.filter((l) => l.status === 'rejected').length,
  };

  const filtered = filter === 'all' ? leaves : leaves.filter((l) => l.status === filter);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-[800] text-[#111827]">Leave Approvals</h1>
        <p className="text-[13px] text-[#6B7280] mt-1">Review and action your team's leave requests</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {([
          { key: 'all',             label: 'Total Requests', color: '#2F80ED', bg: 'rgba(47,128,237,0.08)',  border: 'rgba(47,128,237,0.2)'  },
          { key: 'pending_manager', label: 'Pending',        color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)'  },
          { key: 'approved',        label: 'Approved',       color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
          { key: 'rejected',        label: 'Rejected',       color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)'   },
        ] as const).map(({ key, label, color, bg, border }) => (
          <div
            key={key}
            onClick={() => setFilter(key)}
            className="rounded-[14px] p-5 border-[1.5px] cursor-pointer transition-all"
            style={{ background: bg, borderColor: filter === key ? color : border, boxShadow: filter === key ? `0 0 0 2px ${color}30` : undefined }}
          >
            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{counts[key]}</div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'pending_manager', 'approved', 'rejected'] as FilterKey[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-[8px] text-[12px] font-[600] transition-all border-[1.5px]"
            style={{
              background: filter === f ? '#2F80ED' : 'white',
              color: filter === f ? 'white' : '#6B7280',
              borderColor: filter === f ? '#2F80ED' : '#E5E7EB',
            }}
          >
            {f === 'all' ? 'All' : f === 'pending_manager' ? 'Pending' : f.charAt(0).toUpperCase() + f.slice(1)}
            {' '}({counts[f]})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[18px] border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #2F80ED, #56CCF2)' }} />

        {loading && (
          <div className="flex items-center justify-center h-40 text-[#9CA3AF]">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading requests…
          </div>
        )}
        {error && (
          <div className="m-5 rounded-[10px] px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        {!loading && !error && (
          <>
            {/* Table header */}
            <div className="grid px-5 py-3 border-b border-[#E5E7EB]"
              style={{ gridTemplateColumns: '2fr 2.5fr 1.2fr 1.5fr' }}>
              {['Employee', 'Leave Details', 'Status', 'Actions'].map((h) => (
                <div key={h} className="text-[11px] font-[700] text-[#9CA3AF] uppercase tracking-[0.06em]">{h}</div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center h-36 text-[#9CA3AF] text-[13px] gap-2">
                <UserCheck size={28} className="opacity-25" />
                No requests found for this filter.
              </div>
            )}

            {filtered.map((leave, idx) => {
              const sm = statusMap[leave.status] || statusMap.pending_manager;
              const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
              const canAct = leave.status === 'pending_manager';
              return (
                <div key={leave.id} className="grid items-center px-5 py-4 border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F9FAFB] transition-colors"
                  style={{ gridTemplateColumns: '2fr 2.5fr 1.2fr 1.5fr' }}>

                  {/* Employee */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-[700] flex-shrink-0"
                      style={{ background: avatarColor }}>
                      {getInitials(leave.employee_name || '—')}
                    </div>
                    <div>
                      <div className="text-[13px] font-[700] text-[#111827]">{leave.employee_name}</div>
                      <div className="text-[11px] text-[#9CA3AF]">{leave.employee_email}</div>
                    </div>
                  </div>

                  {/* Leave details */}
                  <div>
                    <div className="text-[12px] font-[600] text-[#374151]">{formatMeta(leave)}</div>
                    {leave.reason && (
                      <div className="text-[11px] text-[#6B7280] mt-1 truncate max-w-[280px]">{leave.reason}</div>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <span className="px-2.5 py-1 rounded-[8px] text-[11px] font-[700]"
                      style={{ background: sm.bg, color: sm.color }}>
                      {sm.label}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {canAct ? (
                      <>
                        <button
                          onClick={() => handleAction(leave.id, 'approved')}
                          disabled={actioningId === leave.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-white text-[12px] font-[700] transition-all disabled:opacity-60"
                          style={{ background: '#10b981' }}
                        >
                          {actioningId === leave.id ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(leave.id, 'rejected')}
                          disabled={actioningId === leave.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-[700] border-[1.5px] transition-all disabled:opacity-60"
                          style={{ borderColor: '#ef4444', color: '#ef4444', background: 'transparent' }}
                        >
                          <X size={13} /> Reject
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF]">
                        {leave.status === 'approved' ? (
                          <><CheckCircle2 size={14} className="text-[#10b981]" /> Done</>
                        ) : leave.status === 'rejected' ? (
                          <><X size={14} className="text-[#ef4444]" /> Rejected</>
                        ) : (
                          <><Clock size={14} /> Forwarded</>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
