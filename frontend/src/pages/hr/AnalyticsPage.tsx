import { TrendingUp, TrendingDown, Users, Umbrella, DollarSign, UserCheck } from 'lucide-react';

const monthlyHeadcount = [
  { month: 'Oct', count: 498 }, { month: 'Nov', count: 503 }, { month: 'Dec', count: 505 },
  { month: 'Jan', count: 508 }, { month: 'Feb', count: 510 }, { month: 'Mar', count: 512 },
];

const leaveByDept = [
  { dept: 'Engineering', days: 142, color: '#2F80ED' },
  { dept: 'Design',      days: 48,  color: '#a855f7' },
  { dept: 'Product',     days: 39,  color: '#10b981' },
  { dept: 'Analytics',   days: 55,  color: '#F59E0B' },
  { dept: 'HR',          days: 22,  color: '#ef4444' },
  { dept: 'Finance',     days: 31,  color: '#38bdf8' },
];

const attritionData = [
  { month: 'Oct', joined: 8,  left: 3  }, { month: 'Nov', joined: 5,  left: 2  },
  { month: 'Dec', joined: 12, left: 4  }, { month: 'Jan', joined: 9,  left: 5  },
  { month: 'Feb', joined: 7,  left: 3  }, { month: 'Mar', joined: 9,  left: 4  },
];

const kpis = [
  { label: 'Attrition Rate',     value: '3.2%',  change: '-0.4%', up: false, icon: TrendingDown, color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
  { label: 'Avg Tenure',         value: '2.4 yr', change: '+0.2', up: true,  icon: TrendingUp,   color: '#2F80ED', bg: 'rgba(47,128,237,0.08)',  border: 'rgba(47,128,237,0.2)'  },
  { label: 'Offer Acceptance',   value: '78%',   change: '+5%',  up: true,  icon: UserCheck,    color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)' },
  { label: 'Payroll Cost/Head',  value: '₹24.2K',change: '+1.2K', up: false, icon: DollarSign,  color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)'  },
];

export default function AnalyticsPage() {
  const maxCount = Math.max(...monthlyHeadcount.map((m) => m.count));
  const minCount = Math.min(...monthlyHeadcount.map((m) => m.count));
  const maxLeave = Math.max(...leaveByDept.map((d) => d.days));
  const maxJoined = Math.max(...attritionData.map((d) => Math.max(d.joined, d.left)));

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--hris-text)' }}>Analytics</h1>
        <p style={{ fontSize: '13px', color: 'var(--hris-muted)', marginTop: '4px' }}>Workforce insights and trends</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map(({ label, value, change, up, icon: Icon, color, bg, border }) => (
          <div key={label} className="rounded-[14px] p-5 border-[1.5px]" style={{ background: bg, borderColor: border }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: color, color: '#fff' }}>
                <Icon className="w-4 h-4" />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: up ? '#ef4444' : '#10b981', background: up ? '#FEE2E2' : '#ECFDF5', padding: '2px 8px', borderRadius: '20px' }}>
                {change}
              </span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '12px', color: 'var(--hris-muted)', marginTop: '4px', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Headcount Trend + Leave by Dept */}
      <div className="grid grid-cols-[1.2fr_1fr] gap-5">
        {/* Headcount Line Chart */}
        <div className="rounded-[18px] border-[1.5px] p-5 bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)', marginBottom: '4px' }}>Headcount Trend</div>
          <div style={{ fontSize: '12px', color: 'var(--hris-muted)', marginBottom: '16px' }}>Oct 2025 – Mar 2026</div>

          {/* Simple bar chart */}
          <div className="flex items-end gap-2" style={{ height: '120px' }}>
            {monthlyHeadcount.map(({ month, count }) => {
              const h = ((count - minCount + 2) / (maxCount - minCount + 4)) * 100;
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-1">
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--hris-primary)' }}>{count}</div>
                  <div className="w-full rounded-t-[6px]" style={{ height: `${h}%`, background: 'var(--hris-primary)', opacity: 0.85 }} />
                  <div style={{ fontSize: '10px', color: 'var(--hris-muted)', fontWeight: 600 }}>{month}</div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: 'var(--hris-border)' }}>
            <span style={{ fontSize: '12px', color: 'var(--hris-muted)' }}>Total Employees</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" style={{ color: '#10b981' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>+14 in 6 months</span>
            </div>
          </div>
        </div>

        {/* Leave by Department */}
        <div className="rounded-[18px] border-[1.5px] p-5 bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)', marginBottom: '4px' }}>Leave by Department</div>
          <div style={{ fontSize: '12px', color: 'var(--hris-muted)', marginBottom: '16px' }}>Total days taken — Mar 2026</div>
          <div className="flex flex-col gap-3">
            {leaveByDept.map(({ dept, days, color }) => (
              <div key={dept}>
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--hris-text)' }}>{dept}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color }}>{days} days</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'var(--hris-border)' }}>
                  <div className="h-full rounded-full" style={{ width: `${(days / maxLeave) * 100}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attrition / Joining Chart */}
      <div className="rounded-[18px] border-[1.5px] p-5 bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)' }}>Joining vs Attrition</div>
            <div style={{ fontSize: '12px', color: 'var(--hris-muted)' }}>Oct 2025 – Mar 2026</div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#10b981]" /><span style={{ fontSize: '12px', color: 'var(--hris-muted)' }}>Joined</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ef4444]" /><span style={{ fontSize: '12px', color: 'var(--hris-muted)' }}>Left</span></div>
          </div>
        </div>
        <div className="flex items-end gap-4" style={{ height: '100px' }}>
          {attritionData.map(({ month, joined, left }) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex items-end gap-1 w-full justify-center" style={{ height: '80px' }}>
                <div
                  className="rounded-t-[4px]"
                  style={{ width: '40%', height: `${(joined / maxJoined) * 100}%`, background: '#10b981', minHeight: '4px' }}
                />
                <div
                  className="rounded-t-[4px]"
                  style={{ width: '40%', height: `${(left / maxJoined) * 100}%`, background: '#ef4444', minHeight: '4px' }}
                />
              </div>
              <div style={{ fontSize: '10px', color: 'var(--hris-muted)', fontWeight: 600 }}>{month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Workforce Demographics */}
      <div className="grid grid-cols-2 gap-4">
        {/* By Department */}
        <div className="rounded-[18px] border-[1.5px] p-5 bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)', marginBottom: '12px' }}>
            <Users className="w-4 h-4 inline mr-1.5" style={{ color: 'var(--hris-primary)' }} />
            Headcount by Department
          </div>
          {[
            { dept: 'Engineering', count: 180, pct: 35.2, color: '#2F80ED' },
            { dept: 'Marketing',   count: 62,  pct: 12.1, color: '#F59E0B' },
            { dept: 'Analytics',   count: 55,  pct: 10.7, color: '#a855f7' },
            { dept: 'Finance',     count: 45,  pct:  8.8, color: '#38bdf8' },
            { dept: 'Product',     count: 42,  pct:  8.2, color: '#10b981' },
            { dept: 'Operations',  count: 60,  pct: 11.7, color: '#ef4444' },
          ].map(({ dept, count, pct, color }) => (
            <div key={dept} className="flex items-center gap-3 mb-2">
              <span style={{ fontSize: '12px', color: 'var(--hris-text2)', width: '90px', flexShrink: 0 }}>{dept}</span>
              <div className="flex-1 h-2 rounded-full" style={{ background: 'var(--hris-border)' }}>
                <div className="h-full rounded-full" style={{ width: `${pct * 2.5}%`, background: color }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color, width: '28px', textAlign: 'right' }}>{count}</span>
            </div>
          ))}
        </div>

        {/* Leave Breakdown Pie-like */}
        <div className="rounded-[18px] border-[1.5px] p-5 bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)', marginBottom: '12px' }}>
            <Umbrella className="w-4 h-4 inline mr-1.5" style={{ color: '#F59E0B' }} />
            Leave Type Distribution
          </div>
          {[
            { type: 'Casual Leave', days: 187, pct: 46, color: '#2F80ED' },
            { type: 'Sick Leave',   days: 98,  pct: 24, color: '#ef4444' },
            { type: 'Earned Leave', days: 121, pct: 30, color: '#10b981' },
          ].map(({ type, days, pct, color }) => (
            <div key={type} className="mb-4">
              <div className="flex justify-between mb-1">
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--hris-text)' }}>{type}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color }}>{days} days · {pct}%</span>
              </div>
              <div className="h-3 rounded-full" style={{ background: 'var(--hris-border)' }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
              </div>
            </div>
          ))}
          <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--hris-border)' }}>
            <div style={{ fontSize: '12px', color: 'var(--hris-muted)' }}>Total leave days taken: <strong style={{ color: 'var(--hris-text)' }}>406 days</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
