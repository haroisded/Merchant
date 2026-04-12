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


        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!mounted) return;
            setSession(session);
            setLoading(false);
            if (_event === "SIGNED_OUT") navigate("/"); // ← only redirect on actual sign out
        });
    

        return () => {
            mounted = false;
            subscription?.unsubscribe?.();
        };
    }, []);

    return null;
};


export default SessionHandler;