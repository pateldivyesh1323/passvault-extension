import environment from "@/environment";

export const getPasswords = async (token: string) => {
    const response = await fetch(`${environment.server_url}/api/password`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
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
