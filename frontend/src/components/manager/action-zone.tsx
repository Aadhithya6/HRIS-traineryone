import { useState, useEffect } from 'react';
import { Check, X, Users, Flame, UserCheck, BarChart3, Lightbulb, UserX, Clock, Home, Loader2 } from 'lucide-react';
import { leaveApi, LeaveRequest } from '../../api/client';

export function ActionZone() {
  const [approvals, setApprovals]     = useState<LeaveRequest[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [actioningId, setActioningId] = useState<number | null>(null);

  useEffect(() => {
    leaveApi.teamLeaves()
      .then((d) => setApprovals(d.leaves))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAction(id: number, action: 'approved' | 'rejected') {
    setActioningId(id);
    try {
      await leaveApi.managerAction(id, action);
      setApprovals((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert(err.message || 'Action failed');
    } finally {
      setActioningId(null);
    }
  }

  const teamAvailability = [
    { name: 'Rahul K',  status: 'present', icon: UserCheck },
    { name: 'Priya S',  status: 'present', icon: UserCheck },
    { name: 'Arun M',   status: 'absent',  icon: UserX     },
    { name: 'Meena V',  status: 'wfh',     icon: Home      },
    { name: 'Dev K',    status: 'late',    icon: Clock     },
    { name: 'Sita R',   status: 'present', icon: UserCheck },
    { name: 'Karan B',  status: 'present', icon: UserCheck },
    { name: 'Nisha P',  status: 'wfh',     icon: Home      },
    { name: 'Vijay L',  status: 'absent',  icon: UserX     },
    { name: 'Anjali D', status: 'present', icon: UserCheck },
  ];

  function getInitials(name: string) {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  }

  return (
    <div className="mb-9">
      <div className="flex items-center gap-2.5 mb-4 text-[11px] tracking-[0.1em] text-[#9CA3AF] uppercase font-[600]">
        <span className="bg-[#2F80ED] text-white px-2.5 py-1 rounded-[8px] text-[11px] font-[700] tracking-[0.06em] flex items-center gap-1.5">
          <Flame size={14} /> ACTION ZONE
        </span>
        <span>High Priority · Daily Execution</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      {/* Leave Approvals */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-[15px] font-[700] text-[#111827]">
            <UserCheck size={18} className="text-[#4B5563]" />
            Leave Approvals
            {!loading && approvals.length > 0 && (
              <span className="ml-1 text-[12px] font-[700] bg-[#EB5757] text-white px-2 py-0.5 rounded-full">{approvals.length}</span>
            )}
          </div>
          <a className="text-[12px] text-[#2F80ED] cursor-pointer hover:underline font-[600]">View All</a>
        </div>

        {loading && (
          <div className="flex items-center justify-center h-28 text-[#9CA3AF]">
            <Loader2 size={18} className="animate-spin mr-2" /> Loading team requests…
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[12px] px-4 py-3">{error}</div>
        )}
        {!loading && !error && approvals.length === 0 && (
          <div className="flex flex-col items-center justify-center h-28 text-[#9CA3AF] text-[13px] gap-2">
            <UserCheck size={24} className="opacity-30" />
            No pending leave approvals.
          </div>
        )}

        {!loading && approvals.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {approvals.map((approval) => (
              <div key={approval.id} className="bg-white border border-[#E5E7EB] rounded-[16px] p-4 transition-all hover:border-[#2F80ED] hover:shadow-md" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[14px] font-[700] flex-shrink-0" style={{ background: '#2F80ED15', color: '#2F80ED' }}>
                    {getInitials(approval.employee_name || '')}
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-[700] text-[#111827] mb-1">{approval.employee_name}</div>
                    <div className="text-[12px] text-[#9CA3AF] font-[500] uppercase">
                      {approval.leave_type} · {formatDate(approval.start_date)}{approval.total_days > 1 ? ` – ${formatDate(approval.end_date)}` : ''} · {approval.total_days}d
                    </div>
                  </div>
                </div>
                {approval.reason && (
                  <div className="text-[11px] text-[#4B5563] bg-[#F9FAFB] rounded-[8px] px-3 py-2 mb-3">{approval.reason}</div>
                )}
                <div className="flex gap-2">
                  <button onClick={() => handleAction(approval.id, 'approved')} disabled={actioningId === approval.id}
                    className="flex-1 bg-[#27AE60] text-white border-0 rounded-[10px] px-4 py-2.5 text-[13px] font-[700] hover:bg-[#229954] transition-all flex items-center justify-center gap-1.5 disabled:opacity-60">
                    {actioningId === approval.id ? <Loader2 size={14} className="animate-spin" /> : <Check size={16} />} Approve
                  </button>
                  <button onClick={() => handleAction(approval.id, 'rejected')} disabled={actioningId === approval.id}
                    className="bg-white text-[#EB5757] border-2 border-[#EB5757] rounded-[10px] px-3 py-2.5 text-[13px] font-[700] hover:bg-[#FEF2F2] transition-all disabled:opacity-60">
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Row 2: Availability + Workload */}
      <div className="grid grid-cols-2 gap-4">
        <Card title="Today's Availability" icon={Users} action="Full View">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4 text-[11px] font-[600]">
              <span className="text-[#27AE60]">● Present 11</span>
              <span className="text-[#EB5757]">● Absent 2</span>
              <span className="text-[#F59E0B]">● Late 1</span>
              <span className="text-[#2F80ED]">● WFH 2</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {teamAvailability.map((p, idx) => <AvailabilityCard key={idx} {...p} />)}
          </div>
        </Card>

        <Card title="Team Workload Distribution" icon={BarChart3} action="Reassign">
          <WorkloadItem name="Rahul K." percentage={95} color="#EB5757" tag="OVERLOADED" tagStyle="over" />
          <WorkloadItem name="Karan B." percentage={85} color="#F59E0B" tag="HIGH"       tagStyle="warn" />
          <WorkloadItem name="Priya S." percentage={70} color="#27AE60" tag="OPTIMAL"    tagStyle="ok"   />
          <WorkloadItem name="Meena V." percentage={60} color="#27AE60" tag="OPTIMAL"    tagStyle="ok"   />
          <WorkloadItem name="Dev K."   percentage={25} color="#9CA3AF" tag="IDLE"       tagStyle="idle" />
          <WorkloadItem name="Sita R."  percentage={15} color="#9CA3AF" tag="IDLE"       tagStyle="idle" />
          <div className="mt-3 p-2.5 bg-[#FEF3C7] border border-[#FDE68A] rounded-[10px] text-[11px] text-[#111827] font-[500] flex items-start gap-2">
            <Lightbulb size={14} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
            Recommend reassigning 2 tasks from Rahul K → Dev K / Sita R
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, icon: Icon, action, children }: any) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-4 transition-all duration-200 hover:shadow-md" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-[15px] font-[700] text-[#111827]">
          {Icon && <Icon size={18} className="text-[#4B5563]" />}
          {title}
        </div>
        <a className="text-[12px] text-[#2F80ED] cursor-pointer hover:underline font-[600]">{action}</a>
      </div>
      {children}
    </div>
  );
}

function AvailabilityCard({ name, status, icon: Icon }: any) {
  const styles: Record<string, any> = {
    present: { bg: '#ECFDF5', border: '#A7F3D0', color: '#27AE60', text: 'Present' },
    absent:  { bg: '#FEE2E2', border: '#FCA5A5', color: '#EB5757', text: 'Absent'  },
    late:    { bg: '#FEF3C7', border: '#FDE68A', color: '#F59E0B', text: 'Late'    },
    wfh:     { bg: '#EFF6FF', border: '#BFDBFE', color: '#2F80ED', text: 'WFH'     },
  };
  const s = styles[status] || styles.present;
  return (
    <div className="aspect-square rounded-[12px] flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-105 border p-2"
      style={{ background: s.bg, borderColor: s.border }}>
      <Icon size={18} style={{ color: s.color }} strokeWidth={2.5} />
      <div className="text-[11px] font-[700] leading-tight text-[#111827] text-center">{name}</div>
      <div className="text-[9px] font-[600]" style={{ color: s.color }}>{s.text}</div>
    </div>
  );
}

function WorkloadItem({ name, percentage, color, tag, tagStyle }: any) {
  const [width, setWidth] = useState(0);
  useEffect(() => { setTimeout(() => setWidth(percentage), 300); }, [percentage]);
  const tagStyles: Record<string, string> = {
    over: 'bg-[#FEE2E2] text-[#EB5757]',
    warn: 'bg-[#FEF3C7] text-[#F59E0B]',
    ok:   'bg-[#ECFDF5] text-[#27AE60]',
    idle: 'bg-[#F3F4F6] text-[#9CA3AF]',
  };
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="text-[13px] w-[75px] flex-shrink-0 text-[#111827] font-[600]">{name}</div>
      <div className="flex-1 h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-[800ms]" style={{ width: `${width}%`, background: color }} />
      </div>
      <div className="text-[14px] w-[40px] text-right flex-shrink-0 font-[700]" style={{ color }}>{percentage}%</div>
      <div className={`text-[10px] px-2 py-1 rounded-[6px] flex-shrink-0 font-[700] uppercase ${tagStyles[tagStyle]}`}>{tag}</div>
    </div>
  );
}
