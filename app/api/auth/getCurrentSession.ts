import crypto from "crypto";
import { cookies } from "next/headers";

import { prisma } from "@/src/lib/prisma";

export async function getCurrentSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
        return null;
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const session = await prisma.session.findUnique({
        where: {
            tokenHash,
        },
        include: {
            user: {
                include: {
                    roles: {
                        include: {
                            role: {
                                include: {
                                    permissions: {
                                        include: {
                                            permission: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!session) {
        return null;
    }

    const now = new Date();

    if (session.expiresAt <= now) {
        await prisma.session.delete({
            where: {
                id: session.id,
            },
        });

        return null;
    }

    const user = session.user;

    if (user.status !== "ACTIVE") {
        return null;
    }

    if (user.activeFrom && user.activeFrom > now) {
        return null;
    }

    if (user.activeUntil && user.activeUntil <= now) {
        return null;
    }

    return session;
}
