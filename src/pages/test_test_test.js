    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("event", event);
            console.log("session", session);
            if (event === "SIGNED_OUT") {
    
            } else if (session) {

            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select()
                .eq("id", session.user.id)
                .single();
            if (error) console.log(error);
            if (data) setProfile(data);
        };
        if (session) fetchProfile();
    }, [session]);