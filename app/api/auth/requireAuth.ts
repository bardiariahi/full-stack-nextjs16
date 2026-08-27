import { getCurrentSession } from "./getCurrentSession";

export async function requireAuth() {
    const session = await getCurrentSession();

    if (!session) {
        throw new Error("UNAUTHORIZED");
    }

    return session;
}