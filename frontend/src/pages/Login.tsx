import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Loader2, Building2 } from 'lucide-react';
import { authApi, saveAuth, getUser } from '../api/client';

const DEMO_USERS = [
  { name: 'Rahul Sharma', email: 'employee@test.com', role: 'Employee', initials: 'RS', color: '#2F80ED', bg: '#EFF6FF', roleColor: '#2F80ED' },
  { name: 'Arjun Kumar',  email: 'manager@test.com',  role: 'Manager',  initials: 'AK', color: '#27AE60', bg: '#ECFDF5', roleColor: '#27AE60' },
  { name: 'Aisha Nair',   email: 'hr@test.com',       role: 'HR',       initials: 'AN', color: '#EB5757', bg: '#FEE2E2', roleColor: '#EB5757' },
];

export default function Login() {
  const navigate = useNavigate();
  const user = getUser();

  // Already logged in — redirect immediately
  if (user) {
    navigate(`/${user.role}`, { replace: true });
    return null;
  }

  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  function fillDemo(demoEmail: string) {
    setEmail(demoEmail);
    setPassword('123456');
    setError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authApi.login(email.trim(), password);
      saveAuth(data.token, data.user);
      navigate(`/${data.user.role}`, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #1e3a5f 0%, #2F80ED 50%, #56CCF2 100%)',
    }}>
      <div className="bg-white rounded-[20px] p-10 w-full max-w-[420px] shadow-2xl">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 bg-gradient-to-br from-[#2F80ED] to-[#56CCF2] rounded-[12px] flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-[20px] font-[800] text-[#111827]">HRIS Portal</div>
            <div className="text-[12px] text-[#6B7280] font-[500]">Human Resource Information System</div>
          </div>
        </div>

        <h2 className="text-[24px] font-[800] text-[#111827] mb-1">Welcome back</h2>
        <p className="text-[14px] text-[#6B7280] mb-8">Sign in to access your dashboard</p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-[10px] px-4 py-3 text-[13px] font-[500] mb-5">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-[600] text-[#374151] mb-1.5">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="w-full px-3.5 py-3 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#111827] outline-none transition-all focus:border-[#2F80ED] focus:shadow-[0_0_0_3px_rgba(47,128,237,0.1)]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-[600] text-[#374151] mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-3 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#111827] outline-none transition-all focus:border-[#2F80ED] focus:shadow-[0_0_0_3px_rgba(47,128,237,0.1)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-[12px] text-white font-[700] text-[15px] mt-2 flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #2F80ED, #56CCF2)' }}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Demo Users */}
        <div className="mt-8 pt-6 border-t border-[#F3F4F6]">
          <div className="text-[11px] font-[600] text-[#9CA3AF] uppercase tracking-wider mb-3">
            Quick Login — Demo Accounts
          </div>
          <div className="flex flex-col gap-2">
            {DEMO_USERS.map((u) => (
              <button
                key={u.email}
                onClick={() => fillDemo(u.email)}
                className="flex items-center gap-3 px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] bg-[#FAFAFA] text-left transition-all hover:border-[#2F80ED] hover:bg-[#EFF6FF]"
              >
                <div
                  className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[12px] font-[700] text-white flex-shrink-0"
                  style={{ background: u.color }}
                >
                  {u.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-[600] text-[#111827]">{u.name}</div>
                  <div className="text-[11px] text-[#6B7280]">{u.email}</div>
                </div>
                <span
                  className="text-[10px] font-[700] px-2 py-0.5 rounded-full uppercase tracking-wide"
                  style={{ background: u.bg, color: u.roleColor }}
                >
                  {u.role}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
