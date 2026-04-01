import { CheckCheck, DollarSign, Plus, Edit, FileText } from 'lucide-react';
import { useNavigate } from 'react-router';

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { icon: CheckCheck, label: 'Approve Requests', primary: true,  to: '/hr/approvals'   },
    { icon: DollarSign, label: 'Run Payroll',       primary: false, to: '/hr/payroll'     },
    { icon: Plus,       label: 'Add Employee',      primary: false, to: '/hr/employees'   },
    { icon: Edit,       label: 'Post Job',           primary: false, to: '/hr/recruitment' },
    { icon: FileText,   label: 'Generate Report',   primary: false, to: '/hr/reports'     },
  ];

  return (
    <div>
      <div
        className="mb-3"
        style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--hris-muted)', textTransform: 'uppercase' }}
      >
        Quick Actions
      </div>
      <div className="flex gap-2.5 flex-wrap">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => navigate(action.to)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-[1.5px] transition-all whitespace-nowrap"
              style={{
                background: action.primary ? 'var(--hris-primary)' : '#FFFFFF',
                borderColor: 'var(--hris-primary)',
                color: action.primary ? '#FFFFFF' : 'var(--hris-primary)',
                fontSize: '13px',
                fontWeight: 600,
                boxShadow: action.primary ? '0 4px 14px rgba(47,128,237,0.3)' : '0 1px 3px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                if (action.primary) {
                  e.currentTarget.style.background = 'var(--hris-primary-hover)';
                  e.currentTarget.style.borderColor = 'var(--hris-primary-hover)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(47,128,237,0.4)';
                } else {
                  e.currentTarget.style.borderColor = 'var(--hris-primary-hover)';
                  e.currentTarget.style.color = 'var(--hris-primary-hover)';
                  e.currentTarget.style.background = 'var(--hris-primary-light)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(47,128,237,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (action.primary) {
                  e.currentTarget.style.background = 'var(--hris-primary)';
                  e.currentTarget.style.borderColor = 'var(--hris-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(47,128,237,0.3)';
                } else {
                  e.currentTarget.style.borderColor = 'var(--hris-primary)';
                  e.currentTarget.style.color = 'var(--hris-primary)';
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                }
              }}
            >
              <Icon className="w-[15px] h-[15px] shrink-0" strokeWidth={action.primary ? 2.5 : 2} />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
