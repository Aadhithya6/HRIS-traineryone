import { useState, useEffect } from 'react';
import { Zap, BarChart3, CalendarDays, TrendingUp, Users, FileText } from 'lucide-react';
import { Sidebar } from '../components/employee/sidebar';
import { TopBar } from '../components/employee/top-bar';
import { PendingTasks } from '../components/employee/pending-tasks';
import { QuickActions } from '../components/employee/quick-actions';
import { StatusCards } from '../components/employee/status-cards';
import { PlanningGrid } from '../components/employee/planning-grid';
import { GrowthGrid } from '../components/employee/growth-grid';
import { TeamSnapshot } from '../components/employee/team-snapshot';
import { PayBenefits } from '../components/employee/pay-benefits';
import { DocumentsVault } from '../components/employee/documents-vault';
import { LeaveModal } from '../components/employee/leave-modal';
import { LeaveHistory } from '../components/employee/leave-history';

export default function EmployeeDashboard() {
  const [currentTime, setCurrentTime]   = useState(new Date());
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [leaveRefreshKey, setLeaveRefreshKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-[#F3F4F6] to-[#E5E7EB]">
      {leaveModalOpen && (
        <LeaveModal
          onClose={() => setLeaveModalOpen(false)}
          onSuccess={() => setLeaveRefreshKey((k) => k + 1)}
        />
      )}

      <Sidebar />

      <div className="ml-64">
        <div className="max-w-[1400px] mx-auto px-7 py-8 pb-12">
          <div className="flex flex-col gap-6">
            <TopBar currentTime={currentTime} />

            <PendingTasks />

            <div className="flex items-center gap-3 text-sm uppercase tracking-wider font-bold text-foreground mt-2">
              <Zap className="w-5 h-5 text-[#F2C94C]" />
              <span>Quick Actions</span>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-border to-transparent" />
            </div>

            <QuickActions onApplyLeave={() => setLeaveModalOpen(true)} />

            <div className="flex items-center gap-3 text-sm uppercase tracking-wider font-bold text-foreground mt-4">
              <BarChart3 className="w-5 h-5 text-[#2F80ED]" />
              <span>Status</span>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-border to-transparent" />
            </div>

            <StatusCards currentTime={currentTime} />

            <div className="flex items-center gap-3 text-sm uppercase tracking-wider font-bold text-foreground mt-4">
              <CalendarDays className="w-5 h-5 text-[#27AE60]" />
              <span>Planning</span>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-border to-transparent" />
            </div>

            <PlanningGrid />

            <div className="flex items-center gap-3 text-sm uppercase tracking-wider font-bold text-foreground mt-4">
              <TrendingUp className="w-5 h-5 text-[#EB5757]" />
              <span>Growth</span>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-border to-transparent" />
            </div>

            <GrowthGrid />

            <div className="flex items-center gap-3 text-sm uppercase tracking-wider font-bold text-foreground mt-4">
              <Users className="w-5 h-5 text-[#2F80ED]" />
              <span>Team & Compensation</span>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TeamSnapshot />
              <PayBenefits />
            </div>

            <div className="flex items-center gap-3 text-sm uppercase tracking-wider font-bold text-foreground mt-4">
              <FileText className="w-5 h-5 text-[#56CCF2]" />
              <span>My Leave History</span>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-border to-transparent" />
            </div>

            <div key={leaveRefreshKey} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <LeaveHistory refreshKey={leaveRefreshKey} />
            </div>

            <div className="flex items-center gap-3 text-sm uppercase tracking-wider font-bold text-foreground mt-4">
              <FileText className="w-5 h-5 text-[#EB5757]" />
              <span>Documents</span>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-border to-transparent" />
            </div>

            <DocumentsVault />
          </div>
        </div>
      </div>
    </div>
  );
}
