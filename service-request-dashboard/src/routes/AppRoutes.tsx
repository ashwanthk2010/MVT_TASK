import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ServiceRequestListPage from '../pages/ServiceRequestListPage';
import AddServiceRequestPage from '../pages/AddServiceRequestPage';
import ServiceRequestDetailsPage from '../pages/ServiceRequestDetailsPage';
import EditServiceRequestPage from '../pages/EditServiceRequestPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/requests" element={<ServiceRequestListPage />} />
          <Route path="/requests/new" element={<AddServiceRequestPage />} />
          <Route path="/requests/:id" element={<ServiceRequestDetailsPage />} />
          <Route path="/requests/:id/edit" element={<EditServiceRequestPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
