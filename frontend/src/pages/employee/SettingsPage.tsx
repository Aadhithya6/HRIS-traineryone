import { useState } from 'react';
import { User, Mail, Phone, Building2, Lock, Bell, Shield, CheckCircle2 } from 'lucide-react';
import { getUser } from '../../api/client';

export default function SettingsPage() {
  const user = getUser();
  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'ME';

  const [profile, setProfile] = useState({
    name:       user?.name  || '',
    email:      user?.email || '',
    phone:      '+1 (555) 234-5678',
    department: 'Engineering',
    location:   'New York, USA',
    bio:        'Full-stack developer passionate about building great products.',
  });
  const [savedProfile, setSavedProfile] = useState(false);

  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [pwError, setPwError]     = useState('');
  const [pwSaved, setPwSaved]     = useState(false);

  const [notifs, setNotifs] = useState({
    leaveApproval: true,
    attendanceAlert: true,
    payslipReady: true,
    teamUpdates: false,
    emailDigest: true,
  });

  function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 3000);
  }

  function handlePasswordSave(e: React.FormEvent) {
    e.preventDefault();
    setPwError('');
    if (passwords.next.length < 8) { setPwError('Password must be at least 8 characters.'); return; }
    if (passwords.next !== passwords.confirm) { setPwError('Passwords do not match.'); return; }
    setPwSaved(true);
    setPasswords({ current: '', next: '', confirm: '' });
    setTimeout(() => setPwSaved(false), 3000);
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1F2937]">Settings</h1>
        <p className="text-sm text-[#6B7280] mt-1">Manage your profile and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#2F80ED] to-[#56CCF2] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {initials}
          </div>
          <div>
            <div className="font-bold text-xl text-[#1F2937]">{user?.name || 'Employee'}</div>
            <div className="text-sm text-[#6B7280]">{user?.email}</div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-[#2F80ED]/10 text-[#2F80ED] rounded-full mt-1 inline-block capitalize">{user?.role}</span>
          </div>
        </div>

        <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-[#1F2937] flex items-center gap-2">
            <User className="w-4 h-4 text-[#2F80ED]" /> Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Full Name',   name: 'name',       icon: User,       type: 'text'  },
              { label: 'Email',       name: 'email',      icon: Mail,       type: 'email' },
              { label: 'Phone',       name: 'phone',      icon: Phone,      type: 'tel'   },
              { label: 'Department',  name: 'department', icon: Building2,  type: 'text'  },
              { label: 'Location',    name: 'location',   icon: Building2,  type: 'text'  },
            ].map(({ label, name, icon: Icon, type }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={type}
                    value={profile[name as keyof typeof profile]}
                    onChange={(e) => setProfile((p) => ({ ...p, [name]: e.target.value }))}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F80ED]/30 focus:border-[#2F80ED] transition-all bg-white"
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F80ED]/30 focus:border-[#2F80ED] transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md">
              Save Changes
            </button>
            {savedProfile && (
              <div className="flex items-center gap-1.5 text-sm text-[#27AE60] font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Saved!
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <form onSubmit={handlePasswordSave} className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-[#1F2937] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#EB5757]" /> Change Password
          </h2>

          {pwError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{pwError}</div>
          )}

          {[
            { label: 'Current Password',  name: 'current' },
            { label: 'New Password',      name: 'next'    },
            { label: 'Confirm Password',  name: 'confirm' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={passwords[name as keyof typeof passwords]}
                  onChange={(e) => setPasswords((p) => ({ ...p, [name]: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#EB5757]/30 focus:border-[#EB5757] transition-all"
                />
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3">
            <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-[#EB5757] to-[#DC2626] text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md">
              Update Password
            </button>
            {pwSaved && (
              <div className="flex items-center gap-1.5 text-sm text-[#27AE60] font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Password updated!
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-base font-bold text-[#1F2937] flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-[#F59E0B]" /> Notification Preferences
        </h2>
        <div className="flex flex-col gap-3">
          {([
            { key: 'leaveApproval',    label: 'Leave approval updates',          desc: 'Get notified when your leave is approved or rejected' },
            { key: 'attendanceAlert',  label: 'Attendance alerts',               desc: 'Reminders for check-in and late arrivals' },
            { key: 'payslipReady',     label: 'Payslip ready',                   desc: 'Notification when your monthly payslip is generated' },
            { key: 'teamUpdates',      label: 'Team updates',                    desc: 'Updates about your team members and org changes' },
            { key: 'emailDigest',      label: 'Weekly email digest',             desc: 'Summary of your work week every Monday morning' },
          ] as const).map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <div className="text-sm font-bold text-[#1F2937]">{label}</div>
                <div className="text-xs text-[#6B7280] mt-0.5">{desc}</div>
              </div>
              <button
                onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                className={`relative w-12 h-6 rounded-full transition-colors ${notifs[key] ? 'bg-[#2F80ED]' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${notifs[key] ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-base font-bold text-[#1F2937] flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-[#27AE60]" /> Security
        </h2>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Two-Factor Authentication', status: 'Not enabled', action: 'Enable', actionColor: 'text-[#27AE60]' },
            { label: 'Login Sessions',            status: '1 active session', action: 'View All', actionColor: 'text-[#2F80ED]' },
            { label: 'Account Activity',          status: 'Last login: Today 9:02 AM', action: 'View Log', actionColor: 'text-[#2F80ED]' },
          ].map(({ label, status, action, actionColor }) => (
            <div key={label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <div className="text-sm font-bold text-[#1F2937]">{label}</div>
                <div className="text-xs text-[#6B7280] mt-0.5">{status}</div>
              </div>
              <button className={`text-sm font-semibold ${actionColor} hover:underline`}>{action}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
