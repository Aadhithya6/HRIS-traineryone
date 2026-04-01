import { useEffect, useState } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { leaveApi, LeaveRequest } from '../../api/client';

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

function formatMeta(leave: LeaveRequest) {
  const type = leave.leave_type.charAt(0).toUpperCase() + leave.leave_type.slice(1);
  const start = new Date(leave.start_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  const end   = new Date(leave.end_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  return `${type} Leave · ${start}${leave.total_days > 1 ? `–${end}` : ''} (${leave.total_days} ${leave.total_days === 1 ? 'day' : 'days'})`;
}

const AVATAR_COLORS = ['#10b981', '#f59e0b', '#4f6ef7', '#ef4444', '#38bdf8', '#a855f7'];

export function PendingApprovals() {
  const [leaves, setLeaves]           = useState<LeaveRequest[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [actioningId, setActioningId] = useState<number | null>(null);

  useEffect(() => {
    leaveApi.allLeaves()
      .then((d) => setLeaves(d.leaves))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAction(id: number, action: 'approved' | 'rejected') {
    setActioningId(id);
    try {
      await leaveApi.hrAction(id, action);
      setLeaves((prev) => prev.filter((l) => l.id !== id));
    } catch (err: any) {
      alert(err.message || 'Action failed');
    } finally {
      setActioningId(null);
    }
  }

  return (
    <div
      className="relative rounded-[18px] p-5 border-[1.5px] overflow-hidden"
      style={{ background: '#FFFFFF', borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[18px]"
        style={{ background: 'linear-gradient(90deg, var(--hris-primary), var(--hris-gradient-to))' }}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)', letterSpacing: '-0.1px' }}>
            Pending Approvals
          </span>
          <span
            className="inline-flex items-center justify-center rounded-[10px] min-w-[20px] h-5 px-1"
            style={{ background: 'var(--hris-danger)', color: '#fff', fontSize: '10px', fontWeight: 700 }}
          >
            {loading ? '…' : leaves.length}
          </span>
        </div>
        <a
          href="#"
          className="px-2.5 py-1 rounded-lg border-[1.5px] transition-all"
          style={{ fontSize: '12px', fontWeight: 600, color: 'var(--hris-primary)', borderColor: 'rgba(47,128,237,0.25)', background: 'rgba(47,128,237,0.04)', textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(47,128,237,0.1)'; e.currentTarget.style.borderColor = 'var(--hris-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(47,128,237,0.04)'; e.currentTarget.style.borderColor = 'rgba(47,128,237,0.25)'; }}
        >
          Review All →
        </a>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-32 text-[#9CA3AF]" style={{ fontSize: '13px' }}>
          <Loader2 size={16} className="animate-spin mr-2" /> Loading approvals…
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-[10px] px-4 py-3" style={{ fontSize: '12px' }}>
          {error}
        </div>
      )}

      {!loading && !error && leaves.length === 0 && (
        <div className="flex flex-col items-center justify-center h-32 text-[#9CA3AF]" style={{ fontSize: '13px' }}>
          <Check size={24} className="mb-2 opacity-30" />
          All caught up! No pending HR approvals.
        </div>
      )}

      {!loading && !error && leaves.length > 0 && (
        <div>
          {leaves.map((leave, idx) => {
            const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
            const isActioning = actioningId === leave.id;

            return (
              <div
                key={leave.id}
                className="flex items-center gap-3 py-3 border-b last:border-b-0 rounded-lg transition-all"
                style={{ borderColor: 'var(--hris-border)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hris-primary-light)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                  style={{ background: `${avatarColor}18`, color: avatarColor, fontWeight: 700, fontSize: '12px' }}
                >
                  {getInitials(leave.employee_name || '')}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="truncate" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text)' }}>
                    {leave.employee_name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--hris-muted)', marginTop: '2px' }}>
                    {formatMeta(leave)}
                  </div>
                  {leave.manager_name && (
                    <div style={{ fontSize: '10px', color: 'var(--hris-muted)', marginTop: '1px' }}>
                      Approved by: {leave.manager_name}
                    </div>
                  )}
                </div>

                <span
                  className="px-2 py-0.5 rounded-md whitespace-nowrap shrink-0"
                  style={{ background: 'rgba(56,189,248,0.1)', color: '#0ea5e9', fontSize: '11px', fontWeight: 600 }}
                >
                  Leave
                </span>

                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => handleAction(leave.id, 'approved')}
                    disabled={isActioning}
                    className="w-[30px] h-[30px] rounded-lg border-[1.5px] flex items-center justify-center transition-all disabled:opacity-50"
                    style={{ borderColor: 'rgba(39,174,96,0.3)', color: 'var(--hris-success)', background: 'transparent' }}
                    onMouseEnter={(e) => {
                      if (!isActioning) {
                        e.currentTarget.style.background = 'var(--hris-success)';
                        e.currentTarget.style.borderColor = 'var(--hris-success)';
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(39,174,96,0.3)';
                      e.currentTarget.style.color = 'var(--hris-success)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {isActioning
                      ? <Loader2 className="w-[11px] h-[11px] animate-spin" />
                      : <Check className="w-[13px] h-[13px]" strokeWidth={2.5} />
                    }
                  </button>
                  <button
                    onClick={() => handleAction(leave.id, 'rejected')}
                    disabled={isActioning}
                    className="w-[30px] h-[30px] rounded-lg border-[1.5px] flex items-center justify-center transition-all disabled:opacity-50"
                    style={{ borderColor: 'rgba(235,87,87,0.3)', color: 'var(--hris-danger)', background: 'transparent' }}
                    onMouseEnter={(e) => {
                      if (!isActioning) {
                        e.currentTarget.style.background = 'var(--hris-danger)';
                        e.currentTarget.style.borderColor = 'var(--hris-danger)';
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(235,87,87,0.3)';
                      e.currentTarget.style.color = 'var(--hris-danger)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <X className="w-[13px] h-[13px]" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
