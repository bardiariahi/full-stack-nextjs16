import { comparePassword } from "@/src/lib/auth/password";
import { createSession } from "@/src/lib/auth/session";
import { prisma } from "@/src/lib/prisma";
import { loginSchema } from "@/src/schemas/auth/login.schema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // 1. دریافت اطلاعات از Frontend
        const body = await request.json();

        // 2. Validation با Zod
        const result = loginSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    message: "Invalid input",
                    errors: result.error.flatten(),
                },
                {
                    status: 400,
                },
            );
        }

        // 3. چون validation موفق شده،
        // result.data تایپ درست LoginFormValues را دارد
        const { email, password, rememberMe } = result.data;

        // فعلاً rememberMe را استفاده نکردیم
        console.log(rememberMe);

        // 4. پیدا کردن User
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // 5. User وجود ندارد
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

        // 6. بررسی Password
        const isPasswordValid = await comparePassword(
            password,
            user.passwordHash,
        );

        // 7. Password اشتباه است
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

        const session = await createSession(user.id, rememberMe);

        const cookieStore = await cookies();
        cookieStore.set("session", session.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: session.expiresAt,
            path: "/",
        });

        // 8. فعلاً Login موفق شده
        return NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        return NextResponse.json(
            {
                message: "Internal server error",
            },
            {
                status: 500,
            },
        );
    }
}
