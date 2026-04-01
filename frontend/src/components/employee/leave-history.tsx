import { useEffect, useState } from 'react';
import { Clock, CheckCircle2, XCircle, Loader2, Umbrella } from 'lucide-react';
import { leaveApi, LeaveRequest } from '../../api/client';

function StatusBadge({ status }: { status: LeaveRequest['status'] }) {
  const map = {
    pending_manager: { label: 'Pending Manager', color: '#F59E0B', bg: '#FEF3C7' },
    pending_hr:      { label: 'Pending HR',      color: '#2F80ED', bg: '#EFF6FF' },
    approved:        { label: 'Approved',         color: '#27AE60', bg: '#ECFDF5' },
    rejected:        { label: 'Rejected',         color: '#EB5757', bg: '#FEE2E2' },
  };
  const s = map[status] || map.pending_manager;
  return (
    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: s.color, background: s.bg }}>
      {s.label}
    </span>
  );
}

export function LeaveHistory({ refreshKey }: { refreshKey?: number }) {
  const [leaves, setLeaves]   = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    setLoading(true);
    leaveApi.myLeaves()
      .then((d) => setLeaves(d.leaves))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) return (
    <div className="flex items-center justify-center h-32 text-muted-foreground">
      <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading leave history…
    </div>
  );

  if (error) return (
    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</div>
  );

  if (leaves.length === 0) return (
    <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
      <Umbrella className="w-8 h-8 opacity-30" />
      <p className="text-sm">No leave requests yet.</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      {leaves.map((leave) => (
        <div key={leave.id} className="flex items-start justify-between p-4 bg-white border border-border rounded-xl hover:shadow-md transition-all">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold capitalize">{leave.leave_type} Leave</span>
              <StatusBadge status={leave.status} />
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {new Date(leave.start_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              {' – '}
              {new Date(leave.end_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              <span className="font-semibold text-foreground">({leave.total_days}d)</span>
            </div>
            {leave.reason && <p className="text-xs text-muted-foreground mt-0.5">{leave.reason}</p>}
          </div>
          {leave.status === 'approved' && <CheckCircle2 className="w-5 h-5 text-[#27AE60] flex-shrink-0 mt-0.5" />}
          {leave.status === 'rejected'  && <XCircle className="w-5 h-5 text-[#EB5757] flex-shrink-0 mt-0.5" />}
        </div>
      ))}
    </div>
  );
}
