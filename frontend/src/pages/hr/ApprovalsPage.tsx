import { useEffect, useState } from 'react';
import { Check, X, Loader2, Filter, CheckCircle2 } from 'lucide-react';
import { leaveApi, LeaveRequest } from '../../api/client';

const AVATAR_COLORS = ['#10b981', '#f59e0b', '#4f6ef7', '#ef4444', '#38bdf8', '#a855f7'];

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
  pending_manager: { label: 'Pending Manager', bg: '#FEF3C7', color: '#F59E0B' },
  pending_hr:      { label: 'Pending HR',      bg: '#EFF6FF', color: '#2F80ED' },
  approved:        { label: 'Approved',         bg: '#ECFDF5', color: '#10b981' },
  rejected:        { label: 'Rejected',         bg: '#FEE2E2', color: '#ef4444' },
};

export default function ApprovalsPage() {
  const [leaves, setLeaves]         = useState<LeaveRequest[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [actioningId, setActioningId] = useState<number | null>(null);
  const [filter, setFilter]         = useState<'all' | 'pending_hr' | 'pending_manager' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    setLoading(true);
    leaveApi.allLeaves()
      .then((d) => setLeaves(d.leaves))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAction(id: number, action: 'approved' | 'rejected') {
    setActioningId(id);
    try {
      await leaveApi.hrAction(id, action);
      setLeaves((prev) => prev.map((l) => l.id === id ? { ...l, status: action } : l));
    } catch (err: any) {
      alert(err.message || 'Action failed');
    } finally {
      setActioningId(null);
    }
  }

  const filtered    = filter === 'all' ? leaves : leaves.filter((l) => l.status === filter);
  const pendingHR   = leaves.filter((l) => l.status === 'pending_hr').length;
  const pendingMgr  = leaves.filter((l) => l.status === 'pending_manager').length;
  const approved    = leaves.filter((l) => l.status === 'approved').length;
  const rejected    = leaves.filter((l) => l.status === 'rejected').length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--hris-text)' }}>Approvals</h1>
        <p style={{ fontSize: '13px', color: 'var(--hris-muted)', marginTop: '4px' }}>
          Review and action all pending leave requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending HR',      value: pendingHR,  color: '#2F80ED', bg: '#EFF6FF', border: 'rgba(47,128,237,0.2)' },
          { label: 'Pending Manager', value: pendingMgr, color: '#F59E0B', bg: '#FEF3C7', border: 'rgba(245,158,11,0.2)'  },
          { label: 'Approved',        value: approved,   color: '#10b981', bg: '#ECFDF5', border: 'rgba(16,185,129,0.2)'  },
          { label: 'Rejected',        value: rejected,   color: '#ef4444', bg: '#FEE2E2', border: 'rgba(239,68,68,0.2)'   },
        ].map(({ label, value, color, bg, border }) => (
          <div
            key={label}
            className="rounded-[14px] p-5 border-[1.5px] cursor-pointer transition-all"
            style={{ background: bg, borderColor: border }}
            onClick={() => setFilter(label.toLowerCase().replace(' ', '_') as any)}
          >
            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{loading ? '…' : value}</div>
            <div style={{ fontSize: '12px', color: 'var(--hris-muted)', marginTop: '4px', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        <Filter className="w-4 h-4 self-center" style={{ color: 'var(--hris-muted)' }} />
        {([
          { key: 'all',             label: 'All Requests'    },
          { key: 'pending_hr',      label: 'Pending HR'      },
          { key: 'pending_manager', label: 'Pending Manager' },
          { key: 'approved',        label: 'Approved'        },
          { key: 'rejected',        label: 'Rejected'        },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border-[1.5px]"
            style={{
              background: filter === key ? 'var(--hris-primary)' : '#FFFFFF',
              color: filter === key ? '#FFFFFF' : 'var(--hris-primary)',
              borderColor: 'var(--hris-primary)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Leave List */}
      <div
        className="rounded-[18px] border-[1.5px] overflow-hidden"
        style={{ background: '#FFFFFF', borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
      >
        <div
          className="h-[3px]"
          style={{ background: 'linear-gradient(90deg, var(--hris-primary), var(--hris-gradient-to))' }}
        />

        {loading && (
          <div className="flex items-center justify-center h-40" style={{ color: 'var(--hris-muted)', fontSize: '13px' }}>
            <Loader2 size={18} className="animate-spin mr-2" /> Loading requests…
          </div>
        )}

        {error && (
          <div className="m-5 rounded-[10px] px-4 py-3 bg-red-50 border border-red-200 text-red-700" style={{ fontSize: '12px' }}>
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40" style={{ color: 'var(--hris-muted)', fontSize: '13px' }}>
            <CheckCircle2 size={28} className="mb-2 opacity-30" />
            No requests match this filter.
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div>
            {/* Table Header */}
            <div
              className="grid px-5 py-3 border-b"
              style={{ gridTemplateColumns: '2.5fr 2fr 1fr 1fr', borderColor: 'var(--hris-border)', background: 'var(--hris-surface2)' }}
            >
              {['Employee', 'Leave Details', 'Status', 'Actions'].map((h) => (
                <div key={h} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--hris-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {h}
                </div>
              ))}
            </div>

            {filtered.map((leave, idx) => {
              const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
              const isActioning = actioningId === leave.id;
              const isPending   = leave.status === 'pending_hr';
              const s           = statusMap[leave.status] || statusMap.pending_hr;

              return (
                <div
                  key={leave.id}
                  className="grid px-5 py-3.5 border-b last:border-b-0 items-center transition-colors"
                  style={{ gridTemplateColumns: '2.5fr 2fr 1fr 1fr', borderColor: 'var(--hris-border)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hris-primary-light)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  {/* Employee */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                      style={{ background: `${avatarColor}18`, color: avatarColor, fontWeight: 700, fontSize: '12px' }}
                    >
                      {getInitials(leave.employee_name || '?')}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text)' }}>{leave.employee_name}</div>
                      {leave.manager_name && (
                        <div style={{ fontSize: '11px', color: 'var(--hris-muted)' }}>Mgr: {leave.manager_name}</div>
                      )}
                    </div>
                  </div>

                  {/* Leave Details */}
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--hris-text2)' }}>{formatMeta(leave)}</div>
                    {leave.reason && (
                      <div style={{ fontSize: '11px', color: 'var(--hris-muted)', marginTop: '2px' }} className="truncate max-w-xs">
                        "{leave.reason}"
                      </div>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      className="px-2.5 py-1 rounded-[8px] whitespace-nowrap"
                      style={{ background: s.bg, color: s.color, fontSize: '11px', fontWeight: 700 }}
                    >
                      {s.label}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5">
                    {isPending ? (
                      <>
                        <button
                          onClick={() => handleAction(leave.id, 'approved')}
                          disabled={isActioning}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-[1.5px] transition-all text-xs font-semibold disabled:opacity-50"
                          style={{ borderColor: 'rgba(16,185,129,0.3)', color: 'var(--hris-success)', background: 'transparent' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hris-success)'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--hris-success)'; }}
                        >
                          {isActioning ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" strokeWidth={2.5} />}
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(leave.id, 'rejected')}
                          disabled={isActioning}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-[1.5px] transition-all text-xs font-semibold disabled:opacity-50"
                          style={{ borderColor: 'rgba(239,68,68,0.3)', color: 'var(--hris-danger)', background: 'transparent' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hris-danger)'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--hris-danger)'; }}
                        >
                          <X className="w-3 h-3" strokeWidth={2.5} />
                          Reject
                        </button>
                      </>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--hris-muted)' }}>—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
