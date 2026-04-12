import supabase from "@/utils/supabase";
import { useEffect } from "react";
import { useActions } from "@/utils/dataStore";
import { useNavigate } from "react-router";

const SessionHandler = () => {
    const { setSession, setLoading } = useActions();
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        supabase.auth.getSession()
            .then(({ data: { session } }) => {
                if (!mounted) return;
                setSession(session);
                setLoading(false);
            })
            .catch((err) => {
                console.error("getSession error", err);
                setLoading(false);
            });


        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (!mounted) return;

          if (event === "SIGNED_IN" && session?.user?.app_metadata?.provider === "google") {
              // Store email temporarily in the supabase, then kill session
              /*

              SUPABASE CODE

              */
              supabase.auth.signOut();
              return;
          }

          setSession(session);
          setLoading(false);
          if (event === "SIGNED_OUT") navigate("/");
        });
    

        return () => {
          mounted = false;
          subscription?.unsubscribe?.();
        };
    }, []);

    return null;
};


export default SessionHandler;