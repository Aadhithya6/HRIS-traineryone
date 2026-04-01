import { useState } from 'react';
import { MapPin, MapPinOff, Clock, Calendar, CheckCircle2, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

const monthDays = [
  { day: 1,  status: 'present' }, { day: 2,  status: 'present' }, { day: 3,  status: 'absent'  },
  { day: 4,  status: 'present' }, { day: 5,  status: 'weekend' }, { day: 6,  status: 'weekend' },
  { day: 7,  status: 'present' }, { day: 8,  status: 'present' }, { day: 9,  status: 'late'    },
  { day: 10, status: 'present' }, { day: 11, status: 'present' }, { day: 12, status: 'present' },
  { day: 13, status: 'weekend' }, { day: 14, status: 'weekend' }, { day: 15, status: 'present' },
  { day: 16, status: 'present' }, { day: 17, status: 'holiday' }, { day: 18, status: 'present' },
  { day: 19, status: 'present' }, { day: 20, status: 'weekend' }, { day: 21, status: 'weekend' },
  { day: 22, status: 'present' }, { day: 23, status: 'late'    }, { day: 24, status: 'present' },
  { day: 25, status: 'absent'  }, { day: 26, status: 'present' }, { day: 27, status: 'weekend' },
  { day: 28, status: 'weekend' }, { day: 29, status: 'present' }, { day: 30, status: 'present' },
  { day: 31, status: 'today'   },
];

const statusStyle: Record<string, { bg: string; text: string; label: string }> = {
  present: { bg: 'bg-[#27AE60]',        text: 'text-white',      label: 'Present' },
  absent:  { bg: 'bg-[#EB5757]',        text: 'text-white',      label: 'Absent'  },
  late:    { bg: 'bg-[#F2C94C]',        text: 'text-white',      label: 'Late'    },
  weekend: { bg: 'bg-gray-100',         text: 'text-gray-400',   label: 'Weekend' },
  holiday: { bg: 'bg-[#56CCF2]/30',     text: 'text-[#2F80ED]',  label: 'Holiday' },
  today:   { bg: 'bg-gradient-to-br from-[#2F80ED] to-[#56CCF2]', text: 'text-white', label: 'Today' },
};

const logs = [
  { date: 'Today, Apr 1',    checkIn: '09:02 AM', checkOut: '—',        hours: 'In progress', status: 'present' },
  { date: 'Mon, Mar 31',     checkIn: '09:15 AM', checkOut: '06:12 PM', hours: '8h 57m',      status: 'present' },
  { date: 'Fri, Mar 28',     checkIn: '09:45 AM', checkOut: '06:30 PM', hours: '8h 45m',      status: 'late'    },
  { date: 'Thu, Mar 27',     checkIn: '08:58 AM', checkOut: '06:05 PM', hours: '9h 07m',      status: 'present' },
  { date: 'Wed, Mar 26',     checkIn: '09:01 AM', checkOut: '06:00 PM', hours: '8h 59m',      status: 'present' },
  { date: 'Tue, Mar 25',     checkIn: '—',        checkOut: '—',        hours: '0h',           status: 'absent'  },
];

export default function AttendancePage() {
  const [checkedIn, setCheckedIn] = useState(true);
  const [checkInTime]             = useState('09:02 AM');
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  function handleToggle() {
    if (checkedIn) {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      const hr = now.getHours() % 12 || 12;
      setCheckOutTime(`${String(hr).padStart(2, '0')}:${m} ${ampm}`);
      setCheckedIn(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1F2937]">Attendance</h1>
        <p className="text-sm text-[#6B7280] mt-1">Track your daily attendance and work hours</p>
      </div>

      {/* Check-In / Check-Out + Today Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Check-in card */}
        <div className={`rounded-2xl p-6 flex flex-col gap-4 border-2 transition-all ${checkedIn ? 'bg-gradient-to-br from-[#ECFDF5] to-white border-[#27AE60]/30' : 'bg-gradient-to-br from-[#FFF5F5] to-white border-[#EB5757]/30'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-[#1F2937]">{checkedIn ? 'You are Checked In' : 'You are Checked Out'}</div>
              <div className="text-sm text-[#6B7280] mt-0.5">
                {checkedIn ? `Since ${checkInTime}` : `Checked out at ${checkOutTime}`}
              </div>
            </div>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${checkedIn ? 'bg-[#27AE60]' : 'bg-[#EB5757]'}`}>
              {checkedIn ? <MapPin className="w-7 h-7 text-white" /> : <MapPinOff className="w-7 h-7 text-white" />}
            </div>
          </div>
          <button
            onClick={handleToggle}
            disabled={!checkedIn}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md ${
              checkedIn
                ? 'bg-[#EB5757] hover:bg-[#DC2626] shadow-[#EB5757]/25'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {checkedIn ? 'Check Out' : 'Checked Out'}
          </button>
        </div>

        {/* Today summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col gap-3">
          <div className="text-base font-bold text-[#1F2937]">Today's Summary</div>
          {[
            { label: 'Check-In',   value: checkInTime,         color: '#27AE60' },
            { label: 'Check-Out',  value: checkOutTime || '—', color: checkedIn ? '#6B7280' : '#EB5757' },
            { label: 'Shift',      value: '9:00 AM – 6:00 PM', color: '#2F80ED' },
            { label: 'Work Mode',  value: 'Office',             color: '#6B7280' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-sm text-[#6B7280] font-medium">{label}</span>
              <span className="text-sm font-bold" style={{ color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Present Days', value: '22', icon: CheckCircle2, color: '#27AE60', bg: 'from-[#ECFDF5] to-white', border: 'border-[#27AE60]/20' },
          { label: 'Absent Days',  value: '2',  icon: XCircle,      color: '#EB5757', bg: 'from-[#FFF5F5] to-white', border: 'border-[#EB5757]/20' },
          { label: 'Late Arrivals',value: '3',  icon: AlertCircle,  color: '#F59E0B', bg: 'from-[#FFFBEB] to-white', border: 'border-[#F59E0B]/20' },
          { label: 'Avg Hours/Day',value: '8.9',icon: TrendingUp,   color: '#2F80ED', bg: 'from-[#EFF6FF] to-white', border: 'border-[#2F80ED]/20' },
        ].map(({ label, value, icon: Icon, color, bg, border }) => (
          <div key={label} className={`bg-gradient-to-br ${bg} border-2 ${border} rounded-2xl p-5 flex flex-col gap-2`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ background: color }}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-extrabold" style={{ color }}>{value}</div>
            <div className="text-xs font-semibold text-[#6B7280]">{label}</div>
          </div>
        ))}
      </div>

      {/* Monthly Calendar */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#1F2937]">March 2025 — Attendance Calendar</h2>
          <div className="flex gap-3 flex-wrap">
            {[
              { label: 'Present', color: 'bg-[#27AE60]' },
              { label: 'Absent',  color: 'bg-[#EB5757]' },
              { label: 'Late',    color: 'bg-[#F2C94C]' },
              { label: 'Holiday', color: 'bg-[#56CCF2]/50' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280]">
                <span className={`w-3 h-3 rounded-full ${color}`} />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="text-xs font-bold text-[#6B7280] py-1">{d}</div>
          ))}
        </div>
        {/* Offset for March 2025 — starts on Saturday (col 7) */}
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => <div key={`e${i}`} />)}
          {monthDays.map(({ day, status }) => {
            const s = statusStyle[status];
            return (
              <div
                key={day}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold ${s.bg} ${s.text} shadow-sm`}
                title={s.label}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Logs */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-[#1F2937] mb-4">Recent Attendance Logs</h2>
        <div className="flex flex-col gap-2">
          {logs.map((log) => (
            <div key={log.date} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${log.status === 'present' ? 'bg-[#27AE60]' : log.status === 'late' ? 'bg-[#F2C94C]' : 'bg-[#EB5757]'}`} />
                <div>
                  <div className="text-sm font-bold text-[#1F2937]">{log.date}</div>
                  <div className="text-xs text-[#6B7280]">
                    In: <span className="font-semibold text-[#27AE60]">{log.checkIn}</span>
                    {'  '}Out: <span className="font-semibold text-[#EB5757]">{log.checkOut}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#1F2937]">{log.hours}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  log.status === 'present' ? 'bg-[#ECFDF5] text-[#27AE60]' :
                  log.status === 'late'    ? 'bg-[#FFFBEB] text-[#F59E0B]' :
                                             'bg-[#FEE2E2] text-[#EB5757]'
                }`}>
                  {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
