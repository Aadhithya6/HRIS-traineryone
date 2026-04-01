import { useState } from 'react';
import { User, Mail, Phone, Lock, Bell, CheckCircle2, Building2, Globe } from 'lucide-react';
import { getUser } from '../../api/client';

export default function ManagerSettingsPage() {
  const user = getUser();
  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'MG';

  const [profile, setProfile] = useState({
    name:       user?.name || '',
    email:      user?.email || '',
    phone:      '+1 (555) 300-0099',
    department: 'Engineering',
    location:   'HQ — New York',
    timezone:   'UTC-5 (Eastern)',
  });
  const [savedProfile, setSavedProfile] = useState(false);

  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [pwError, setPwError]     = useState('');
  const [pwSaved, setPwSaved]     = useState(false);

  const [notifs, setNotifs] = useState({
    leaveRequests:    true,
    escalationAlerts: true,
    deadlineReminders: true,
    performanceReports: false,
    weeklyTeamSummary: true,
    hiringUpdates:    true,
  });

  const [prefs, setPrefs] = useState({
    defaultView:    'dashboard',
    approvalMode:   'inline',
    reportFrequency:'weekly',
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

  const inputStyle = {
    border: '1.5px solid #E5E7EB',
    fontSize: '13px',
    color: '#111827',
    background: '#FFFFFF',
    borderRadius: '10px',
    padding: '10px 12px',
    width: '100%',
    outline: 'none',
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-[800] text-[#111827]">Settings</h1>
        <p className="text-[13px] text-[#6B7280] mt-1">Manage your profile and manager preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-[18px] border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #2F80ED, #56CCF2)' }} />
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md"
              style={{ background: 'linear-gradient(135deg, #2F80ED, #56CCF2)' }}>
              {initials}
            </div>
            <div>
              <div className="text-[16px] font-[700] text-[#111827]">{user?.name || 'Manager'}</div>
              <div className="text-[12px] text-[#6B7280]">{user?.email}</div>
              <span className="inline-block px-2.5 py-0.5 rounded-full mt-1 text-[11px] font-[600]"
                style={{ background: 'rgba(47,128,237,0.1)', color: '#2F80ED' }}>Team Manager</span>
            </div>
          </div>

          <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
            <div className="text-[13px] font-[700] text-[#111827] flex items-center gap-1.5">
              <User size={15} className="text-[#2F80ED]" /> Personal Information
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Full Name',   name: 'name',       icon: User,      type: 'text'  },
                { label: 'Email',       name: 'email',      icon: Mail,      type: 'email' },
                { label: 'Phone',       name: 'phone',      icon: Phone,     type: 'tel'   },
                { label: 'Department',  name: 'department', icon: Building2, type: 'text'  },
                { label: 'Location',    name: 'location',   icon: Globe,     type: 'text'  },
                { label: 'Timezone',    name: 'timezone',   icon: Globe,     type: 'text'  },
              ].map(({ label, name, icon: Icon, type }) => (
                <div key={name}>
                  <label className="block text-[12px] font-[600] text-[#6B7280] mb-1.5">{label}</label>
                  <div className="relative">
                    <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                    <input
                      type={type}
                      value={profile[name as keyof typeof profile]}
                      onChange={(e) => setProfile((p) => ({ ...p, [name]: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-[10px] border outline-none transition-all text-[13px]"
                      style={{ borderColor: '#E5E7EB', color: '#111827' }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#2F80ED'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button type="submit"
                className="px-5 py-2.5 rounded-[10px] text-white font-[600] text-[13px]"
                style={{ background: '#2F80ED', boxShadow: '0 4px 14px rgba(47,128,237,0.25)' }}>
                Save Changes
              </button>
              {savedProfile && (
                <div className="flex items-center gap-1.5 text-[13px] text-[#10b981] font-[600]">
                  <CheckCircle2 size={16} /> Saved!
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-[18px] border border-[#E5E7EB] p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handlePasswordSave} className="flex flex-col gap-4">
          <div className="text-[13px] font-[700] text-[#111827] flex items-center gap-1.5">
            <Lock size={15} className="text-[#ef4444]" /> Change Password
          </div>
          {pwError && (
            <div className="rounded-[10px] px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-xs">{pwError}</div>
          )}
          {[
            { label: 'Current Password', name: 'current' },
            { label: 'New Password',     name: 'next'    },
            { label: 'Confirm Password', name: 'confirm' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-[12px] font-[600] text-[#6B7280] mb-1.5">{label}</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="password"
                  value={passwords[name as keyof typeof passwords]}
                  onChange={(e) => setPasswords((p) => ({ ...p, [name]: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-[10px] border border-[#E5E7EB] outline-none transition-all text-[13px]"
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#ef4444'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; }}
                />
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <button type="submit"
              className="px-5 py-2.5 rounded-[10px] text-white font-[600] text-[13px]"
              style={{ background: '#ef4444' }}>
              Update Password
            </button>
            {pwSaved && (
              <div className="flex items-center gap-1.5 text-[13px] text-[#10b981] font-[600]">
                <CheckCircle2 size={16} /> Updated!
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-[18px] border border-[#E5E7EB] p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div className="text-[13px] font-[700] text-[#111827] flex items-center gap-1.5 mb-4">
          <Bell size={15} className="text-[#F59E0B]" /> Notification Preferences
        </div>
        <div className="flex flex-col gap-2.5">
          {([
            { key: 'leaveRequests',      label: 'Leave Requests',       desc: 'Get notified when team members request leave'       },
            { key: 'escalationAlerts',   label: 'Escalation Alerts',    desc: 'Immediate alerts for new escalations'               },
            { key: 'deadlineReminders',  label: 'Deadline Reminders',   desc: 'Reminders 24 hrs before upcoming deadlines'         },
            { key: 'performanceReports', label: 'Performance Reports',  desc: 'Automated performance summary reports'              },
            { key: 'weeklyTeamSummary',  label: 'Weekly Team Summary',  desc: 'Auto-generated team status every Monday morning'    },
            { key: 'hiringUpdates',      label: 'Hiring Request Updates',desc: 'Status updates on submitted hiring requests'       },
          ] as const).map(({ key, label, desc }) => (
            <div key={key}
              className="flex items-center justify-between p-3.5 rounded-[10px] border border-[#E5E7EB] bg-[#FAFAFA]">
              <div>
                <div className="text-[13px] font-[600] text-[#111827]">{label}</div>
                <div className="text-[11px] text-[#9CA3AF] mt-0.5">{desc}</div>
              </div>
              <button
                onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                className="relative w-11 h-6 rounded-full transition-colors shrink-0"
                style={{ background: notifs[key] ? '#2F80ED' : '#D1D5DB' }}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${notifs[key] ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Manager Preferences */}
      <div className="bg-white rounded-[18px] border border-[#E5E7EB] p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div className="text-[13px] font-[700] text-[#111827] mb-4">Manager Preferences</div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Default View',      name: 'defaultView',     options: ['dashboard', 'approvals', 'team'] },
            { label: 'Approval Mode',     name: 'approvalMode',    options: ['inline', 'full_page', 'batch']   },
            { label: 'Report Frequency',  name: 'reportFrequency', options: ['daily', 'weekly', 'monthly']     },
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label className="block text-[12px] font-[600] text-[#6B7280] mb-1.5">{label}</label>
              <select
                value={prefs[name as keyof typeof prefs]}
                onChange={(e) => setPrefs((p) => ({ ...p, [name]: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-[10px] border border-[#E5E7EB] text-[13px] text-[#111827] outline-none bg-white transition-all"
                onFocus={(e) => { e.currentTarget.style.borderColor = '#2F80ED'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; }}>
                {options.map((o) => (
                  <option key={o} value={o}>{o.replace('_', ' ').charAt(0).toUpperCase() + o.replace('_', ' ').slice(1)}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <button className="mt-4 px-5 py-2.5 rounded-[10px] text-white font-[600] text-[13px]"
          style={{ background: '#10b981' }}>
          Save Preferences
        </button>
      </div>
    </div>
  );
}
