import crypto from "crypto";

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
    try {
        // 1. Get email and password
        const body = await request.json();

        const { email, password, rememberMe } = body;

        if (!email || !password) {
            return NextResponse.json(
                {
                    message: "Email and password are required",
                },
                {
                    status: 400,
                },
            );
        }

        // 2. Find user
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // 3. User does not exist
        if (!user) {
            return NextResponse.json(
                {
                    message: "Invalid email or password",
                },
                {
                    status: 401,
                },
            );
        }

        // 4. Check password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash,
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    message: "Invalid email or password",
                },
                {
                    status: 401,
                },
            );
        }

        // 5. Check account status
        if (user.status !== "ACTIVE") {
            return NextResponse.json(
                {
                    message: "Your account is not active",
                },
                {
                    status: 403,
                },
            );
        }

        // 6. Generate random session token
        const token = crypto.randomBytes(32).toString("hex");

        // 7. Hash token before saving it in database
        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // 8. Session expiration
        const sessionDuration = rememberMe
            ? 30 * 24 * 60 * 60 * 1000
            : 24 * 60 * 60 * 1000;

        const expiresAt = new Date(
            Date.now() + sessionDuration,
        );

        // 9. Create session in database
        await prisma.session.create({
            data: {
                userId: user.id,
                tokenHash,
                expiresAt,
            },
        });

        // 10. Create response
        const response = NextResponse.json(
            {
                message: "Login successful",

                user: {
                    id: user.id,
                    email: user.email,
                    status: user.status,
                },
            },
            {
                status: 200,
            },
        );

        // 11. Save RAW token in HttpOnly Cookie
        response.cookies.set("session", token, {
            httpOnly: true,

            secure:
                process.env.NODE_ENV === "production",

            sameSite: "lax",

            path: "/",

            expires: expiresAt,
        });

        return response;
    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return NextResponse.json(
            {
                message: "Something went wrong",
            },
            {
                status: 500,
            },
        );
    }
}