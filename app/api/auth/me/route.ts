import { NextResponse } from "next/server";
import { requireAuth } from "../requireAuth";

export async function GET() {
    try {
        const session = await requireAuth();

        const roles = session.user.roles.map(
            (userRole) => userRole.role.name,
        );

        const permissions = session.user.roles.flatMap(
            (userRole) =>
                userRole.role.permissions.map(
                    (rolePermission) =>
                        rolePermission.permission.name,
                ),
        );

        return NextResponse.json(
            {
                user: {
                    id: session.user.id,
                    email: session.user.email,
                    status: session.user.status,
                    roles,
                    permissions,
                },
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "UNAUTHORIZED"
        ) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                {
                    status: 401,
                },
            );
        }

        console.error("GET CURRENT USER ERROR:", error);

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