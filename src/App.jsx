// App.js
import { InsertUsers, FetchUsers, Home, NotFound, MyForm } from "./pages";
import { useAuthActions, useSession, useUser } from "./utils/authStore";
import { Routes, Route } from "react-router";
import { useEffect } from 'react';
import Register from "./components/Login_Register/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
    const { setSession, setUser } = useAuthActions()
    const seeTheSession = useSession()
    const seeTheUser = useUser()


    useEffect(() => {
    let lastSession = null; // track previous session outside callback

    console.log



    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {

        // Only act if the session actually changed
        if (session?.user?.id !== lastSession?.user?.id) {
        lastSession = session;
        
            if (event === "SIGNED_OUT") {
                setSession(null);
                setUser(null);
            } else if (session) { setSession(session); }
        
        }
    });

    return () => subscription.unsubscribe();
    }, []);


    
    return (  
        <Routes>
            <Route path="/" element={<Register />} />

            <Route element={<ProtectedRoutes />}>
                <Route path="Home" element={<Home />} />
                <Route path="InsertUsers" element={<InsertUsers />} />
                <Route path="FetchUsers" element={<FetchUsers />} />
                <Route path="MyForm" element={<MyForm />} />
            </Route>

            <Route path="*" element={<NotFound />}/>
        </Routes>
    );
}

export default App;