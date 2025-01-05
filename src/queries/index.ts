import environment from "@/environment";
import { encryptText } from "@/utils/helper";

export const getPasswords = async (token: string) => {
    const response = await fetch(`${environment.server_url}/api/password`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};

export const createPassword = async ({
    token,
    name,
    password,
    encryptionKey,
}: {
    token: string;
    name: string;
    password: string;
    encryptionKey: string;
}) => {
    const encryptedPassword = encryptText(password, encryptionKey);
    const response = await fetch(`${environment.server_url}/api/password`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password: encryptedPassword }),
    });
    const data = await response.json();
    return data;
};

export const deletePassword = async (token: string, id: string) => {
    const response = await fetch(
        `${environment.server_url}/api/password/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    return data;
};
