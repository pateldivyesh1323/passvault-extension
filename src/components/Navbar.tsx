import { useUserAuth } from "@/providers/UserAuthProvider";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function Navbar() {
    const { login, isAuthenticated, isLoading, logout } = useUserAuth();

    return (
        <div className="w-full bg-black text-base shadow-lg px-4 py-4 flex justify-between items-center sticky top-0 z-50">
            <h1 className="text-xl font-bold">Passvault</h1>
            {isLoading ? (
                <Button variant="secondary" size="sm" disabled>
                    <Loader2 className="animate-spin" />
                </Button>
            ) : isAuthenticated ? (
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
