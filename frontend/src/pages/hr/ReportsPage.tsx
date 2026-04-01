import { FileText, Download, BarChart3, Users, DollarSign, Umbrella, TrendingUp, Calendar } from 'lucide-react';

const reports = [
  { title: 'Monthly Headcount Report',    icon: Users,      category: 'Workforce',  date: 'Mar 31, 2026', size: '2.4 MB', color: '#2F80ED', bg: 'rgba(47,128,237,0.08)'   },
  { title: 'Payroll Summary — March 2026',icon: DollarSign, category: 'Payroll',   date: 'Mar 31, 2026', size: '1.8 MB', color: '#10b981', bg: 'rgba(16,185,129,0.08)'   },
  { title: 'Leave Utilisation Report',    icon: Umbrella,   category: 'Leave',     date: 'Mar 31, 2026', size: '956 KB', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)'   },
  { title: 'Attendance Summary Q1',       icon: Calendar,   category: 'Attendance',date: 'Mar 31, 2026', size: '3.1 MB', color: '#a855f7', bg: 'rgba(168,85,247,0.08)'   },
  { title: 'Recruitment Pipeline Report', icon: TrendingUp, category: 'Recruitment',date:'Mar 31, 2026', size: '1.2 MB', color: '#ef4444', bg: 'rgba(239,68,68,0.08)'    },
  { title: 'Department Expense Report',   icon: BarChart3,  category: 'Finance',   date: 'Mar 31, 2026', size: '2.0 MB', color: '#38bdf8', bg: 'rgba(56,189,248,0.08)'   },
];

const quickStats = [
  { label: 'Reports Generated',  value: '24',    change: '+3 this month', color: '#2F80ED' },
  { label: 'Total Downloads',     value: '147',   change: '+18 this week',  color: '#10b981' },
  { label: 'Scheduled Reports',   value: '6',     change: 'Auto-generated', color: '#F59E0B' },
  { label: 'Compliance Score',    value: '98%',   change: '↑ 2% vs last Q', color: '#a855f7' },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--hris-text)' }}>Reports</h1>
          <p style={{ fontSize: '13px', color: 'var(--hris-muted)', marginTop: '4px' }}>Generate and download HR reports</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold"
          style={{ background: 'var(--hris-primary)', fontSize: '13px', boxShadow: '0 4px 14px rgba(47,128,237,0.3)' }}
        >
          <FileText className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map(({ label, value, change, color }) => (
          <div key={label} className="rounded-[14px] p-5 bg-white border-[1.5px]" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '12px', color: 'var(--hris-text2)', marginTop: '4px', fontWeight: 600 }}>{label}</div>
            <div style={{ fontSize: '11px', color: 'var(--hris-muted)', marginTop: '2px' }}>{change}</div>
          </div>
        ))}
      </div>

      {/* Available Reports */}
      <div className="rounded-[18px] border-[1.5px] overflow-hidden bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, var(--hris-primary), var(--hris-gradient-to))' }} />
        <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--hris-border)' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)' }}>Available Reports</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          {reports.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="flex items-center gap-4 p-4 rounded-[12px] border-[1.5px] transition-all cursor-pointer group"
                style={{ borderColor: 'var(--hris-border)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.background = r.bg; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--hris-border)'; e.currentTarget.style.background = 'transparent'; }}
              >
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: r.bg, color: r.color }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text)' }} className="truncate">{r.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--hris-muted)', marginTop: '2px' }}>
                    {r.category} · {r.date} · {r.size}
                  </div>
                </div>
                <button
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center border-[1.5px] transition-all shrink-0 opacity-0 group-hover:opacity-100"
                  style={{ borderColor: r.color, color: r.color }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = r.color; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = r.color; }}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="rounded-[18px] border-[1.5px] p-5 bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)', marginBottom: '12px' }}>Scheduled Auto-Reports</div>
        <div className="flex flex-col gap-2">
          {[
            { name: 'Monthly Headcount',  schedule: 'Every 1st of month', next: 'May 1, 2026',   status: 'Active'   },
            { name: 'Weekly Leave Summary', schedule: 'Every Monday',      next: 'Apr 7, 2026',   status: 'Active'   },
            { name: 'Payroll Summary',    schedule: 'End of month',        next: 'Apr 30, 2026',  status: 'Active'   },
            { name: 'Quarterly Attrition',schedule: 'Every quarter end',   next: 'Jun 30, 2026',  status: 'Paused'   },
          ].map(({ name, schedule, next, status }) => (
            <div key={name} className="flex items-center justify-between p-3 rounded-[10px] border-[1.5px]" style={{ borderColor: 'var(--hris-border)', background: 'var(--hris-surface2)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text)' }}>{name}</div>
                <div style={{ fontSize: '11px', color: 'var(--hris-muted)', marginTop: '1px' }}>{schedule} · Next: {next}</div>
              </div>
              <span className="px-2.5 py-1 rounded-[8px]" style={{
                background: status === 'Active' ? '#ECFDF5' : '#F3F4F6',
                color: status === 'Active' ? '#10b981' : '#9CA3AF',
                fontSize: '11px', fontWeight: 700,
              }}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
