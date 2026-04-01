import { Outlet } from 'react-router';
import { Sidebar } from '../components/manager/sidebar';
import { TopBar } from '../components/manager/top-bar';

export default function ManagerLayout() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] relative overflow-x-hidden" style={{ fontFamily: 'sans-serif' }}>
      <Sidebar />
      <main className="ml-[240px] px-7 pb-10 relative z-10">
        <TopBar />
        <Outlet />
      </main>
    </div>
  );
}
