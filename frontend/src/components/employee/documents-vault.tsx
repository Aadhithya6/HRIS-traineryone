import { FileText, Download, Eye, Search, FolderOpen, File, Shield, Clock } from 'lucide-react';

export function DocumentsVault() {
  const documents = [
    { name: 'Employment Contract 2024.pdf', type: 'Contract', date: 'Jan 15, 2024', size: '2.4 MB', icon: Shield },
    { name: 'Tax Form W-2 2023.pdf', type: 'Tax', date: 'Feb 01, 2024', size: '156 KB', icon: FileText },
    { name: 'Benefits Enrollment.pdf', type: 'Benefits', date: 'Jan 10, 2024', size: '890 KB', icon: File },
    { name: 'Performance Review Q4.pdf', type: 'Review', date: 'Dec 20, 2023', size: '1.2 MB', icon: FileText },
    { name: 'Offer Letter - Senior Dev.pdf', type: 'Offer', date: 'Dec 01, 2023', size: '345 KB', icon: File },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Contract': return 'bg-[#2F80ED]/10 text-[#2F80ED] border-[#2F80ED]/20';
      case 'Tax': return 'bg-[#EB5757]/10 text-[#EB5757] border-[#EB5757]/20';
      case 'Benefits': return 'bg-[#27AE60]/10 text-[#27AE60] border-[#27AE60]/20';
      case 'Review': return 'bg-[#F2C94C]/10 text-[#F2994A] border-[#F2C94C]/20';
      case 'Offer': return 'bg-[#56CCF2]/10 text-[#2F80ED] border-[#56CCF2]/20';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 animate-[fadeUp_0.7s_ease_both] [animation-delay:0.25s]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#EB5757] to-[#DC2626] rounded-xl flex items-center justify-center shadow-lg">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900">Documents Vault</h3>
            <p className="text-sm text-gray-500">Your important files and documents</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F80ED]/30 focus:border-[#2F80ED] transition-all"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-[#2F80ED]/10 to-[#56CCF2]/10 rounded-xl p-3 border border-[#2F80ED]/20">
          <div className="text-2xl font-extrabold text-gray-900 mb-1">24</div>
          <div className="text-xs font-semibold text-gray-600">Total Files</div>
        </div>
        <div className="bg-gradient-to-br from-[#27AE60]/10 to-[#27AE60]/5 rounded-xl p-3 border border-[#27AE60]/20">
          <div className="text-2xl font-extrabold text-gray-900 mb-1">18 MB</div>
          <div className="text-xs font-semibold text-gray-600">Storage Used</div>
        </div>
        <div className="bg-gradient-to-br from-[#F2C94C]/10 to-[#F2994A]/10 rounded-xl p-3 border border-[#F2C94C]/20">
          <div className="text-2xl font-extrabold text-gray-900 mb-1">5</div>
          <div className="text-xs font-semibold text-gray-600">Recent</div>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-2">
        {documents.map((doc, index) => {
          const Icon = doc.icon;
          return (
            <div
              key={index}
              className="group flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all cursor-pointer border border-transparent hover:border-gray-200"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-900 truncate mb-1">{doc.name}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getTypeColor(doc.type)}`}>
                    {doc.type}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {doc.date}
                  </span>
                  <span className="text-xs text-gray-500">{doc.size}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-9 h-9 bg-white hover:bg-[#2F80ED]/10 rounded-lg flex items-center justify-center transition-colors border border-gray-200 hover:border-[#2F80ED]">
                  <Eye className="w-4 h-4 text-gray-600 hover:text-[#2F80ED]" />
                </button>
                <button className="w-9 h-9 bg-white hover:bg-[#27AE60]/10 rounded-lg flex items-center justify-center transition-colors border border-gray-200 hover:border-[#27AE60]">
                  <Download className="w-4 h-4 text-gray-600 hover:text-[#27AE60]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Button */}
      <button className="w-full mt-5 py-3 bg-gradient-to-r from-[#EB5757] to-[#DC2626] hover:from-[#DC2626] hover:to-[#EB5757] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
        <FileText className="w-4 h-4" />
        Upload New Document
      </button>
    </div>
  );
}
