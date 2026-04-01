import { Sidebar } from '../components/hr/sidebar';
import { Topbar } from '../components/hr/topbar';
import { GreetingBanner } from '../components/hr/greeting-banner';
import { QuickActions } from '../components/hr/quick-actions';
import { MetricCards } from '../components/hr/metric-cards';
import { PendingApprovals } from '../components/hr/pending-approvals';
import { AlertsCalendar } from '../components/hr/alerts-calendar';
import { RecruitmentPipeline } from '../components/hr/recruitment-pipeline';
import { PayrollStatus } from '../components/hr/payroll-status';

export default function HRDashboard() {
  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Inter, sans-serif', background: 'var(--hris-bg)', fontSize: '14px' }}>
      <Sidebar />

      <div className="flex-1 flex flex-col" style={{ marginLeft: '220px' }}>
        <Topbar />

        <div className="p-7 flex flex-col gap-6">
          <GreetingBanner />
          <QuickActions />

          <div className="grid grid-cols-[1.6fr_1fr] gap-5">
            <PendingApprovals />
            <AlertsCalendar />
          </div>

          <MetricCards />

          <div className="grid grid-cols-2 gap-5">
            <RecruitmentPipeline />
            <PayrollStatus />
          </div>
        </div>
      </div>
    </div>
  );
}
