import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
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
				<Route path="/" element={<Home />} />
				{ !session && <Route path="/register" element={<Register />} /> }
				{ !session && <Route path="/Signin" element={<Signin />} /> }
			</Routes>
	</SessionContext.Provider>
	);
}

export default App;
