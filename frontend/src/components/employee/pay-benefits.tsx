import { DollarSign, TrendingUp, Award, CreditCard, PiggyBank, Receipt } from 'lucide-react';

export function PayBenefits() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 animate-[fadeUp_0.65s_ease_both] [animation-delay:0.2s]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#27AE60] to-[#219653] rounded-xl flex items-center justify-center shadow-lg">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900">Pay & Benefits</h3>
            <p className="text-sm text-gray-500">Your compensation overview</p>
          </div>
        </div>
      </div>

      {/* Salary Card */}
      <div className="bg-gradient-to-br from-[#27AE60] to-[#219653] rounded-xl p-5 mb-5 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="w-5 h-5 text-white/80" />
          <span className="text-sm font-semibold text-white/90 uppercase tracking-wide">Current Salary</span>
        </div>
        <div className="text-4xl font-extrabold text-white mb-1">$125,000</div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-white/80" />
          <span className="text-sm text-white/90 font-medium">+15% from last year</span>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-gradient-to-br from-[#2F80ED]/10 to-[#56CCF2]/10 rounded-xl p-4 border border-[#2F80ED]/20">
          <PiggyBank className="w-6 h-6 text-[#2F80ED] mb-2" />
          <div className="text-sm font-semibold text-gray-600 mb-1">401(k) Match</div>
          <div className="text-lg font-bold text-gray-900">6%</div>
        </div>

        <div className="bg-gradient-to-br from-[#F2C94C]/10 to-[#F2994A]/10 rounded-xl p-4 border border-[#F2C94C]/20">
          <Award className="w-6 h-6 text-[#F2C94C] mb-2" />
          <div className="text-sm font-semibold text-gray-600 mb-1">Bonus</div>
          <div className="text-lg font-bold text-gray-900">$15K</div>
        </div>
      </div>

      {/* Upcoming Payroll */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-bold text-gray-900">Next Payroll</span>
          </div>
          <span className="text-xs font-semibold text-[#2F80ED] bg-[#2F80ED]/10 px-3 py-1 rounded-full">In 5 days</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-gray-900">$4,807.69</span>
          <span className="text-sm text-gray-500">after tax</span>
        </div>
      </div>

      {/* View Details Button */}
      <button className="w-full mt-5 py-3 bg-gradient-to-r from-[#27AE60] to-[#219653] hover:from-[#219653] hover:to-[#27AE60] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg">
        View Pay Details →
      </button>
    </div>
  );
}
