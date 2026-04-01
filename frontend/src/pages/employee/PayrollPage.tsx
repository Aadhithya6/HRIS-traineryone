import { useState } from 'react';
import { DollarSign, Download, Eye, X, TrendingUp, CreditCard, PiggyBank, Award, Receipt } from 'lucide-react';

const payslips = [
  { month: 'March 2025',    gross: '$10,416.67', net: '$7,604.17', tax: '$1,562.50', deductions: '$1,250.00', status: 'paid',    date: 'Mar 31, 2025' },
  { month: 'February 2025', gross: '$10,416.67', net: '$7,604.17', tax: '$1,562.50', deductions: '$1,250.00', status: 'paid',    date: 'Feb 28, 2025' },
  { month: 'January 2025',  gross: '$10,416.67', net: '$7,604.17', tax: '$1,562.50', deductions: '$1,250.00', status: 'paid',    date: 'Jan 31, 2025' },
  { month: 'December 2024', gross: '$10,416.67', net: '$7,604.17', tax: '$1,562.50', deductions: '$1,250.00', status: 'paid',    date: 'Dec 31, 2024' },
  { month: 'November 2024', gross: '$10,416.67', net: '$7,604.17', tax: '$1,562.50', deductions: '$1,250.00', status: 'paid',    date: 'Nov 30, 2024' },
  { month: 'April 2025',    gross: '$10,416.67', net: '$7,604.17', tax: '$1,562.50', deductions: '$1,250.00', status: 'pending', date: 'Apr 30, 2025' },
];

const breakdown = [
  { label: 'Basic Salary',        amount: '$7,500.00',  type: 'earning' },
  { label: 'HRA (House Rent)',     amount: '$1,500.00',  type: 'earning' },
  { label: 'Transport Allowance',  amount: '$500.00',    type: 'earning' },
  { label: 'Performance Bonus',    amount: '$916.67',    type: 'earning' },
  { label: 'Income Tax (TDS)',     amount: '-$1,562.50', type: 'deduction' },
  { label: 'Provident Fund',       amount: '-$900.00',   type: 'deduction' },
  { label: 'Health Insurance',     amount: '-$250.00',   type: 'deduction' },
  { label: 'Professional Tax',     amount: '-$100.00',   type: 'deduction' },
];

interface Payslip { month: string; gross: string; net: string; tax: string; deductions: string; status: string; date: string; }

function PayslipModal({ slip, onClose }: { slip: Payslip; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-[#27AE60] to-[#219653] p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Payslip — {slip.month}</h2>
            <p className="text-white/80 text-xs mt-0.5">Processed on {slip.date}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Net Pay */}
          <div className="bg-gradient-to-br from-[#27AE60] to-[#219653] rounded-xl p-4 text-center">
            <div className="text-sm text-white/80 font-semibold mb-1">Net Pay</div>
            <div className="text-4xl font-extrabold text-white">{slip.net}</div>
            <div className="text-white/70 text-xs mt-1">After all deductions</div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Gross Pay',   value: slip.gross,      color: '#27AE60' },
              { label: 'Tax Paid',    value: slip.tax,         color: '#EB5757' },
              { label: 'Deductions',  value: slip.deductions,  color: '#F59E0B' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <div className="text-xs font-semibold text-[#6B7280]">{label}</div>
                <div className="text-sm font-extrabold mt-1" style={{ color }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Earnings & Deductions */}
          <div>
            <h3 className="text-sm font-bold text-[#1F2937] mb-3">Earnings & Deductions</h3>
            <div className="flex flex-col gap-2">
              {breakdown.map(({ label, amount, type }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-[#374151]">{label}</span>
                  <span className={`text-sm font-bold ${type === 'earning' ? 'text-[#27AE60]' : 'text-[#EB5757]'}`}>{amount}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-[#27AE60] to-[#219653] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PayrollPage() {
  const [selected, setSelected] = useState<Payslip | null>(null);

  return (
    <>
      {selected && <PayslipModal slip={selected} onClose={() => setSelected(null)} />}

      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F2937]">Payroll</h1>
          <p className="text-sm text-[#6B7280] mt-1">View your salary, payslips, and benefits</p>
        </div>

        {/* Salary Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Annual CTC',     value: '$125,000',  icon: CreditCard,  color: '#27AE60', bg: 'from-[#ECFDF5] to-white', border: 'border-[#27AE60]/20', sub: '+15% from last year' },
            { label: '401(k) Match',   value: '6%',         icon: PiggyBank,   color: '#2F80ED', bg: 'from-[#EFF6FF] to-white', border: 'border-[#2F80ED]/20', sub: 'Up to 6% matched'    },
            { label: 'Annual Bonus',   value: '$15,000',    icon: Award,       color: '#F59E0B', bg: 'from-[#FFFBEB] to-white', border: 'border-[#F59E0B]/20', sub: 'Performance linked'  },
            { label: 'Next Payroll',   value: 'Apr 30',     icon: Receipt,     color: '#EB5757', bg: 'from-[#FFF5F5] to-white', border: 'border-[#EB5757]/20', sub: 'In ~29 days'         },
          ].map(({ label, value, icon: Icon, color, bg, border, sub }) => (
            <div key={label} className={`bg-gradient-to-br ${bg} border-2 ${border} rounded-2xl p-5 flex flex-col gap-3`}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md" style={{ background: color }}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-extrabold" style={{ color }}>{value}</div>
                <div className="text-sm font-bold text-[#1F2937]">{label}</div>
                <div className="text-xs text-[#6B7280] mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* YTD earnings bar */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2F80ED] to-[#56CCF2] rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-[#1F2937]">Year-to-Date Earnings</div>
              <div className="text-sm text-[#6B7280]">Jan – Mar 2025 · 3 months</div>
            </div>
            <div className="ml-auto text-2xl font-extrabold text-[#27AE60]">$31,250</div>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#27AE60] to-[#56CCF2] rounded-full" style={{ width: '25%' }} />
          </div>
          <div className="flex justify-between text-xs text-[#6B7280] mt-2">
            <span>$0</span>
            <span>25% of annual CTC earned</span>
            <span>$125,000</span>
          </div>
        </div>

        {/* Payslips List */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-[#1F2937] mb-4">Payslip History</h2>
          <div className="flex flex-col gap-3">
            {payslips.map((slip) => (
              <div key={slip.month} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#27AE60] to-[#219653] rounded-xl flex items-center justify-center shadow-sm">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#1F2937]">{slip.month}</div>
                    <div className="text-xs text-[#6B7280]">Gross: {slip.gross} · Net: {slip.net}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${slip.status === 'paid' ? 'bg-[#ECFDF5] text-[#27AE60]' : 'bg-[#FFFBEB] text-[#F59E0B]'}`}>
                    {slip.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                  <button
                    onClick={() => setSelected(slip)}
                    className="w-9 h-9 bg-white hover:bg-[#2F80ED]/10 rounded-lg flex items-center justify-center border border-gray-200 hover:border-[#2F80ED] transition-all"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4 text-[#6B7280] hover:text-[#2F80ED]" />
                  </button>
                  <button
                    className="w-9 h-9 bg-white hover:bg-[#27AE60]/10 rounded-lg flex items-center justify-center border border-gray-200 hover:border-[#27AE60] transition-all"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-[#6B7280] hover:text-[#27AE60]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
