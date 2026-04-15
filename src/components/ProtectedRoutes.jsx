import { Outlet, useNavigate } from "react-router";
import { useSession, useIsAuthLoading } from "@/utils/authStore"

const ProtectedRoutes = () => {

    const session = useSession();
    const navigate = useNavigate();

    if (!session) { navigate('/') }
    
    return <Outlet />;
};


export default ProtectedRoutes;