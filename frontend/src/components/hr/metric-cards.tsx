import { Users, CheckCheck, Calendar, UserPlus } from 'lucide-react';

const metrics = [
  {
    label: 'Total Employees',
    value: '512',
    sub: 'Across 8 departments',
    trend: { direction: 'up', text: '↑ 4 this month', color: 'var(--hris-success)' },
    icon: Users,
    iconBg: 'var(--hris-blue-bg)',
    iconColor: 'var(--hris-blue-icon)',
  },
  {
    label: 'Present Today',
    value: '468',
    sub: '91.4% attendance rate',
    showBar: true,
    icon: CheckCheck,
    iconBg: 'var(--hris-green-bg)',
    iconColor: 'var(--hris-green-icon)',
  },
  {
    label: 'On Leave Today',
    value: '27',
    sub: 'Annual 18 · Sick 6 · Other 3',
    trend: { direction: 'warn', text: '↑ 3 more than avg', color: 'var(--hris-warn)' },
    icon: Calendar,
    iconBg: 'var(--hris-yellow-bg)',
    iconColor: 'var(--hris-yellow-icon)',
  },
  {
    label: 'New Joiners',
    value: '9',
    sub: 'Joined this month',
    trend: { direction: 'up', text: '↑ Q1 target met', color: 'var(--hris-success)' },
    icon: UserPlus,
    iconBg: 'var(--hris-purple-bg)',
    iconColor: 'var(--hris-purple-icon)',
  },
];

export function MetricCards() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div
            key={idx}
            className="relative rounded-[18px] p-5 border-[1.5px] overflow-hidden"
            style={{
              background: 'var(--hris-surface)',
              borderColor: 'var(--hris-border)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              animation: `fadeUp 0.4s ease both ${0.05 * (idx + 1)}s`,
            }}
          >
            <div className="mb-4">
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)', letterSpacing: '-0.1px' }}>
                {metric.label}
              </div>
            </div>

            <div
              className="absolute top-5 right-5 w-[42px] h-[42px] rounded-xl flex items-center justify-center"
              style={{ background: metric.iconBg, color: metric.iconColor }}
            >
              <Icon className="w-5 h-5" strokeWidth={2} />
            </div>

            <div style={{ fontSize: '38px', fontWeight: 800, lineHeight: 1, color: 'var(--hris-text)', marginBottom: '4px', letterSpacing: '-1px' }}>
              {metric.value}
            </div>

            <div style={{ fontSize: '12px', color: 'var(--hris-muted)', marginTop: '2px' }}>
              {metric.sub}
            </div>

            {metric.showBar && (
              <div className="mt-3">
                <div
                  className="h-[7px] rounded-md overflow-hidden flex border"
                  style={{ background: 'var(--hris-surface2)', borderColor: 'var(--hris-border)' }}
                >
                  <div style={{ width: '91%', height: '100%', background: '#10b981' }} />
                  <div style={{ width: '5%', height: '100%', background: '#f59e0b' }} />
                  <div style={{ width: '4%', height: '100%', background: '#ef4444' }} />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span style={{ fontSize: '11px', color: 'var(--hris-muted)', fontWeight: 500 }}>Present 91%</span>
                  <span style={{ fontSize: '11px', color: 'var(--hris-muted)', fontWeight: 500 }}>Leave 5%</span>
                  <span style={{ fontSize: '11px', color: 'var(--hris-muted)', fontWeight: 500 }}>Absent 4%</span>
                </div>
              </div>
            )}

            {metric.trend && (
              <div
                className="inline-flex items-center gap-1 mt-3 px-2 py-1 rounded-md"
                style={{
                  background: `${metric.trend.color}1a`,
                  color: metric.trend.color,
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {metric.trend.text}
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
