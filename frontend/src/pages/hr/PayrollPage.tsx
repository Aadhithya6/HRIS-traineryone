import { useState } from 'react';
import { Zap, CheckCircle2, Clock, DollarSign, Users, AlertTriangle, X, Loader2 } from 'lucide-react';

const payrollHistory = [
  { month: 'March 2026',    total: '₹1.24 Cr', employees: 512, status: 'processed', date: 'Mar 31, 2026' },
  { month: 'February 2026', total: '₹1.22 Cr', employees: 510, status: 'processed', date: 'Feb 28, 2026' },
  { month: 'January 2026',  total: '₹1.21 Cr', employees: 508, status: 'processed', date: 'Jan 31, 2026' },
  { month: 'December 2025', total: '₹1.19 Cr', employees: 505, status: 'processed', date: 'Dec 31, 2025' },
  { month: 'November 2025', total: '₹1.18 Cr', employees: 503, status: 'processed', date: 'Nov 30, 2025' },
];

const deptPayroll = [
  { dept: 'Engineering', employees: 180, total: '₹48.2 L', avg: '₹26,800', pct: 38.9 },
  { dept: 'Product',     employees: 42,  total: '₹13.1 L', avg: '₹31,200', pct: 10.6 },
  { dept: 'Design',      employees: 38,  total: '₹10.5 L', avg: '₹27,600', pct:  8.5 },
  { dept: 'Analytics',   employees: 55,  total: '₹14.8 L', avg: '₹26,900', pct: 11.9 },
  { dept: 'HR',          employees: 30,  total: '₹7.2 L',  avg: '₹24,000', pct:  5.8 },
  { dept: 'Finance',     employees: 45,  total: '₹11.6 L', avg: '₹25,800', pct:  9.4 },
  { dept: 'Marketing',   employees: 62,  total: '₹14.9 L', avg: '₹24,000', pct: 12.0 },
  { dept: 'Operations',  employees: 60,  total: '₹3.7 L',  avg: '₹6,167',  pct:  3.0 },
];

function RunPayrollModal({ onClose }: { onClose: () => void }) {
  const [step, setStep]       = useState<'review' | 'confirm' | 'processing' | 'done'>('review');

  function handleConfirm() {
    setStep('processing');
    setTimeout(() => setStep('done'), 2500);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget && step !== 'processing') onClose(); }}
    >
      <div className="bg-white rounded-[18px] shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b" style={{ borderColor: 'var(--hris-border)', background: step === 'done' ? '#10b981' : 'var(--hris-primary)' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>
              {step === 'done' ? '✅ Payroll Processed!' : 'Run April 2026 Payroll'}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>
              {step === 'done' ? 'Salaries dispatched successfully' : 'Review before confirming'}
            </div>
          </div>
          {step !== 'processing' && (
            <button onClick={onClose} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>
          )}
        </div>

        <div className="p-6">
          {step === 'done' ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--hris-text)', textAlign: 'center' }}>
                April 2026 Payroll has been processed successfully!
              </div>
              <div style={{ fontSize: '13px', color: 'var(--hris-muted)', textAlign: 'center' }}>
                512 employees · ₹1.27 Cr disbursed · Apr 30, 2026
              </div>
              <button onClick={onClose} className="w-full py-2.5 rounded-xl text-white font-bold mt-2" style={{ background: '#10b981', fontSize: '13px' }}>
                Close
              </button>
            </div>
          ) : step === 'processing' ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="w-12 h-12 animate-spin" style={{ color: 'var(--hris-primary)' }} />
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--hris-text)' }}>Processing payroll…</div>
              <div style={{ fontSize: '13px', color: 'var(--hris-muted)' }}>Please wait, this may take a few seconds.</div>
            </div>
          ) : step === 'confirm' ? (
            <div className="flex flex-col gap-4">
              <div className="rounded-[12px] p-4 border-[1.5px] bg-yellow-50" style={{ borderColor: '#F59E0B' }}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#92400E' }}>Please confirm this action</span>
                </div>
                <p style={{ fontSize: '12px', color: '#92400E' }}>
                  You are about to process payroll for <strong>512 employees</strong> amounting to <strong>₹1.27 Cr</strong>. This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('review')} className="flex-1 py-2.5 rounded-xl border-[1.5px] font-semibold transition-all" style={{ borderColor: 'var(--hris-border)', color: 'var(--hris-text2)', fontSize: '13px' }}>
                  Go Back
                </button>
                <button onClick={handleConfirm} className="flex-1 py-2.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all" style={{ background: 'var(--hris-primary)', fontSize: '13px' }}>
                  <Zap className="w-4 h-4" /> Confirm & Process
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text2)' }}>Payroll Summary — April 2026</div>
              {[
                { label: 'Pay Period',        value: 'Apr 1 – Apr 30, 2026' },
                { label: 'Total Employees',   value: '512'                  },
                { label: 'Processed',         value: '509'                  },
                { label: 'Pending Docs',      value: '3 (action required)'  },
                { label: 'Total Disbursement',value: '₹1.27 Cr (est.)'      },
                { label: 'Payment Date',      value: 'April 30, 2026'       },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b last:border-0" style={{ borderColor: 'var(--hris-border)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--hris-muted)' }}>{label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text)' }}>{value}</span>
                </div>
              ))}
              <div className="rounded-[10px] p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                ⚠️ 3 employees have missing documents. Their salaries will be held until resolved.
              </div>
              <button onClick={() => setStep('confirm')} className="w-full py-2.5 rounded-xl text-white font-bold flex items-center justify-center gap-2" style={{ background: 'var(--hris-primary)', fontSize: '13px' }}>
                <Zap className="w-4 h-4" /> Proceed to Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PayrollPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <RunPayrollModal onClose={() => setShowModal(false)} />}

      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--hris-text)' }}>Payroll</h1>
            <p style={{ fontSize: '13px', color: 'var(--hris-muted)', marginTop: '4px' }}>Manage and process monthly payroll</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold transition-all"
            style={{ background: 'var(--hris-primary)', fontSize: '13px', boxShadow: '0 4px 14px rgba(47,128,237,0.3)' }}
          >
            <Zap className="w-4 h-4" />
            Run April Payroll
          </button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Employees', value: '512',       icon: Users,         color: 'var(--hris-primary)', bg: 'rgba(47,128,237,0.08)', border: 'rgba(47,128,237,0.15)' },
            { label: 'Processed',       value: '509',       icon: CheckCircle2,  color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.15)' },
            { label: 'Pending Docs',    value: '3',         icon: AlertTriangle, color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.15)'  },
            { label: 'Estimated (Apr)', value: '₹1.27 Cr', icon: DollarSign,    color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.15)' },
          ].map(({ label, value, icon: Icon, color, bg, border }) => (
            <div key={label} className="rounded-[14px] p-5 border-[1.5px]" style={{ background: bg, borderColor: border }}>
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-3 shrink-0" style={{ background: color, color: '#fff' }}>
                <Icon className="w-5 h-5" />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: '12px', color: 'var(--hris-muted)', marginTop: '4px', fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Cycle Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-[14px] p-5 bg-white border-[1.5px]" style={{ borderColor: 'var(--hris-border)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)' }}>March 2026</div>
                <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Processed ✓</div>
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--hris-text)' }}>₹1.24 Cr</div>
            <div style={{ fontSize: '12px', color: 'var(--hris-muted)', marginTop: '2px' }}>Disbursed to 512 employees · Mar 31</div>
          </div>
          <div className="rounded-[14px] p-5 bg-white border-[1.5px] border-[#2F80ED]/30" style={{ boxShadow: '0 0 0 3px rgba(47,128,237,0.05)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ background: 'rgba(47,128,237,0.1)', color: 'var(--hris-primary)' }}>
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)' }}>April 2026</div>
                <div style={{ fontSize: '11px', color: 'var(--hris-primary)', fontWeight: 600 }}>Next Cycle · Apr 30</div>
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--hris-text)' }}>₹1.27 Cr</div>
            <div style={{ fontSize: '12px', color: 'var(--hris-muted)', marginTop: '2px' }}>Estimated · 512 employees</div>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="rounded-[18px] border-[1.5px] overflow-hidden bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, var(--hris-primary), var(--hris-gradient-to))' }} />
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--hris-border)' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)' }}>Department-wise Payroll — March 2026</div>
          </div>
          <div className="grid px-5 py-3 border-b" style={{ gridTemplateColumns: '2fr 1fr 1.5fr 1.5fr 3fr', borderColor: 'var(--hris-border)', background: 'var(--hris-surface2)' }}>
            {['Department', 'Employees', 'Total', 'Avg Salary', 'Distribution'].map((h) => (
              <div key={h} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--hris-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
            ))}
          </div>
          {deptPayroll.map((d) => (
            <div
              key={d.dept}
              className="grid px-5 py-3.5 border-b last:border-b-0 items-center transition-colors"
              style={{ gridTemplateColumns: '2fr 1fr 1.5fr 1.5fr 3fr', borderColor: 'var(--hris-border)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hris-primary-light)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text)' }}>{d.dept}</div>
              <div style={{ fontSize: '13px', color: 'var(--hris-text2)' }}>{d.employees}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)' }}>{d.total}</div>
              <div style={{ fontSize: '12px', color: 'var(--hris-muted)' }}>{d.avg}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full" style={{ background: 'var(--hris-border)' }}>
                  <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: 'var(--hris-primary)' }} />
                </div>
                <span style={{ fontSize: '11px', color: 'var(--hris-muted)', minWidth: '36px', textAlign: 'right' }}>{d.pct}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Payroll History */}
        <div className="rounded-[18px] border-[1.5px] overflow-hidden bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--hris-border)' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)' }}>Payroll History</div>
          </div>
          {payrollHistory.map((p) => (
            <div
              key={p.month}
              className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 transition-colors"
              style={{ borderColor: 'var(--hris-border)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hris-primary-light)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text)' }}>{p.month}</div>
                  <div style={{ fontSize: '11px', color: 'var(--hris-muted)' }}>{p.employees} employees · {p.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--hris-text)' }}>{p.total}</div>
                <span className="px-2.5 py-1 rounded-[8px]" style={{ background: '#ECFDF5', color: '#10b981', fontSize: '11px', fontWeight: 700 }}>Processed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
