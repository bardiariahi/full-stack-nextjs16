export async function api<T>(
    endpoint: string,
    options?: RequestInit,
): Promise<T> {
    const response = await fetch(endpoint, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.message || `Request failed with status ${response.status}`,
        );
    }

    return data;
}
