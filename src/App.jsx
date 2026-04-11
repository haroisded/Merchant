import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import InsertUsers from "./pages/InsertUsers";
import FetchUsers from "./pages/FetchUsers";
import supabase from './utils/supabase';
import { useActions, useSession } from './utils/dataStore'


function App() {

	const { setSession, setUser } = useActions()
	const session = useSession()



	useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("event", event);
            console.log("session", session);
            if (event === "SIGNED_OUT") {
                setSession(null);
                setUser(null);
            } else if (session) {
                setSession(session);
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
            if (data) setUser(data);
        };
        if (session) fetchProfile();
    }, [session]);


	return (
	<Routes>

		<Route path="/">
			<Route index element={<Home />}/>
			<Route path="InsertUsers" element={<InsertUsers />}/>
			<Route path="FetchUsers" element={<FetchUsers />}/>
		</Route>

	</Routes>
	);
}

export default App;