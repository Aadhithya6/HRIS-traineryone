import { GreetingBanner } from '../components/hr/greeting-banner';
import { QuickActions } from '../components/hr/quick-actions';
import { MetricCards } from '../components/hr/metric-cards';
import { PendingApprovals } from '../components/hr/pending-approvals';
import { AlertsCalendar } from '../components/hr/alerts-calendar';
import { RecruitmentPipeline } from '../components/hr/recruitment-pipeline';
import { PayrollStatus } from '../components/hr/payroll-status';

export default function HRDashboard() {
  return (
    <>
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
    </>
  );
}
