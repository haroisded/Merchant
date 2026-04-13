import { Navigate, Outlet, useLocation } from "react-router";
import { useSession, useIsLoading } from "@/utils/dataStore";

const ProtectedRoutes = () => {
    const session = useSession();
    const isLoading = useIsLoading();
    const location = useLocation();

    if (isLoading) return null;

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