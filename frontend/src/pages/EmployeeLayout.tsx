import { Outlet } from 'react-router';
import { Sidebar } from '../components/employee/sidebar';

export default function EmployeeLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-[#F3F4F6] to-[#E5E7EB]">
      <Sidebar />
      <div className="ml-64">
        <div className="max-w-[1400px] mx-auto px-7 py-8 pb-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
