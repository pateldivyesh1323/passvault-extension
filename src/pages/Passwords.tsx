import { useCallback, useEffect, useState } from "react";
import { createPassword, deletePassword, getPasswords } from "@/queries";
import { PassInterface } from "@/types";
import { useUserAuth } from "@/providers/UserAuthProvider";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Eye, Loader, PlusCircle, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Passwords() {
    const { getAccessToken } = useUserAuth();

    const [passwords, setPasswords] = useState<PassInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [createPasswordForm, setCreatePasswordForm] = useState({
        name: "",
        password: "",
        encryptionKey: "",
    });

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

    const handleCreatePasswordFormChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCreatePasswordForm({
            ...createPasswordForm,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        fetchPasswords();
    }, [fetchPasswords]);

    const handleCreatePassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        try {
            const { name, password, encryptionKey } = createPasswordForm;
            if (!name || !password || !encryptionKey) {
                toast.error("Please fill all fields");
                return;
            }
            const token = await getAccessToken();
            const data = await createPassword({
                token,
                name,
                password,
                encryptionKey,
            });
            toast.success(data?.message || "Password created successfully");
            fetchPasswords();
            setCreatePasswordForm({
                name: "",
                password: "",
                encryptionKey: "",
            });
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const handleDeletePassword = async (id: string) => {
        try {
            const token = await getAccessToken();
            await deletePassword(token, id);
            toast.success("Password deleted successfully");
            fetchPasswords();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="overflow-hidden w-[95vw] mx-auto p-4 border-neutral-700">
            {isLoading ? (
                <div className="flex justify-center items-center gap-2">
                    <Loader className="animate-spin" /> Loading Passwords.....
                </div>
            ) : (
                <Table className="text-left h-fit border-separate border-spacing-0">
                    <TableHead>
                        <TableRow className="flex justify-between items-center">
                            <TableCell className="font-semibold text-white">
                                Your Passwords
                            </TableCell>
                            <TableCell className="font-semibold">
                                <Dialog>
                                    <DialogTrigger>
                                        <Button
                                            variant="outline"
                                            color="white"
                                            className="flex items-center gap-2"
                                        >
                                            <PlusCircle className="h-4 w-4" />
                                            Create
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[95%]">
                                        <DialogHeader>
                                            <DialogTitle className="mb-4">
                                                Create new password
                                            </DialogTitle>
                                            <form
                                                onSubmit={handleCreatePassword}
                                                className="flex flex-col gap-2"
                                            >
                                                <Input
                                                    placeholder="Name"
                                                    type="text"
                                                    name="name"
                                                    value={
                                                        createPasswordForm.name
                                                    }
                                                    onChange={
                                                        handleCreatePasswordFormChange
                                                    }
                                                />
                                                <Input
                                                    placeholder="Password"
                                                    type="password"
                                                    name="password"
                                                    value={
                                                        createPasswordForm.password
                                                    }
                                                    onChange={
                                                        handleCreatePasswordFormChange
                                                    }
                                                />
                                                <Input
                                                    placeholder="Decryption Key: Remember this key"
                                                    type="password"
                                                    name="encryptionKey"
                                                    value={
                                                        createPasswordForm.encryptionKey
                                                    }
                                                    onChange={
                                                        handleCreatePasswordFormChange
                                                    }
                                                />
                                                <DialogClose asChild>
                                                    <Button type="submit">
                                                        Create
                                                    </Button>
                                                </DialogClose>
                                            </form>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {passwords.map((password) => (
                            <TableRow key={password._id}>
                                <TableCell className="text-neutral-200 border border-neutral-700 cursor-pointer group">
                                    <div className="flex justify-between items-center">
                                        <span className="overflow-hidden whitespace-nowrap truncate w-[100%] group-hover:w-[80%] transition-all">
                                            {password.name}
                                        </span>
                                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Eye
                                                        className="h-4 w-4"
                                                        fill="neutral-200"
                                                    />
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Are you absolutely
                                                            sure?
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            This action cannot
                                                            be undone. This will
                                                            permanently delete
                                                            your account and
                                                            remove your data
                                                            from our servers.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Trash2
                                                        className="h-4 w-4"
                                                        fill="neutral-200"
                                                    />
                                                </DialogTrigger>
                                                <DialogContent className="w-[80%]">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Are you sure you
                                                            want to delete the
                                                            password?
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => {
                                                                    handleDeletePassword(
                                                                        password._id
                                                                    );
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button
                                                                type="button"
                                                                variant="secondary"
                                                                size="sm"
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
