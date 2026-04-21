import { useAuthActions, useSession, useProfile, useIsMutating } from "./stores/authStore";
import { InsertUsers, FetchUsers, Home, NotFound, ProfilePage, AuthPage, FillUpPage } from "./pages";
import { SessionRouteGuard, PublicRouteGuard } from "./RouteGuards";
import { fetchProfile } from "./utils/userData_queries";
import { useQuery } from "@tanstack/react-query";
import { Routes, Route } from "react-router";
import { GlobalLoader } from "./components";
import { useEffect } from 'react';
import supabase from './utils/supabase';


function App() {
    const { setSession, setProfile, setAuthLoading, setProfileLoading } = useAuthActions();
    const this_session = useSession();
    const this_profile = useProfile();
    const this_mutation = useIsMutating();  
    console.log("session and user", this_session, this_profile);


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
    const { data: fetchProfileData, error: fetchProfileError, isLoading, isFetching } = useQuery({
      queryKey: ['user', this_session?.user?.id],
      queryFn: () => fetchProfile(this_session?.user?.id),

      enabled: !!this_session?.user?.id && !this_mutation,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      retry: 0,
    })

    if(isLoading){ console.log("Is Loading...") }
    if(isFetching){ console.log("Is Fetching...") }



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
            {/* Public Routes */}
            <Route element={<PublicRouteGuard />}>
                <Route path="/" element={<AuthPage />} />
            </Route>



            {/* Authenticated Routes */}
            <Route element={<SessionRouteGuard />}>
                <Route path="/Home" element={<Home />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/InsertUsers" element={<InsertUsers />} />
                <Route path="/FetchUsers" element={<FetchUsers />} />

                <Route path="/FillUpPage" element={<FillUpPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    );
}

export default App;