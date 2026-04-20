import { useSession, useProfile, useIsAuthLoading } from '@/stores/authStore';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useIsProfileLoading } from '../stores/authStore';

function SessionRouteGuard() {
    const location = useLocation()
    const this_session = useSession()
    const this_profile = useProfile()        
    const isAuthLoading = useIsAuthLoading()
    const isProfileLoading = useIsProfileLoading()
    const role = this_session?.user?.app_metadata?.role
    const previousPath = localStorage.getItem('previousPath') || '/Home'
    const claimRoutes = {
        "/FillUpPage": "unregistered",
        "/AdminPanel": "admin",
    }
    const requiredClaim = claimRoutes[location.pathname]


    // Route Logic Canceller
    if(isAuthLoading || isProfileLoading){ return null }

    // Redirect Guards
    if(!!this_session?.user?.id === false){ return <Navigate to="/" replace /> }

    // Has session but no profile → fill up form
    if(this_profile === null && location.pathname !== "/FillUpPage")
    { return <Navigate to="/FillUpPage" replace /> }

    // Required Claim
    if(this_profile && requiredClaim && role !== requiredClaim){ return <Navigate to={previousPath} replace /> }


    // Only store if not on /FillUpPage
    if(location.pathname !== "/FillUpPage"){ localStorage.setItem('previousPath', location.pathname) }
    return <Outlet />
}

export default SessionRouteGuard;