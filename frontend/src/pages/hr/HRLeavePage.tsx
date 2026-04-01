import { useEffect, useState } from 'react';
import { Loader2, Umbrella, Check, X, Filter } from 'lucide-react';
import { leaveApi, LeaveRequest } from '../../api/client';
import { useNavigate } from 'react-router';

const AVATAR_COLORS = ['#10b981', '#f59e0b', '#4f6ef7', '#ef4444', '#38bdf8', '#a855f7'];

const statusMap = {
  pending_manager: { label: 'Pending Manager', bg: '#FEF3C7', color: '#F59E0B' },
  pending_hr:      { label: 'Pending HR',      bg: '#EFF6FF', color: '#2F80ED' },
  approved:        { label: 'Approved',         bg: '#ECFDF5', color: '#10b981' },
  rejected:        { label: 'Rejected',         bg: '#FEE2E2', color: '#ef4444' },
};

export default function HRLeavePage() {
  const navigate = useNavigate();
  const [leaves, setLeaves]   = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [filter, setFilter]   = useState<string>('all');

  useEffect(() => {
    leaveApi.allLeaves()
      .then((d) => setLeaves(d.leaves))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? leaves : leaves.filter((l) => l.status === filter);
  const byType   = { casual: 0, sick: 0, earned: 0 };
  leaves.forEach((l) => { if (l.leave_type in byType) byType[l.leave_type as keyof typeof byType]++; });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--hris-text)' }}>Leave Management</h1>
          <p style={{ fontSize: '13px', color: 'var(--hris-muted)', marginTop: '4px' }}>All employee leave requests across the company</p>
        </div>
        <button
          onClick={() => navigate('/hr/approvals')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold transition-all"
          style={{ background: 'var(--hris-primary)', fontSize: '13px', boxShadow: '0 4px 14px rgba(47,128,237,0.3)' }}
        >
          <Check className="w-4 h-4" />
          Go to Approvals
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: leaves.length, color: 'var(--hris-primary)', bg: 'rgba(47,128,237,0.08)', border: 'rgba(47,128,237,0.15)' },
          { label: 'Pending',        value: leaves.filter((l) => l.status.startsWith('pending')).length, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.15)' },
          { label: 'Approved',       value: leaves.filter((l) => l.status === 'approved').length,        color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.15)' },
          { label: 'Rejected',       value: leaves.filter((l) => l.status === 'rejected').length,        color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.15)'  },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className="rounded-[14px] p-5 border-[1.5px]" style={{ background: bg, borderColor: border }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{loading ? '…' : value}</div>
            <div style={{ fontSize: '12px', color: 'var(--hris-muted)', marginTop: '4px', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Leave Type Breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { type: 'Casual Leave',  count: byType.casual,  color: '#2F80ED', bg: 'rgba(47,128,237,0.08)'  },
          { type: 'Sick Leave',    count: byType.sick,    color: '#ef4444', bg: 'rgba(239,68,68,0.08)'   },
          { type: 'Earned Leave',  count: byType.earned,  color: '#10b981', bg: 'rgba(16,185,129,0.08)'  },
        ].map(({ type, count, color, bg }) => (
          <div key={type} className="rounded-[14px] p-4 bg-white border-[1.5px] flex items-center gap-3" style={{ borderColor: 'var(--hris-border)' }}>
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: bg }}>
              <Umbrella className="w-5 h-5" style={{ color }} />
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color }}>{loading ? '…' : count}</div>
              <div style={{ fontSize: '11px', color: 'var(--hris-muted)', fontWeight: 600 }}>{type}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap items-center">
        <Filter className="w-4 h-4" style={{ color: 'var(--hris-muted)' }} />
        {[
          { key: 'all',             label: 'All'              },
          { key: 'pending_hr',      label: 'Pending HR'       },
          { key: 'pending_manager', label: 'Pending Manager'  },
          { key: 'approved',        label: 'Approved'         },
          { key: 'rejected',        label: 'Rejected'         },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border-[1.5px]"
            style={{
              background: filter === key ? 'var(--hris-primary)' : '#FFFFFF',
              color: filter === key ? '#FFFFFF' : 'var(--hris-primary)',
              borderColor: 'var(--hris-primary)',
              fontSize: '12px',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Leave Table */}
      <div className="rounded-[18px] border-[1.5px] overflow-hidden bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, var(--hris-primary), var(--hris-gradient-to))' }} />

        {loading && (
          <div className="flex items-center justify-center h-32" style={{ color: 'var(--hris-muted)', fontSize: '13px' }}>
            <Loader2 className="animate-spin mr-2" size={16} /> Loading…
          </div>
        )}
        {error && (
          <div className="m-5 rounded-[10px] px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-xs">{error}</div>
        )}
        {!loading && !error && (
          <>
            <div className="grid px-5 py-3 border-b" style={{ gridTemplateColumns: '2fr 1.5fr 2fr 1fr 1fr', borderColor: 'var(--hris-border)', background: 'var(--hris-surface2)' }}>
              {['Employee', 'Leave Type', 'Dates', 'Days', 'Status'].map((h) => (
                <div key={h} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--hris-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
              ))}
            </div>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-28" style={{ color: 'var(--hris-muted)', fontSize: '13px' }}>
                <X className="w-6 h-6 mb-2 opacity-20" /> No records match this filter.
              </div>
            ) : (
              filtered.map((leave, idx) => {
                const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
                const s = statusMap[leave.status as keyof typeof statusMap] || statusMap.pending_hr;
                const start = new Date(leave.start_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
                const end   = new Date(leave.end_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
                return (
                  <div
                    key={leave.id}
                    className="grid px-5 py-3.5 border-b last:border-b-0 items-center transition-colors"
                    style={{ gridTemplateColumns: '2fr 1.5fr 2fr 1fr 1fr', borderColor: 'var(--hris-border)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hris-primary-light)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0" style={{ background: `${avatarColor}18`, color: avatarColor, fontWeight: 700, fontSize: '11px' }}>
                        {(leave.employee_name || '?').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text)' }}>{leave.employee_name || '—'}</div>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--hris-text2)', textTransform: 'capitalize' }}>{leave.leave_type} Leave</div>
                    <div style={{ fontSize: '12px', color: 'var(--hris-muted)' }}>{start} – {end}</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)' }}>{leave.total_days}d</div>
                    <div>
                      <span className="px-2.5 py-1 rounded-[8px]" style={{ background: s.bg, color: s.color, fontSize: '11px', fontWeight: 700 }}>{s.label}</span>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
}
