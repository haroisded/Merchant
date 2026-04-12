import { Navigate, Outlet, useLocation } from "react-router";
import { useSession, useIsLoading } from "@/utils/dataStore";

const ProtectedRoutes = () => {
    const session = useSession();
    const isLoading = useIsLoading();
    const location = useLocation();

    if (isLoading) return null;

    localStorage.setItem("redirectPath", location.pathname); // ← always store the path

    if (!session) { return <Navigate to="/" replace />; }

    return <Outlet />;
};


export default ProtectedRoutes;