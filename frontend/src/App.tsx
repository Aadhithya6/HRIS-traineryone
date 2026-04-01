import { Routes, Route, Navigate } from 'react-router';
import { getUser } from './api/client';
import Login from './pages/Login';

// Employee
import EmployeeLayout from './pages/EmployeeLayout';
import EmployeeDashboard from './pages/EmployeeDashboard';
import LeavePage from './pages/employee/LeavePage';
import AttendancePage from './pages/employee/AttendancePage';
import PayrollPage from './pages/employee/PayrollPage';
import DocumentsPage from './pages/employee/DocumentsPage';
import TeamPage from './pages/employee/TeamPage';
import SettingsPage from './pages/employee/SettingsPage';

// Manager
import ManagerLayout from './pages/ManagerLayout';
import ManagerDashboard from './pages/ManagerDashboard';
import ManagerApprovalsPage from './pages/manager/ApprovalsPage';
import ManagerTeamPage from './pages/manager/TeamPage';
import ManagerTasksPage from './pages/manager/TasksPage';
import ManagerEscalationsPage from './pages/manager/EscalationsPage';
import ManagerDeadlinesPage from './pages/manager/DeadlinesPage';
import ManagerMeetingsPage from './pages/manager/MeetingsPage';
import ManagerWorkloadPage from './pages/manager/WorkloadPage';
import ManagerPerformancePage from './pages/manager/PerformancePage';
import ManagerTrainingPage from './pages/manager/TrainingPage';
import ManagerReportsPage from './pages/manager/ReportsPage';
import ManagerSettingsPage from './pages/manager/SettingsPage';

// HR
import HRLayout from './pages/HRLayout';
import HRDashboard from './pages/HRDashboard';
import ApprovalsPage from './pages/hr/ApprovalsPage';
import EmployeesPage from './pages/hr/EmployeesPage';
import HRLeavePage from './pages/hr/HRLeavePage';
import HRPayrollPage from './pages/hr/PayrollPage';
import RecruitmentPage from './pages/hr/RecruitmentPage';
import ReportsPage from './pages/hr/ReportsPage';
import AnalyticsPage from './pages/hr/AnalyticsPage';
import HRSettingsPage from './pages/hr/SettingsPage';

function ProtectedRoute({ role, children }: { role: string; children: React.ReactNode }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={`/${user.role}`} replace />;
  return <>{children}</>;
}

function RootRedirect() {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={`/${user.role}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />

      {/* Employee — layout route with nested pages */}
      <Route
        path="/employee"
        element={<ProtectedRoute role="employee"><EmployeeLayout /></ProtectedRoute>}
      >
        <Route index element={<EmployeeDashboard />} />
        <Route path="leave" element={<LeavePage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="payroll" element={<PayrollPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Manager — layout route with nested pages */}
      <Route
        path="/manager"
        element={<ProtectedRoute role="manager"><ManagerLayout /></ProtectedRoute>}
      >
        <Route index element={<ManagerDashboard />} />
        <Route path="approvals"   element={<ManagerApprovalsPage />}   />
        <Route path="team"        element={<ManagerTeamPage />}        />
        <Route path="tasks"       element={<ManagerTasksPage />}       />
        <Route path="escalations" element={<ManagerEscalationsPage />} />
        <Route path="deadlines"   element={<ManagerDeadlinesPage />}   />
        <Route path="meetings"    element={<ManagerMeetingsPage />}    />
        <Route path="workload"    element={<ManagerWorkloadPage />}    />
        <Route path="performance" element={<ManagerPerformancePage />} />
        <Route path="training"    element={<ManagerTrainingPage />}    />
        <Route path="reports"     element={<ManagerReportsPage />}     />
        <Route path="settings"    element={<ManagerSettingsPage />}    />
      </Route>

      {/* HR — layout route with nested pages */}
      <Route
        path="/hr"
        element={<ProtectedRoute role="hr"><HRLayout /></ProtectedRoute>}
      >
        <Route index element={<HRDashboard />} />
        <Route path="approvals"   element={<ApprovalsPage />}   />
        <Route path="employees"   element={<EmployeesPage />}   />
        <Route path="leave"       element={<HRLeavePage />}     />
        <Route path="payroll"     element={<HRPayrollPage />}   />
        <Route path="recruitment" element={<RecruitmentPage />} />
        <Route path="reports"     element={<ReportsPage />}     />
        <Route path="analytics"   element={<AnalyticsPage />}   />
        <Route path="settings"    element={<HRSettingsPage />}  />
      </Route>

      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
