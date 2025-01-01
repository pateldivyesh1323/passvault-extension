import { Button } from "@/components/ui/button";
import { useUserAuth } from "@/providers/UserAuthProvider";
import { Link } from "react-router-dom";

export default function Home() {
    const { isAuthenticated } = useUserAuth();

    return (
        <div className="w-full flex items-center justify-center">
            Home
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
