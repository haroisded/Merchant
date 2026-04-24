import { 
    HomePage, 
    NotFound, 
    ProfilePage, 
    AuthPage, 
    FillUpPage, 
    CreateApplicationPage, 
    ApplicationPage 
} from "./pages";

import { useAuthActions, useSession, useProfile, useIsProfileMutating } from "./stores/authStore";
import { useIsAppMutating } from "./stores/applicationStore";
import { SessionRouteGuard, PublicRouteGuard } from "./RouteGuards";
import { GlobalLoader } from "./components";
import { fetchProfile } from "./utils/userData_queries";
import { useQuery } from "@tanstack/react-query";
import { Routes, Route } from "react-router";
import { useEffect } from 'react';
import supabase from './utils/supabase';


function App() {
    const { setSession, setProfile, setAuthLoading, setProfileLoading } = useAuthActions();
    const this_session = useSession();
    const this_profile = useProfile();

    const this_ProfileMutation = useIsProfileMutating();   
    console.log( "session and user", this_session, this_profile );


    // Session Event Listener
    useEffect(() => {
        const { data: { subscription }, } = supabase.auth.onAuthStateChange((event, session) => {
        
        console.log("event", event);
        if (event === "INITIAL_SESSION"){ 
            setAuthLoading(false)  
            if(!session) setProfileLoading(false) 
        }
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED"){ setSession(session) }
        if (event === "SIGNED_OUT"){ setSession(null); setProfile(null); }

        });
        return () => { subscription.unsubscribe(); };
    }, []);


    
    // Fetch User Handler
    const { data: fetchProfileData, error: fetchProfileError, 
            isLoading: fetchProfileLoading, isFetching: fetchProfileFetching } = useQuery({
      queryKey: ['user', this_session?.user?.id, 'profile'],
      queryFn: () => fetchProfile(this_session?.user?.id),

      enabled: !!this_session?.user?.id && !this_ProfileMutation,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      retry: 0,
    })

    if(fetchProfileLoading){ console.log("Is Loading( Profile )...") }
    if(fetchProfileFetching){ console.log("Is Fetching( Profile )...") }



    // User Profile Handler
    useEffect(() => {

        if(fetchProfileData === undefined && !fetchProfileError) return;

        if(fetchProfileData) setProfile(fetchProfileData)
        else if(fetchProfileData === null){ setProfile(null) }

        if(fetchProfileError) console.log("Error Fetching Fails")

        setProfileLoading(false)  

    }, [fetchProfileData, fetchProfileError])



    return (
        <>
        {/* Global Loading Overlay */}
        <GlobalLoader /> 

        <Routes>
            {/* Public Route Guard */}
            <Route element={<PublicRouteGuard />}>
                <Route path="/" element={<AuthPage />} />
            </Route>



            {/* Authenticated Route Guard */}
            <Route element={<SessionRouteGuard />}>
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/ApplicationPage" element={<ApplicationPage />} />


                <Route path="/FillUpPage" element={<FillUpPage />} /> 
                <Route path="/CreateApplicationPage" element={<CreateApplicationPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    );
}

export default App;