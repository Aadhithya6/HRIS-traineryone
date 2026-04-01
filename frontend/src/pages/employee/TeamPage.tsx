import { useState } from 'react';
import { Users, UserCheck, Activity, Search, Mail, Phone } from 'lucide-react';

const members = [
  { name: 'Sarah Miller',   role: 'Product Designer',       dept: 'Design',      status: 'active',   initials: 'SM', gradient: 'from-[#2F80ED] to-[#56CCF2]',    email: 'sarah.m@techcorp.com',   phone: '+1 (555) 101-0001' },
  { name: 'John Davis',     role: 'Frontend Developer',     dept: 'Engineering', status: 'active',   initials: 'JD', gradient: 'from-[#F2C94C] to-[#F2994A]',    email: 'john.d@techcorp.com',    phone: '+1 (555) 101-0002' },
  { name: 'Emma Wilson',    role: 'Backend Developer',      dept: 'Engineering', status: 'away',     initials: 'EW', gradient: 'from-[#EB5757] to-[#DC2626]',     email: 'emma.w@techcorp.com',    phone: '+1 (555) 101-0003' },
  { name: 'Raj Patel',      role: 'DevOps Engineer',        dept: 'Engineering', status: 'active',   initials: 'RP', gradient: 'from-[#27AE60] to-[#219653]',     email: 'raj.p@techcorp.com',     phone: '+1 (555) 101-0004' },
  { name: 'Lisa Chen',      role: 'QA Engineer',            dept: 'Engineering', status: 'offline',  initials: 'LC', gradient: 'from-[#a855f7] to-[#7c3aed]',     email: 'lisa.c@techcorp.com',    phone: '+1 (555) 101-0005' },
  { name: 'Mark Thompson',  role: 'Product Manager',        dept: 'Product',     status: 'active',   initials: 'MT', gradient: 'from-[#56CCF2] to-[#2F80ED]',     email: 'mark.t@techcorp.com',    phone: '+1 (555) 101-0006' },
  { name: 'Priya Sharma',   role: 'Data Analyst',           dept: 'Analytics',   status: 'active',   initials: 'PS', gradient: 'from-[#F2994A] to-[#EB5757]',     email: 'priya.s@techcorp.com',   phone: '+1 (555) 101-0007' },
  { name: 'Carlos Reyes',   role: 'Mobile Developer',       dept: 'Engineering', status: 'away',     initials: 'CR', gradient: 'from-[#F2C94C] to-[#27AE60]',     email: 'carlos.r@techcorp.com',  phone: '+1 (555) 101-0008' },
  { name: 'Ana Kowalski',   role: 'UX Researcher',          dept: 'Design',      status: 'active',   initials: 'AK', gradient: 'from-[#2F80ED] to-[#a855f7]',     email: 'ana.k@techcorp.com',     phone: '+1 (555) 101-0009' },
  { name: 'Tom Bradley',    role: 'Security Engineer',      dept: 'Engineering', status: 'offline',  initials: 'TB', gradient: 'from-[#1F2937] to-[#374151]',     email: 'tom.b@techcorp.com',     phone: '+1 (555) 101-0010' },
  { name: 'Nina Park',      role: 'Technical Writer',       dept: 'Product',     status: 'active',   initials: 'NP', gradient: 'from-[#56CCF2] to-[#27AE60]',     email: 'nina.p@techcorp.com',    phone: '+1 (555) 101-0011' },
  { name: 'Dev Kapoor',     role: 'Full-Stack Developer',   dept: 'Engineering', status: 'active',   initials: 'DK', gradient: 'from-[#EB5757] to-[#a855f7]',     email: 'dev.k@techcorp.com',     phone: '+1 (555) 101-0012' },
];

const statusConfig = {
  active:  { dot: 'bg-[#27AE60] animate-pulse', label: 'Active',  badge: 'bg-[#ECFDF5] text-[#27AE60]' },
  away:    { dot: 'bg-[#F59E0B]',               label: 'Away',    badge: 'bg-[#FFFBEB] text-[#F59E0B]' },
  offline: { dot: 'bg-gray-400',                label: 'Offline', badge: 'bg-gray-100  text-gray-500'   },
};

const depts = ['All', 'Engineering', 'Design', 'Product', 'Analytics'];

export default function TeamPage() {
  const [search, setSearch]   = useState('');
  const [dept, setDept]       = useState('All');

  const filtered = members.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase());
    const matchDept   = dept === 'All' || m.dept === dept;
    return matchSearch && matchDept;
  });

  const activeCount  = members.filter((m) => m.status === 'active').length;
  const presentCount = members.filter((m) => m.status !== 'offline').length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1F2937]">Team</h1>
        <p className="text-sm text-[#6B7280] mt-1">Your colleagues and team members</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: members.length, color: '#2F80ED', bg: 'from-[#EFF6FF] to-white', border: 'border-[#2F80ED]/20', icon: Users       },
          { label: 'Present Today', value: presentCount,   color: '#27AE60', bg: 'from-[#ECFDF5] to-white', border: 'border-[#27AE60]/20', icon: UserCheck   },
          { label: 'Active Now',    value: activeCount,    color: '#56CCF2', bg: 'from-[#F0F9FF] to-white', border: 'border-[#56CCF2]/20', icon: Activity    },
          { label: 'Departments',   value: 4,              color: '#F59E0B', bg: 'from-[#FFFBEB] to-white', border: 'border-[#F59E0B]/20', icon: Users       },
        ].map(({ label, value, color, bg, border, icon: Icon }) => (
          <div key={label} className={`bg-gradient-to-br ${bg} border-2 ${border} rounded-2xl p-5 flex flex-col gap-2`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ background: color }}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-extrabold" style={{ color }}>{value}</div>
            <div className="text-xs font-semibold text-[#6B7280]">{label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F80ED]/30 focus:border-[#2F80ED] transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {depts.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${dept === d ? 'bg-[#2F80ED] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member) => {
          const s = statusConfig[member.status as keyof typeof statusConfig];
          return (
            <div key={member.name} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center text-white font-bold text-base shadow-md flex-shrink-0`}>
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-[#1F2937] truncate">{member.name}</p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>{s.label}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] truncate">{member.role}</p>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#2F80ED]/10 text-[#2F80ED] mt-1 inline-block">{member.dept}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{member.phone}</span>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-12 text-[#6B7280]">
            <Users className="w-12 h-12 opacity-20 mx-auto mb-3" />
            <p className="font-semibold">No team members found</p>
          </div>
        )}
      </div>
    </div>
  );
}
