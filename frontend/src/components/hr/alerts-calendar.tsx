import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';

const alerts = [
  { icon: AlertCircle, type: 'danger', text: '3 employees have missing PAN documents', tag: 'Compliance · Payroll blocked' },
  { icon: AlertTriangle, type: 'warn', text: "Karthik Rajan's contract expires in 12 days", tag: 'Contract Renewal · Engineering' },
  { icon: AlertTriangle, type: 'warn', text: "5 employees haven't completed mandatory training", tag: 'Compliance · Due Apr 10' },
  { icon: Info, type: 'info', text: 'Q1 Performance review cycle starts in 3 days', tag: 'Performance · All Teams' },
  { icon: Info, type: 'info', text: 'New labour law amendment effective from April', tag: 'Policy Update · HR Action needed' },
];

const calendarDays = [
  '', '1', '2', '3', '4', '5', '6',
  '7', '8', '9', '10', '11', '12', '13',
  '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '24', '25', '26', '27',
  '28', '29', '30',
];

const eventDays = ['4', '5', '10'];

const importantDays: Record<string, { title: string; description: string; type: 'danger' | 'warn' }> = {
  '3':  { title: 'Leave Requests',   description: 'Rahul Sharma - Annual Leave starts',       type: 'warn'   },
  '10': { title: 'Training Deadline',description: '5 employees - Mandatory training due',      type: 'danger' },
  '12': { title: 'Contract Expiry',  description: 'Karthik Rajan - Contract expires',          type: 'danger' },
  '30': { title: 'Payroll Deadline', description: 'April payroll processing deadline',         type: 'warn'   },
};

export function AlertsCalendar() {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  return (
    <div
      className="rounded-[18px] p-5 border-[1.5px] overflow-hidden"
      style={{ background: '#FFFFFF', borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)', letterSpacing: '-0.1px' }}>
            Alerts & Compliance
          </span>
          <span
            className="inline-flex items-center justify-center rounded-[10px] min-w-[20px] h-5 px-1"
            style={{ background: 'var(--hris-danger)', color: '#fff', fontSize: '10px', fontWeight: 700 }}
          >
            3
          </span>
        </div>
        <a
          href="#"
          className="px-2.5 py-1 rounded-lg border-[1.5px] transition-all"
          style={{ fontSize: '12px', fontWeight: 600, color: 'var(--hris-accent)', borderColor: 'rgba(79,110,247,0.25)', background: 'rgba(79,110,247,0.04)', textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(79,110,247,0.1)'; e.currentTarget.style.borderColor = 'var(--hris-accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(79,110,247,0.04)'; e.currentTarget.style.borderColor = 'rgba(79,110,247,0.25)'; }}
        >
          View All →
        </a>
      </div>

      <div>
        {alerts.map((alert, idx) => {
          const Icon = alert.icon;
          const iconBg =
            alert.type === 'danger' ? 'rgba(239,68,68,0.1)' :
            alert.type === 'warn'   ? 'rgba(245,158,11,0.1)' :
            'rgba(79,110,247,0.1)';
          const iconColor =
            alert.type === 'danger' ? 'var(--hris-danger)' :
            alert.type === 'warn'   ? 'var(--hris-warn)'   :
            'var(--hris-accent)';

          return (
            <div
              key={idx}
              className="flex items-start gap-3 py-3 border-b last:border-b-0 transition-all"
              style={{ borderColor: 'var(--hris-border)', borderLeft: `3px solid ${iconColor}`, marginLeft: '-20px', paddingLeft: '17px' }}
            >
              <div className="w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0" style={{ background: iconBg, color: iconColor }}>
                <Icon className="w-[15px] h-[15px]" strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--hris-text)', lineHeight: 1.4 }}>{alert.text}</div>
                <div style={{ fontSize: '11px', color: 'var(--hris-muted)', marginTop: '2px' }}>{alert.tag}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--hris-border)' }}>
        <div className="mb-2.5" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--hris-text2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          April 2026
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, idx) => (
            <div key={idx} className="text-center py-1" style={{ fontSize: '10px', fontWeight: 600, color: 'var(--hris-muted)' }}>{day}</div>
          ))}
          {calendarDays.map((day, idx) => {
            const isEvent = eventDays.includes(day);
            const isPast = day === '';
            const isImportant = importantDays[day];

            return (
              <div
                key={idx}
                className="text-center py-1 rounded-md cursor-pointer transition-all relative"
                style={{
                  fontSize: '11px',
                  fontWeight: isImportant || isEvent ? 700 : 500,
                  color: isPast
                    ? 'var(--hris-muted)'
                    : isImportant
                      ? isImportant.type === 'danger' ? 'var(--hris-danger)' : 'var(--hris-warn)'
                      : isEvent
                        ? 'var(--hris-accent)'
                        : 'var(--hris-text2)',
                  background: isImportant
                    ? isImportant.type === 'danger' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)'
                    : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isPast) {
                    if (!isImportant) e.currentTarget.style.background = 'var(--hris-surface2)';
                    setHoveredDay(day);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isImportant) {
                    e.currentTarget.style.background = 'transparent';
                  } else {
                    e.currentTarget.style.background = isImportant.type === 'danger' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)';
                  }
                  setHoveredDay(null);
                }}
              >
                {day}
              </div>
            );
          })}
        </div>
        {hoveredDay && importantDays[hoveredDay] && (
          <div
            className="mt-2 px-2 py-1 rounded-md"
            style={{
              background: importantDays[hoveredDay].type === 'danger' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
              color: importantDays[hoveredDay].type === 'danger' ? 'var(--hris-danger)' : 'var(--hris-warn)',
              fontSize: '11px',
              fontWeight: 500,
            }}
          >
            <div style={{ fontWeight: 700 }}>{importantDays[hoveredDay].title}</div>
            <div>{importantDays[hoveredDay].description}</div>
          </div>
        )}
      </div>
    </div>
  );
}
