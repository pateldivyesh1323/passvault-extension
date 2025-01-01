import { useCallback, useEffect, useState } from "react";
import { getPasswords } from "@/queries";
import { PassInterface } from "@/types";
import { useUserAuth } from "@/providers/UserAuthProvider";

export default function Passwords() {
    const { getAccessToken } = useUserAuth();

    const [passwords, setPasswords] = useState<PassInterface[]>([]);

    const fetchPasswords = useCallback(async () => {
        const token = await getAccessToken();
        const passwords = await getPasswords(token);
        setPasswords(passwords);
    }, [getAccessToken]);

    useEffect(() => {
        fetchPasswords();
    }, [fetchPasswords]);

    console.log(passwords);

    return <div>Passwords</div>;
}
