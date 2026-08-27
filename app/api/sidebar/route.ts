import { NextResponse } from "next/server";

import { sidebarItems } from "@/src/config/sidebarItems";
import { requireAuth } from "../auth/requireAuth";

export async function GET() {
    try {
        const session = await requireAuth();

        const permissions = new Set(
            session.user.roles.flatMap((userRole) =>
                userRole.role.permissions.map(
                    (rolePermission) =>
                        rolePermission.permission.name,
                ),
            ),
        );

        const items = sidebarItems
            .map((item) => {
                const children = item.children?.filter(
                    (child) =>
                        !child.permission ||
                        permissions.has(child.permission),
                );

                return {
                    ...item,
                    children,
                };
            })
            .filter((item) => {
                if (
                    item.permission &&
                    !permissions.has(item.permission)
                ) {
                    return false;
                }

                return true;
            });

        return NextResponse.json(
            {
                items,
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

        console.error("SIDEBAR ERROR:", error);

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