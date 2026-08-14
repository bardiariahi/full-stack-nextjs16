import crypto from "crypto";
import { prisma } from "@/src/lib/prisma";

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30;
// 30 days

function generateToken() {
    return crypto.randomBytes(32).toString("hex");
}

function hashToken(token: string) {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}

export async function createSession(
    userId: string,
    rememberMe: boolean,
) {
    const token = generateToken();
    const tokenHash = hashToken(token);

    const duration = rememberMe
        ? SESSION_DURATION
        : 1000 * 60 * 60 * 24;
        // 1 day

    const expiresAt = new Date(Date.now() + duration);

    await prisma.session.create({
        data: {
            tokenHash,
            userId,
            expiresAt,
        },
    });

    return {
        token,
        expiresAt,
    };
}