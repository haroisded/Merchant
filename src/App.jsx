import SessionHandler from './utils/SessionHandler';
import { Routes, Route } from "react-router";
import { InsertUsers, FetchUsers, Home, NotFound } from "./pages";
import Register from "./components/Login_Register/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
    return (
        <>
            <SessionHandler />

        
            <Routes>
                <Route path="/" element={<Register />} />

                <Route element={<ProtectedRoutes />}>
                    <Route path="Home" element={<Home />} />
                    <Route path="InsertUsers" element={<InsertUsers />} />
                    <Route path="FetchUsers" element={<FetchUsers />} />
                </Route>

                <Route path="*" element={<NotFound />}/>
            </Routes>
        </>
    );
}

export default App;