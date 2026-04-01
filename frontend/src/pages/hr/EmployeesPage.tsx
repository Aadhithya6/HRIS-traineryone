import { useState } from 'react';
import { Users, Search, Plus, X, Mail, Phone, Building2, Loader2, CheckCircle2 } from 'lucide-react';

const AVATAR_COLORS = ['#2F80ED', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#38bdf8', '#F2994A', '#27AE60'];

const DEPARTMENTS = ['Engineering', 'Design', 'Product', 'Analytics', 'HR', 'Finance', 'Marketing', 'Operations'];

const initialEmployees = [
  { id: 1,  name: 'Alice Johnson',   role: 'Frontend Developer',   dept: 'Engineering', email: 'alice@company.com',   phone: '+1 555-0101', status: 'active',    joined: 'Jan 2023' },
  { id: 2,  name: 'Bob Smith',       role: 'Backend Developer',    dept: 'Engineering', email: 'bob@company.com',     phone: '+1 555-0102', status: 'active',    joined: 'Mar 2023' },
  { id: 3,  name: 'Carol Davis',     role: 'Product Designer',     dept: 'Design',      email: 'carol@company.com',   phone: '+1 555-0103', status: 'active',    joined: 'Jun 2022' },
  { id: 4,  name: 'David Park',      role: 'Data Analyst',         dept: 'Analytics',   email: 'david@company.com',   phone: '+1 555-0104', status: 'active',    joined: 'Sep 2022' },
  { id: 5,  name: 'Emily Chen',      role: 'Product Manager',      dept: 'Product',     email: 'emily@company.com',   phone: '+1 555-0105', status: 'active',    joined: 'Feb 2023' },
  { id: 6,  name: 'Frank Lee',       role: 'DevOps Engineer',      dept: 'Engineering', email: 'frank@company.com',   phone: '+1 555-0106', status: 'on_leave',  joined: 'May 2022' },
  { id: 7,  name: 'Grace Wang',      role: 'UX Researcher',        dept: 'Design',      email: 'grace@company.com',   phone: '+1 555-0107', status: 'active',    joined: 'Nov 2022' },
  { id: 8,  name: 'Henry Brown',     role: 'Marketing Lead',       dept: 'Marketing',   email: 'henry@company.com',   phone: '+1 555-0108', status: 'active',    joined: 'Apr 2023' },
  { id: 9,  name: 'Iris Kumar',      role: 'Finance Analyst',      dept: 'Finance',     email: 'iris@company.com',    phone: '+1 555-0109', status: 'active',    joined: 'Jul 2022' },
  { id: 10, name: 'James Wilson',    role: 'Security Engineer',    dept: 'Engineering', email: 'james@company.com',   phone: '+1 555-0110', status: 'inactive',  joined: 'Jan 2022' },
  { id: 11, name: 'Karen Patel',     role: 'HR Specialist',        dept: 'HR',          email: 'karen@company.com',   phone: '+1 555-0111', status: 'active',    joined: 'Aug 2022' },
  { id: 12, name: 'Liam Thompson',   role: 'Full-Stack Developer', dept: 'Engineering', email: 'liam@company.com',    phone: '+1 555-0112', status: 'active',    joined: 'Dec 2022' },
];

interface Employee { id: number; name: string; role: string; dept: string; email: string; phone: string; status: string; joined: string; }

const statusStyle = {
  active:   { bg: '#ECFDF5', color: '#10b981', label: 'Active'    },
  on_leave: { bg: '#FEF3C7', color: '#F59E0B', label: 'On Leave'  },
  inactive: { bg: '#F3F4F6', color: '#9CA3AF', label: 'Inactive'  },
};

function AddEmployeeModal({ onClose, onAdd }: { onClose: () => void; onAdd: (e: Employee) => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', dept: DEPARTMENTS[0] });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onAdd({
        id: Date.now(),
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        dept: form.dept,
        status: 'active',
        joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      });
      setLoading(false);
      setDone(true);
      setTimeout(onClose, 1200);
    }, 800);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-[18px] shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'var(--hris-border)', background: 'var(--hris-primary)' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>Add New Employee</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>Fill in the employee details below</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center justify-center gap-3 p-10">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--hris-text)' }}>Employee Added!</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            {[
              { label: 'Full Name',   name: 'name',  type: 'text',  icon: Users,     placeholder: 'e.g. John Doe'         },
              { label: 'Email',       name: 'email', type: 'email', icon: Mail,      placeholder: 'john@company.com'      },
              { label: 'Phone',       name: 'phone', type: 'tel',   icon: Phone,     placeholder: '+1 555-0000'           },
              { label: 'Job Role',    name: 'role',  type: 'text',  icon: Building2, placeholder: 'e.g. Software Engineer' },
            ].map(({ label, name, type, icon: Icon, placeholder }) => (
              <div key={name}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--hris-text2)', marginBottom: '6px' }}>{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--hris-muted)' }} />
                  <input
                    type={type}
                    name={name}
                    value={form[name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border-[1.5px] text-sm outline-none transition-all"
                    style={{ borderColor: 'var(--hris-border)', fontSize: '13px' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--hris-primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(47,128,237,0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hris-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
            ))}

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--hris-text2)', marginBottom: '6px' }}>Department</label>
              <select
                name="dept"
                value={form.dept}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border-[1.5px] text-sm outline-none"
                style={{ borderColor: 'var(--hris-border)', fontSize: '13px', color: 'var(--hris-text)' }}
              >
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border-[1.5px] text-sm font-semibold transition-all" style={{ borderColor: 'var(--hris-border)', color: 'var(--hris-text2)', fontSize: '13px' }}>
                Cancel
              </button>
              <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60" style={{ background: 'var(--hris-primary)', fontSize: '13px' }}>
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Adding…' : 'Add Employee'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [search, setSearch]       = useState('');
  const [dept, setDept]           = useState('All');
  const [showModal, setShowModal] = useState(false);

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase());
    const matchDept   = dept === 'All' || e.dept === dept;
    return matchSearch && matchDept;
  });

  const depts = ['All', ...DEPARTMENTS];

  return (
    <>
      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onAdd={(e) => { setEmployees((prev) => [e, ...prev]); setShowModal(false); }}
        />
      )}

      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--hris-text)' }}>Employees</h1>
            <p style={{ fontSize: '13px', color: 'var(--hris-muted)', marginTop: '4px' }}>Manage your workforce directory</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold transition-all"
            style={{ background: 'var(--hris-primary)', fontSize: '13px', boxShadow: '0 4px 14px rgba(47,128,237,0.3)' }}
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Employees', value: employees.length, color: 'var(--hris-primary)', bg: 'rgba(47,128,237,0.08)', border: 'rgba(47,128,237,0.15)' },
            { label: 'Active',          value: employees.filter((e) => e.status === 'active').length,   color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.15)' },
            { label: 'On Leave',        value: employees.filter((e) => e.status === 'on_leave').length, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.15)' },
            { label: 'Departments',     value: DEPARTMENTS.length,                                       color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.15)' },
          ].map(({ label, value, color, bg, border }) => (
            <div key={label} className="rounded-[14px] p-5 border-[1.5px]" style={{ background: bg, borderColor: border }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: '12px', color: 'var(--hris-muted)', marginTop: '4px', fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-3 bg-white rounded-[14px] p-4 border-[1.5px]" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--hris-muted)' }} />
            <input
              type="text"
              placeholder="Search by name or role…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-[10px] border-[1.5px] outline-none transition-all"
              style={{ background: 'var(--hris-surface2)', borderColor: 'var(--hris-border)', fontSize: '13px' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--hris-primary)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hris-border)'; }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {depts.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border-[1.5px]"
                style={{
                  background: dept === d ? 'var(--hris-primary)' : '#FFFFFF',
                  color: dept === d ? '#FFFFFF' : 'var(--hris-primary)',
                  borderColor: 'var(--hris-primary)',
                  fontSize: '12px',
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Employee Table */}
        <div className="rounded-[18px] border-[1.5px] overflow-hidden bg-white" style={{ borderColor: 'var(--hris-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, var(--hris-primary), var(--hris-gradient-to))' }} />

          {/* Table Header */}
          <div className="grid px-5 py-3 border-b" style={{ gridTemplateColumns: '2.5fr 1.5fr 1.5fr 1fr 1fr', borderColor: 'var(--hris-border)', background: 'var(--hris-surface2)' }}>
            {['Employee', 'Role', 'Email', 'Joined', 'Status'].map((h) => (
              <div key={h} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--hris-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32" style={{ color: 'var(--hris-muted)', fontSize: '13px' }}>
              <Users className="w-8 h-8 mb-2 opacity-20" />
              No employees match your filter.
            </div>
          ) : (
            filtered.map((emp, idx) => {
              const color = AVATAR_COLORS[idx % AVATAR_COLORS.length];
              const s = statusStyle[emp.status as keyof typeof statusStyle];
              return (
                <div
                  key={emp.id}
                  className="grid px-5 py-3.5 border-b last:border-b-0 items-center transition-colors"
                  style={{ gridTemplateColumns: '2.5fr 1.5fr 1.5fr 1fr 1fr', borderColor: 'var(--hris-border)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hris-primary-light)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: `${color}18`, color, fontWeight: 700, fontSize: '12px' }}>
                      {emp.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--hris-text)' }}>{emp.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--hris-muted)' }}>{emp.dept}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--hris-text2)' }}>{emp.role}</div>
                  <div style={{ fontSize: '12px', color: 'var(--hris-muted)' }}>{emp.email}</div>
                  <div style={{ fontSize: '12px', color: 'var(--hris-muted)' }}>{emp.joined}</div>
                  <div>
                    <span className="px-2.5 py-1 rounded-[8px]" style={{ background: s.bg, color: s.color, fontSize: '11px', fontWeight: 700 }}>{s.label}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
