export async function login(data: {
    email: string;
    password: string;
    rememberMe?: boolean;
}) {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    const responseData = await response
        .json()
        .catch(() => null);

    if (!response.ok) {
        throw new Error(
            responseData?.message ||
                "Login failed",
        );
    }

    return responseData;
}