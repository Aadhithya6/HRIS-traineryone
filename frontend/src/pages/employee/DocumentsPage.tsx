import { useState } from 'react';
import { FileText, Download, Eye, Search, FolderOpen, File, Shield, Clock, Upload, Filter } from 'lucide-react';

const allDocuments = [
  { name: 'Employment Contract 2024.pdf',  type: 'Contract', date: 'Jan 15, 2024', size: '2.4 MB',  icon: Shield   },
  { name: 'Tax Form W-2 2023.pdf',          type: 'Tax',      date: 'Feb 01, 2024', size: '156 KB',  icon: FileText },
  { name: 'Benefits Enrollment.pdf',        type: 'Benefits', date: 'Jan 10, 2024', size: '890 KB',  icon: File     },
  { name: 'Performance Review Q4.pdf',      type: 'Review',   date: 'Dec 20, 2023', size: '1.2 MB',  icon: FileText },
  { name: 'Offer Letter - Senior Dev.pdf',  type: 'Offer',    date: 'Dec 01, 2023', size: '345 KB',  icon: File     },
  { name: 'Tax Form W-2 2022.pdf',          type: 'Tax',      date: 'Feb 01, 2023', size: '148 KB',  icon: FileText },
  { name: 'Performance Review Q2.pdf',      type: 'Review',   date: 'Jun 20, 2023', size: '980 KB',  icon: FileText },
  { name: 'Health Insurance Card.pdf',      type: 'Benefits', date: 'Mar 05, 2024', size: '512 KB',  icon: Shield   },
  { name: 'Salary Revision Letter.pdf',     type: 'Offer',    date: 'Oct 01, 2023', size: '210 KB',  icon: File     },
  { name: 'NDA Agreement.pdf',              type: 'Contract', date: 'Dec 01, 2023', size: '670 KB',  icon: Shield   },
];

const typeColors: Record<string, string> = {
  Contract: 'bg-[#2F80ED]/10 text-[#2F80ED] border-[#2F80ED]/20',
  Tax:      'bg-[#EB5757]/10 text-[#EB5757] border-[#EB5757]/20',
  Benefits: 'bg-[#27AE60]/10 text-[#27AE60] border-[#27AE60]/20',
  Review:   'bg-[#F2C94C]/10 text-[#F2994A] border-[#F2C94C]/20',
  Offer:    'bg-[#56CCF2]/10 text-[#2F80ED] border-[#56CCF2]/20',
};

const categories = ['All', 'Contract', 'Tax', 'Benefits', 'Review', 'Offer'];

export default function DocumentsPage() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');

  const filtered = allDocuments.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat    = category === 'All' || d.type === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F2937]">Documents Vault</h1>
          <p className="text-sm text-[#6B7280] mt-1">Your important files and certificates</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#EB5757] to-[#DC2626] text-white font-bold rounded-xl shadow-lg shadow-[#EB5757]/25 hover:opacity-90 transition-opacity">
          <Upload className="w-5 h-5" />
          Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Files',    value: allDocuments.length.toString(), color: '#2F80ED', bg: 'from-[#EFF6FF] to-white', border: 'border-[#2F80ED]/20' },
          { label: 'Storage Used',   value: '18 MB',  color: '#27AE60', bg: 'from-[#ECFDF5] to-white', border: 'border-[#27AE60]/20' },
          { label: 'Contracts',      value: '2',       color: '#EB5757', bg: 'from-[#FFF5F5] to-white', border: 'border-[#EB5757]/20' },
          { label: 'Tax Documents',  value: '2',       color: '#F59E0B', bg: 'from-[#FFFBEB] to-white', border: 'border-[#F59E0B]/20' },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className={`bg-gradient-to-br ${bg} border-2 ${border} rounded-2xl p-5`}>
            <div className="text-3xl font-extrabold" style={{ color }}>{value}</div>
            <div className="text-xs font-semibold text-[#6B7280] mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F80ED]/30 focus:border-[#2F80ED] transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  category === cat
                    ? 'bg-[#2F80ED] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#EB5757] to-[#DC2626] rounded-xl flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-[#1F2937]">All Documents</div>
            <div className="text-xs text-[#6B7280]">{filtered.length} files</div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[#6B7280]">
            <FolderOpen className="w-12 h-12 opacity-20 mx-auto mb-3" />
            <p className="font-semibold">No documents found</p>
            <p className="text-sm">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((doc, i) => {
              const Icon = doc.icon;
              return (
                <div key={i} className="group flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all cursor-pointer border border-transparent hover:border-gray-200">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-900 truncate mb-1">{doc.name}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${typeColors[doc.type] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        {doc.type}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{doc.date}
                      </span>
                      <span className="text-xs text-gray-500">{doc.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-9 h-9 bg-white hover:bg-[#2F80ED]/10 rounded-lg flex items-center justify-center border border-gray-200 hover:border-[#2F80ED] transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="w-9 h-9 bg-white hover:bg-[#27AE60]/10 rounded-lg flex items-center justify-center border border-gray-200 hover:border-[#27AE60] transition-colors">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
