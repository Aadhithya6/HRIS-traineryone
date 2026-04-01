import { Sidebar } from '../components/manager/sidebar';
import { TopBar } from '../components/manager/top-bar';
import { GlobalAlert } from '../components/manager/global-alert';
import { ActionZone } from '../components/manager/action-zone';
import { ControlZone } from '../components/manager/control-zone';
import { InsightZone } from '../components/manager/insight-zone';

export default function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] relative overflow-x-hidden" style={{ fontFamily: 'sans-serif' }}>
      <Sidebar />

      <main className="ml-[240px] px-7 pb-10 relative z-10">
        <TopBar />
        <GlobalAlert />
        <ActionZone />
        <ControlZone />
        <InsightZone />
      </main>
    </div>
  );
}
