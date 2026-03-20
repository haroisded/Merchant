import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import supabase from "./utils/supabase"
import { useEffect, useState } from "react";
import SessionContext from "./context/SessionContext"


function App() {

	const [session, setSession] = useState(0);


	useEffect(() => {	
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
		setSession(session);
	});

        // call unsubscribe to remove the callback
        return () => data.subscription.unsubscribe();
    }, []);


	useEffect(() => {
		console.log("Session from app.jsx");
	}, [session]);



	return (
	<SessionContext.Provider value={session}>
			<Routes>

						<Route path="/">
									<Route index element={<Home />}/>
						</Route>

			</Routes>
	</SessionContext.Provider>
	);
}

export default App;