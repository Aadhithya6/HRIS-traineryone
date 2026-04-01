import { GlobalAlert } from '../components/manager/global-alert';
import { ActionZone } from '../components/manager/action-zone';
import { ControlZone } from '../components/manager/control-zone';
import { InsightZone } from '../components/manager/insight-zone';

export default function ManagerDashboard() {
  return (
    <>
      <GlobalAlert />
      <ActionZone />
      <ControlZone />
      <InsightZone />
    </>
  );
}
