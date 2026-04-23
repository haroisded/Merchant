import { useSession, useProfile, useIsAuthLoading, useIsProfileLoading } from '@/stores/authStore';
import { Navigate, Outlet, useLocation } from 'react-router';

function SessionRouteGuard() {
    const location = useLocation()
    const this_session = useSession()
    const this_profile = useProfile()        
    const isAuthLoading = useIsAuthLoading()
    const isProfileLoading = useIsProfileLoading()
    const role = this_session?.user?.app_metadata?.role
    const previousPath = localStorage.getItem('previousPath') || '/HomePage'
    const claimRoutes = {
        "/FillUpPage": "unregistered",
        "/CreateApplicationPage": "creator",
        "/AdminPanel": "admin"
    }
    const requiredClaim = claimRoutes[location.pathname]


    // Route Logic Canceller
    if( isAuthLoading || isProfileLoading ){ return null }


    // Redirect Guards
    if(!!this_session?.user?.id === false){ return <Navigate to="/" replace /> }


    // Has session but no profile → "Fill up Form"
    if(this_profile === null && location.pathname !== "/FillUpPage")
    { return <Navigate to="/FillUpPage" replace /> }

   
    // Creator entrapment: if creator started CreateApplicationPage, keep them there
    if(role === "creator" && location.pathname !== "/CreateApplicationPage")
    { return <Navigate to="/CreateApplicationPage" replace /> }


    // Invalid Access to Required Claim  
    if(this_profile && requiredClaim && role !== requiredClaim)
    { return <Navigate to={previousPath} replace /> }


    if(!["/FillUpPage", "/CreateApplicationPage"].includes(location.pathname)){
    localStorage.setItem('previousPath', location.pathname)
    }
    
    return <Outlet />
}

export default SessionRouteGuard;