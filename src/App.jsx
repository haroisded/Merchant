// App.js
import { InsertUsers, FetchUsers, Home, NotFound, MyForm } from "./pages";
import { useEffect } from 'react';
import { useAuthActions } from './store/authStore';
import { Routes, Route } from "react-router";
import Register from "./components/Login_Register/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
    const { init } = useAuthActions();

    useEffect(() => {
        const cleanup = init();
        return cleanup;
    }, [init]);


    
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