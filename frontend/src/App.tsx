import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

/* Layout Components */
import PublicNavbar from './components/layout/PublicNavbar';
import CitizenNavbar from './components/layout/CitizenNavbar';
import AdminSidebar from './components/layout/AdminSidebar';
import MobileBottomNav from './components/layout/MobileBottomNav';
import Footer from './components/layout/Footer';

/* Public Pages */
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';

/* Citizen Pages */
import Dashboard from './pages/citizen/Dashboard';
import ReportHazard from './pages/citizen/ReportHazard';
import MyReports from './pages/citizen/MyReports';
import HazardDetail from './pages/citizen/HazardDetail';
import Profile from './pages/citizen/Profile';

/* Admin Pages */
import AdminDashboard from './pages/admin/AdminDashboard';
import ReportsQueue from './pages/admin/ReportsQueue';
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';
import HotspotMap from './pages/admin/HotspotMap';
import DispatchDashboard from './pages/admin/DispatchDashboard';
import EmployeeTracker from './pages/admin/EmployeeTracker';

/* Employee Pages */
import MyAssignments from './pages/employee/MyAssignments';
import VerificationSubmission from './pages/employee/VerificationSubmission';

/* Misc */
import NotFound from './pages/NotFound';

import './App.css';

/* ── Layout Wrappers ── */

function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <main style={{ paddingTop: '72px', flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function CitizenLayout() {
  return (
    <>
      <CitizenNavbar />
      <main className="citizen-layout">
        <div className="container-wide">
          <Outlet />
        </div>
      </main>
      <MobileBottomNav />
    </>
  );
}

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-layout__main">
        <Outlet />
      </main>
    </div>
  );
}

function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<LandingPage />} />
        <Route path="/map" element={<LandingPage />} />
        <Route path="/reports" element={<LandingPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      {/* Citizen Routes */}
      <Route element={<ProtectedRoute allowedRoles={['citizen']} />}>
        <Route element={<CitizenLayout />}>
          <Route path="/citizen/dashboard" element={<Dashboard />} />
          <Route path="/citizen/report" element={<ReportHazard />} />
          <Route path="/citizen/my-reports" element={<MyReports />} />
          <Route path="/citizen/hazard/:id" element={<HazardDetail />} />
          <Route path="/citizen/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/reports-queue" element={<ReportsQueue />} />
          <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
          <Route path="/admin/hotspot-map" element={<HotspotMap />} />
          <Route path="/admin/dispatch" element={<DispatchDashboard />} />
          <Route path="/admin/employee-tracker" element={<EmployeeTracker />} />
        </Route>
      </Route>

      {/* Employee Routes */}
      <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/employee/assignments" element={<MyAssignments />} />
          <Route path="/employee/verify" element={<VerificationSubmission />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
