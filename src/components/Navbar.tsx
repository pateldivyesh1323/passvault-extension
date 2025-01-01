import { useUserAuth } from "@/providers/UserAuthProvider";
import { Button } from "./ui/button";

export default function Navbar() {
    const { login, isAuthenticated, logout } = useUserAuth();

    return (
        <div className="w-full bg-black text-base shadow-lg px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Passvault</h1>
            {isAuthenticated ? (
                <Button variant="secondary" size="sm" onClick={logout}>
                    Logout
                </Button>
            ) : (
                <Button variant="secondary" size="sm" onClick={login}>
                    Login
                </Button>
            )}
        </div>
    );
}
