import environment from "@/environment";

export const getPasswords = async (token: string) => {
    const response = await fetch(`${environment.server_url}/api/password`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.json();
};
