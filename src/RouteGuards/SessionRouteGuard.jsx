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
        "/ApplicationPage": "app_editor", 
    }
    const requiredClaim = claimRoutes[location.pathname]


    // Route Logic Canceller
    if( isAuthLoading || isProfileLoading ){ return null }

    // Redirect Guards
    if(!!this_session?.user?.id === false){ return <Navigate to="/" replace /> }



    // "Unregistered Role" entrapment / forced redirect
    if(this_profile === null && location.pathname !== "/FillUpPage")
    { return <Navigate to="/FillUpPage" replace /> }

    // "Creator Role" entrapment / forced redirect
    if(role === "creator" && location.pathname !== "/CreateApplicationPage")
    { return <Navigate to="/CreateApplicationPage" replace /> }

    // "Editor Role" entrapment / forced redirect
    if(role === "app_editor" && location.pathname !== "/ApplicationPage")
    { return <Navigate to="/ApplicationPage" replace /> }



    // Invalid Access to Required Claim  
    if(this_profile && requiredClaim && role !== requiredClaim)
    { return <Navigate to={previousPath} replace /> }


    // previousPath handler ( since restricted paths handle redirect )
    if(!["/FillUpPage", "/CreateApplicationPage", "/ApplicationPage"].includes(location.pathname)){ 
    localStorage.setItem('previousPath', location.pathname)
    }
    
    return <Outlet />
}

export default SessionRouteGuard;