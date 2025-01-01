import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Passwords from "./pages/Passwords";
// import { Button } from "./components/ui/button";

function App() {
    return (
        <div className="w-[350px] h-[550px] bg-neutral-900 text-white text-sm font-sans">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/passwords"
                    element={
                        <ProtectedRoute>
                            <Passwords />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
