import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated } from '../features/auth/authSlice';
export default function PublicOnlyRoute() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    if (isAuthenticated) {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    return _jsx(Outlet, {});
}
