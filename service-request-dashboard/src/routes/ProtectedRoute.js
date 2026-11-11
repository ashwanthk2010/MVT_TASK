import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated } from '../features/auth/authSlice';
export default function ProtectedRoute() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const location = useLocation();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true, state: { from: location } });
    }
    return _jsx(Outlet, {});
}
