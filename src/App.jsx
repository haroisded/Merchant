import { Routes, Route } from "react-router";
import Home from "@/pages/Home";
import InsertUsers from "@/pages/InsertUsers";
import FetchUsers from "@/pages/FetchUsers";


function App() {


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