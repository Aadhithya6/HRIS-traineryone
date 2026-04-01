import { Users, UserCheck, UserPlus, Award, TrendingUp, Activity } from 'lucide-react';

export function TeamSnapshot() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 animate-[fadeUp_0.65s_ease_both] [animation-delay:0.15s]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2F80ED] to-[#56CCF2] rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900">Team Snapshot</h3>
            <p className="text-sm text-gray-500">Your team at a glance</p>
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-gradient-to-br from-[#2F80ED]/10 to-[#56CCF2]/10 rounded-xl p-4 border border-[#2F80ED]/20">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="w-5 h-5 text-[#2F80ED]" />
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Present Today</span>
          </div>
          <div className="text-3xl font-extrabold text-gray-900">42</div>
          <div className="text-xs text-gray-500 mt-1">Out of 48 members</div>
        </div>

        <div className="bg-gradient-to-br from-[#27AE60]/10 to-[#27AE60]/5 rounded-xl p-4 border border-[#27AE60]/20">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-[#27AE60]" />
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Active Now</span>
          </div>
          <div className="text-3xl font-extrabold text-gray-900">28</div>
          <div className="text-xs text-gray-500 mt-1">Working on tasks</div>
        </div>
      </div>

      {/* Team Members Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2F80ED] to-[#56CCF2] rounded-full flex items-center justify-center text-white font-bold text-sm">
              SM
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">Sarah Miller</p>
              <p className="text-xs text-gray-500">Product Designer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#27AE60] rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-gray-500">Active</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F2C94C] to-[#F2994A] rounded-full flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">John Davis</p>
              <p className="text-xs text-gray-500">Frontend Developer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#27AE60] rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-gray-500">Active</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#EB5757] to-[#DC2626] rounded-full flex items-center justify-center text-white font-bold text-sm">
              EW
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">Emma Wilson</p>
              <p className="text-xs text-gray-500">Backend Developer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-xs font-semibold text-gray-500">Away</span>
          </div>
        </div>
      </div>

      {/* View All Button */}
      <button className="w-full mt-5 py-3 bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] hover:from-[#2563C7] hover:to-[#2F80ED] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg">
        View Full Team →
      </button>
    </div>
  );
}
