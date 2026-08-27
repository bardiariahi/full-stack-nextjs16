import { NextResponse } from "next/server";
import crypto from "crypto";

import { cookies } from "next/headers";
import { prisma } from "@/src/lib/prisma";

export async function POST() {
    try {
        const cookieStore = await cookies();

        const token =
            cookieStore.get("session")?.value;

        if (token) {
            const tokenHash = crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");

            await prisma.session.deleteMany({
                where: {
                    tokenHash,
                },
            });
        }

        const response =
            NextResponse.json({
                message: "Logout successful",
            });

        response.cookies.delete("session");

        return response;
    } catch (error) {
        console.error("LOGOUT ERROR:", error);

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