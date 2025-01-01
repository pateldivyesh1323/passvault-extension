import { Button } from "@/components/ui/button";
import { useUserAuth } from "@/providers/UserAuthProvider";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
    const { isAuthenticated } = useUserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/passwords");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="w-full flex items-center justify-center">
            <h1 className="text-2xl font-bold">Welcome to Passvault</h1>
            {isAuthenticated && (
                <Link to="/passwords">
                    <Button variant="link" className="text-white">
                        Go to Passwords
                    </Button>
                </Link>
            )}
        </div>
    );
}
