import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated, redirect = '/' }) => {
    if (!isAuthenticated) return <Navigate to={redirect} />
    return children ? children : <Outlet />
}

export default ProtectedRoute;