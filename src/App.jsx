import { InsertUsers, FetchUsers, Home, NotFound, MyForm } from "./pages";
import { useAuthActions, useSession, useProfile, useIsMutating } from "./stores/authStore";
import { Register, FillUp_Profile, Login } from "./components/authentication";
import { SessionRouteGuard, PublicRouteGuard } from "./RouteGuards";
import { Routes, Route } from "react-router";
import { fetchProfile } from "./utils/userData_queries";
import { useQuery } from "@tanstack/react-query";
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
    const { data: fetchProfileData, isLoading, error: fetchProfileError } = useQuery({
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
      retryOnMount: false,
    })

    if(isLoading){ console.log("Fetching User...") }



    // Unregister Handler
    useEffect(() => {

        if(fetchProfileData === undefined && !fetchProfileError) return;

        if(fetchProfileData) setProfile(fetchProfileData)
        else if(fetchProfileData === null){ setProfile(null) }

        if(fetchProfileError) console.log("Error Fetching Fails")

        setProfileLoading(false)  

    }, [fetchProfileData, fetchProfileError])



    return (
        <Routes>
            {/* Authenticated */}
            <Route element={<PublicRouteGuard />}>
                <Route path="/" element={<Login />} />
                <Route path="/Register" element={<Register />} />
            </Route>


            {/* Protected routes */}
            <Route element={<SessionRouteGuard />}>
                <Route path="/Home" element={<Home />} />
                <Route path="/InsertUsers" element={<InsertUsers />} />
                <Route path="/FetchUsers" element={<FetchUsers />} />
                <Route path="/MyForm" element={<MyForm />} />
                <Route path="/FillUp_Profile" element={<FillUp_Profile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;