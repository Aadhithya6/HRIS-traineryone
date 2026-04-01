import { useState } from 'react';
import { Umbrella, Plus, Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { LeaveModal } from '../../components/employee/leave-modal';
import { LeaveHistory } from '../../components/employee/leave-history';

const balanceCards = [
  { label: 'Casual Leave',  used: 7,  total: 12, color: '#2F80ED', bg: 'from-[#EFF6FF] to-white', border: 'border-[#2F80ED]/20' },
  { label: 'Sick Leave',    used: 5,  total: 14, color: '#EB5757', bg: 'from-[#FFF5F5] to-white', border: 'border-[#EB5757]/20' },
  { label: 'Earned Leave',  used: 9,  total: 21, color: '#27AE60', bg: 'from-[#ECFDF5] to-white', border: 'border-[#27AE60]/20' },
];

const leaveTypes = [
  { label: 'Casual Leave',  desc: 'For personal errands & short breaks',   icon: '🌴', color: '#2F80ED' },
  { label: 'Sick Leave',    desc: 'Medical reasons & health emergencies',   icon: '🏥', color: '#EB5757' },
  { label: 'Earned Leave',  desc: 'Accumulated leave for vacations',        icon: '🏖️', color: '#27AE60' },
];

export default function LeavePage() {
  const [modalOpen, setModalOpen]   = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      {modalOpen && (
        <LeaveModal
          onClose={() => setModalOpen(false)}
          onSuccess={() => { setRefreshKey((k) => k + 1); setModalOpen(false); }}
        />
      )}

      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1F2937]">Leave Management</h1>
            <p className="text-sm text-[#6B7280] mt-1">Apply, track, and manage your leave requests</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white font-bold rounded-xl shadow-lg shadow-[#2F80ED]/25 hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Apply Leave
          </button>
        </div>

        {/* Leave Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {balanceCards.map((card) => {
            const remaining = card.total - card.used;
            const pct = Math.round((remaining / card.total) * 100);
            return (
              <div
                key={card.label}
                className={`bg-gradient-to-br ${card.bg} border-2 ${card.border} rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-xl transition-all`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md" style={{ background: card.color }}>
                    <Umbrella className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-lg border" style={{ color: card.color, background: `${card.color}15`, borderColor: `${card.color}30` }}>
                    {remaining} left
                  </span>
                </div>
                <div>
                  <div className="text-4xl font-extrabold" style={{ color: card.color }}>{remaining}</div>
                  <div className="text-sm font-bold text-[#1F2937] mt-1">{card.label}</div>
                  <div className="text-xs text-[#6B7280]">{card.used} used · {card.total} total</div>
                </div>
                <div>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: card.color }} />
                  </div>
                  <div className="text-xs text-[#6B7280] mt-1">{pct}% remaining</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leave Types Info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-[#1F2937] mb-4">Leave Policy Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaveTypes.map((lt) => (
              <div key={lt.label} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-3xl">{lt.icon}</div>
                <div>
                  <div className="font-bold text-sm text-[#1F2937]">{lt.label}</div>
                  <div className="text-xs text-[#6B7280] mt-1">{lt.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Status Legend */}
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Pending Manager', color: '#F59E0B', bg: '#FEF3C7', icon: Clock },
            { label: 'Pending HR',      color: '#2F80ED', bg: '#EFF6FF', icon: Calendar },
            { label: 'Approved',        color: '#27AE60', bg: '#ECFDF5', icon: CheckCircle2 },
            { label: 'Rejected',        color: '#EB5757', bg: '#FEE2E2', icon: XCircle },
          ].map(({ label, color, bg, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ color, background: bg }}>
              <Icon className="w-3.5 h-3.5" />
              {label}
            </div>
          ))}
        </div>

        {/* Leave History */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1F2937]">My Leave Requests</h2>
            <button
              onClick={() => setModalOpen(true)}
              className="text-sm text-[#2F80ED] font-semibold hover:underline flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> New Request
            </button>
          </div>
          <LeaveHistory refreshKey={refreshKey} />
        </div>
      </div>
    </>
  );
}
