import { CheckCheck, Clock } from 'lucide-react';

const payrollData = [
  { label: 'Total Employees',        value: '512'      },
  { label: 'Processed',              value: '509', color: 'var(--hris-success)' },
  { label: 'Pending (Missing Docs)', value: '3',   color: 'var(--hris-danger)'  },
  { label: 'Total Disbursed (Mar)',  value: '₹1.24 Cr' },
  { label: 'Estimated (Apr)',        value: '₹1.27 Cr' },
];

export function PayrollStatus() {
  return (
    <div
      className="rounded-[18px] p-5 border-[1.5px]"
      style={{ background: '#FFFFFF', borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)', letterSpacing: '-0.1px' }}>
          Payroll Status
        </span>
        <a
          href="#"
          className="px-2.5 py-1 rounded-lg border-[1.5px] transition-all"
          style={{ fontSize: '12px', fontWeight: 600, color: 'var(--hris-primary)', borderColor: 'rgba(47,128,237,0.25)', background: 'rgba(47,128,237,0.04)', textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(47,128,237,0.1)'; e.currentTarget.style.borderColor = 'var(--hris-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(47,128,237,0.04)'; e.currentTarget.style.borderColor = 'rgba(47,128,237,0.25)'; }}
        >
          View Details →
        </a>
      </div>

      <div className="space-y-2.5 mb-2.5">
        <div
          className="flex items-center gap-3 p-3.5 rounded-xl border-[1.5px]"
          style={{ background: 'var(--hris-success-light)', borderColor: 'var(--hris-border)' }}
        >
          <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: '#FFFFFF', color: 'var(--hris-success)' }}>
            <CheckCheck className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <div style={{ fontSize: '11px', color: 'var(--hris-muted)', fontWeight: 500 }}>March 2026</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)', marginTop: '1px' }}>Processed</div>
          </div>
          <span className="px-2.5 py-1 rounded-lg" style={{ background: 'var(--hris-success)', color: '#FFFFFF', fontSize: '11px', fontWeight: 700 }}>Done</span>
        </div>

        <div
          className="flex items-center gap-3 p-3.5 rounded-xl border-[1.5px]"
          style={{ background: 'var(--hris-warn-light)', borderColor: 'var(--hris-border)' }}
        >
          <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: '#FFFFFF', color: 'var(--hris-warn)' }}>
            <Clock className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <div style={{ fontSize: '11px', color: 'var(--hris-muted)', fontWeight: 500 }}>April 2026</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)', marginTop: '1px' }}>Next Cycle</div>
          </div>
          <span className="px-2.5 py-1 rounded-lg" style={{ background: 'var(--hris-warn)', color: '#FFFFFF', fontSize: '11px', fontWeight: 700 }}>Apr 30</span>
        </div>
      </div>

      <div>
        {payrollData.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-2 border-b last:border-b-0"
            style={{ borderColor: 'var(--hris-border)', fontSize: '13px' }}
          >
            <span style={{ color: 'var(--hris-muted)', fontWeight: 500 }}>{item.label}</span>
            <span style={{ fontWeight: 700, color: item.color || 'var(--hris-text)' }}>{item.value}</span>
          </div>
        ))}
      </div>

      <button
        className="w-full mt-4 rounded-xl py-3 border-none transition-all"
        style={{ background: 'var(--hris-primary)', color: '#FFFFFF', fontSize: '13px', fontWeight: 700, letterSpacing: '0.01em', boxShadow: '0 4px 14px rgba(47,128,237,0.28)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--hris-primary-hover)';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(47,128,237,0.35)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--hris-primary)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(47,128,237,0.28)';
        }}
      >
        ⚡ Run April Payroll
      </button>
    </div>
  );
}
