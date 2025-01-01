import { useCallback, useEffect, useState } from "react";
import { getPasswords } from "@/queries";
import { PassInterface } from "@/types";
import { useUserAuth } from "@/providers/UserAuthProvider";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function Passwords() {
    const { getAccessToken } = useUserAuth();

    const [passwords, setPasswords] = useState<PassInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPasswords = useCallback(async () => {
        try {
            const token = await getAccessToken();
            const passwords = await getPasswords(token);
            setPasswords(passwords);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [getAccessToken]);

    useEffect(() => {
        fetchPasswords();
    }, [fetchPasswords]);

    return (
        <div className="overflow-hidden w-[95vw] mx-auto p-4 rounded-lg border border-neutral-700">
            {isLoading ? (
                <div className="flex justify-center items-center gap-2">
                    <Loader className="animate-spin" /> Loading Passwords.....
                </div>
            ) : (
                <Table className="min-w-full text-left h-fit border-separate border-spacing-0">
                    <TableCaption>Your Passwords</TableCaption>
                    <TableHead className="bg-neutral-800">
                        <TableRow>
                            <TableCell className="font-semibold text-white">
                                Name
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {passwords.map((password) => (
                            <TableRow key={password._id}>
                                <TableCell className="text-neutral-200 border border-neutral-700 cursor-pointer">
                                    {password.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
