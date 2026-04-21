import { useSession, useProfile, useIsAuthLoading } from '@/stores/authStore';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useIsProfileLoading } from '../stores/authStore';

function PublicRouteGuard() {
    const location = useLocation()
    const this_session = useSession()
    const this_profile = useProfile()
    const isAuthLoading = useIsAuthLoading()
    const isProfileLoading = useIsProfileLoading()

    if( isAuthLoading || isProfileLoading ) return null

    // No session → show Register ✅
    if(!this_session?.user?.id) return <Outlet />

    // Authenticated Empty Profiles Redirect
    if( !!this_session?.user?.id === true && this_profile === null && location.pathname !== "/FillUpPage" )
    { return <Navigate to="/FillUpPage" replace /> }

    // Not Allowing To Touch Register
    return <Navigate to="/Home" replace />
}

export default PublicRouteGuard;