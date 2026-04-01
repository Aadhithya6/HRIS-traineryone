import { useState } from 'react';
import { User, Mail, Phone, Lock, Bell, Shield, CheckCircle2, Building2, Globe } from 'lucide-react';
import { getUser } from '../../api/client';

export default function HRSettingsPage() {
  const user = getUser();
  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'HR';

  const [profile, setProfile] = useState({
    name:       user?.name  || '',
    email:      user?.email || '',
    phone:      '+1 (555) 400-0001',
    department: 'Human Resources',
    location:   'HQ — New York',
    timezone:   'UTC-5 (Eastern)',
  });
  const [savedProfile, setSavedProfile] = useState(false);

  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [pwError, setPwError]     = useState('');
  const [pwSaved, setPwSaved]     = useState(false);

  const [notifs, setNotifs] = useState({
    newLeaveRequest:    true,
    payrollReminder:    true,
    complianceAlerts:   true,
    newHireJoining:     true,
    recruitmentUpdates: false,
    weeklyReport:       true,
  });

  const [orgSettings, setOrgSettings] = useState({
    leaveCycleStart:  'January',
    workingDays:      '5',
    workHoursPerDay:  '8',
    payrollDate:      '30',
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
    borderColor: 'var(--hris-border)',
    fontSize: '13px',
    color: 'var(--hris-text)',
    background: '#FFFFFF',
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--hris-text)' }}>Settings</h1>
        <p style={{ fontSize: '13px', color: 'var(--hris-muted)', marginTop: '4px' }}>Manage your profile and system configuration</p>
      </div>

      {/* Profile Card */}
      <div className="rounded-[18px] border-[1.5px] bg-white overflow-hidden" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, var(--hris-primary), var(--hris-gradient-to))' }} />
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md" style={{ background: 'linear-gradient(135deg, var(--hris-gradient-from), var(--hris-gradient-to))' }}>
              {initials}
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--hris-text)' }}>{user?.name || 'HR Manager'}</div>
              <div style={{ fontSize: '12px', color: 'var(--hris-muted)' }}>{user?.email}</div>
              <span className="inline-block px-2.5 py-0.5 rounded-full mt-1" style={{ background: 'rgba(47,128,237,0.1)', color: 'var(--hris-primary)', fontSize: '11px', fontWeight: 600 }}>HR Manager</span>
            </div>
          </div>

          <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User className="w-4 h-4" style={{ color: 'var(--hris-primary)' }} /> Personal Information
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
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--hris-text2)', marginBottom: '6px' }}>{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--hris-muted)' }} />
                    <input
                      type={type}
                      value={profile[name as keyof typeof profile]}
                      onChange={(e) => setProfile((p) => ({ ...p, [name]: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-[10px] border-[1.5px] outline-none transition-all"
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--hris-primary)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hris-border)'; }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button type="submit" className="px-5 py-2.5 rounded-[10px] text-white font-semibold transition-all" style={{ background: 'var(--hris-primary)', fontSize: '13px', boxShadow: '0 4px 14px rgba(47,128,237,0.25)' }}>
                Save Changes
              </button>
              {savedProfile && (
                <div className="flex items-center gap-1.5" style={{ fontSize: '13px', color: '#10b981', fontWeight: 600 }}>
                  <CheckCircle2 className="w-4 h-4" /> Saved!
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-[18px] border-[1.5px] bg-white p-6" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handlePasswordSave} className="flex flex-col gap-4">
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock className="w-4 h-4" style={{ color: '#ef4444' }} /> Change Password
          </div>
          {pwError && <div className="rounded-[10px] px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-xs">{pwError}</div>}
          {[
            { label: 'Current Password', name: 'current' },
            { label: 'New Password',     name: 'next'    },
            { label: 'Confirm Password', name: 'confirm' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--hris-text2)', marginBottom: '6px' }}>{label}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--hris-muted)' }} />
                <input
                  type="password"
                  value={passwords[name as keyof typeof passwords]}
                  onChange={(e) => setPasswords((p) => ({ ...p, [name]: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-[10px] border-[1.5px] outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#ef4444'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hris-border)'; }}
                />
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <button type="submit" className="px-5 py-2.5 rounded-[10px] text-white font-semibold" style={{ background: '#ef4444', fontSize: '13px' }}>
              Update Password
            </button>
            {pwSaved && <div className="flex items-center gap-1.5" style={{ fontSize: '13px', color: '#10b981', fontWeight: 600 }}><CheckCircle2 className="w-4 h-4" /> Updated!</div>}
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="rounded-[18px] border-[1.5px] bg-white p-6" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
          <Bell className="w-4 h-4" style={{ color: '#F59E0B' }} /> Notification Preferences
        </div>
        <div className="flex flex-col gap-2.5">
          {([
            { key: 'newLeaveRequest',    label: 'New leave request',         desc: 'Notify when an employee submits a leave request'        },
            { key: 'payrollReminder',    label: 'Payroll processing reminder',desc: 'Alert before payroll deadline'                          },
            { key: 'complianceAlerts',   label: 'Compliance alerts',         desc: 'Critical alerts for compliance and legal requirements'   },
            { key: 'newHireJoining',     label: 'New hire onboarding',       desc: 'Reminder when a new employee is joining'                 },
            { key: 'recruitmentUpdates', label: 'Recruitment updates',       desc: 'Updates on candidate pipeline changes'                   },
            { key: 'weeklyReport',       label: 'Weekly HR summary',         desc: 'Auto-generated summary every Monday morning'            },
          ] as const).map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-3.5 rounded-[10px] border-[1.5px]" style={{ borderColor: 'var(--hris-border)', background: 'var(--hris-surface2)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text)' }}>{label}</div>
                <div style={{ fontSize: '11px', color: 'var(--hris-muted)', marginTop: '1px' }}>{desc}</div>
              </div>
              <button
                onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                className="relative w-11 h-6 rounded-full transition-colors shrink-0"
                style={{ background: notifs[key] ? 'var(--hris-primary)' : '#D1D5DB' }}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${notifs[key] ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Organization Settings */}
      <div className="rounded-[18px] border-[1.5px] bg-white p-6" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--hris-text)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
          <Shield className="w-4 h-4" style={{ color: '#10b981' }} /> Organization Settings
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Leave Cycle Start', name: 'leaveCycleStart', type: 'text'   },
            { label: 'Working Days/Week', name: 'workingDays',     type: 'number' },
            { label: 'Work Hours/Day',    name: 'workHoursPerDay', type: 'number' },
            { label: 'Payroll Date',      name: 'payrollDate',     type: 'number' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--hris-text2)', marginBottom: '6px' }}>{label}</label>
              <input
                type={type}
                value={orgSettings[name as keyof typeof orgSettings]}
                onChange={(e) => setOrgSettings((p) => ({ ...p, [name]: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-[10px] border-[1.5px] outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--hris-primary)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hris-border)'; }}
              />
            </div>
          ))}
        </div>
        <button className="mt-4 px-5 py-2.5 rounded-[10px] text-white font-semibold" style={{ background: '#10b981', fontSize: '13px' }}>
          Save Organization Settings
        </button>
      </div>
    </div>
  );
}
