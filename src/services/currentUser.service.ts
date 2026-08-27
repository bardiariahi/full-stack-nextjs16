export type CurrentUser = {
    id: string;
    email: string;
    status: string;
    roles: string[];
    permissions: string[];
};

export type CurrentUserResponse = {
    user: CurrentUser;
};

export async function getCurrentUser(): Promise<CurrentUserResponse> {
    const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.message ||
                "Failed to get current user",
        );
    }

    return data;
}