import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(Routes, { children: [_jsx(Route, { element: _jsx(PublicOnlyRoute, {}), children: _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }) }), _jsx(Route, { element: _jsx(ProtectedRoute, {}), children: _jsxs(Route, { element: _jsx(MainLayout, {}), children: [_jsx(Route, { path: "/dashboard", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "/requests", element: _jsx(ServiceRequestListPage, {}) }), _jsx(Route, { path: "/requests/new", element: _jsx(AddServiceRequestPage, {}) }), _jsx(Route, { path: "/requests/:id", element: _jsx(ServiceRequestDetailsPage, {}) }), _jsx(Route, { path: "/requests/:id/edit", element: _jsx(EditServiceRequestPage, {}) })] }) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }));
}
