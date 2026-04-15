import { Navigate, Outlet, useLocation } from "react-router";
import { useSession, useIsAuthLoading } from "@/utils/authStore"

const ProtectedRoutes = () => {

    const session = useSession();
    const isAuthLoading = useIsAuthLoading();
    const location = useLocation();

    if (isAuthLoading) return null;

    if (!session) {
        // Only store if we're not already on the login page
        if (location.pathname !== "/") {
            localStorage.setItem("redirectPath", location.pathname);
        }
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};


export default ProtectedRoutes;