import { Outlet } from 'react-router';
import { Sidebar } from '../components/hr/sidebar';
import { Topbar } from '../components/hr/topbar';

export default function HRLayout() {
  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Inter, sans-serif', background: 'var(--hris-bg)', fontSize: '14px' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: '220px' }}>
        <Topbar />
        <div className="p-7 flex flex-col gap-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
