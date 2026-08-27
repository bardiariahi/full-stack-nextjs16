import crypto from "crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";

const DashboardPage = async () => {
    // 1. Read HttpOnly cookie
    const cookieStore = await cookies();

    const token =
        cookieStore.get("session")?.value;

    // No cookie -> Login
    if (!token) {
        redirect("auth/login");
    }

    // 2. Hash token
    const tokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // 3. Find session
    const session =
        await prisma.session.findUnique({
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
                                                permission:
                                                    true,
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

    // Session does not exist
    if (!session) {
        redirect("auth/login");
    }

    // Session expired
    if (
        session.expiresAt <
        new Date()
    ) {
        await prisma.session.delete({
            where: {
                id: session.id,
            },
        });

        redirect("auth/login");
    }

    // User disabled / suspended / rejected
    if (
        session.user.status !==
        "ACTIVE"
    ) {
        redirect("auth/login");
    }

    // Get role names
    const roles =
        session.user.roles.map(
            (userRole) =>
                userRole.role.name,
        );

    // Get all permissions
    const permissions = Array.from(
        new Set(
            session.user.roles.flatMap(
                (userRole) =>
                    userRole.role.permissions.map(
                        (
                            rolePermission,
                        ) =>
                            rolePermission
                                .permission
                                .name,
                    ),
            ),
        ),
    );

    return (
        <main className="">
            <h1 className="mb-6 text-3xl font-bold">
                Dashboard
            </h1>

            <div className="space-y-4">
                <div>
                    <strong>
                        Email:
                    </strong>{" "}
                    {session.user.email}
                </div>

                <div>
                    <strong>
                        Status:
                    </strong>{" "}
                    {
                        session.user
                            .status
                    }
                </div>

                <div>
                    <strong>
                        Roles:
                    </strong>{" "}
                    {roles.join(", ")}
                </div>

                <div>
                    <strong>
                        Permissions:
                    </strong>

                    <ul className="mt-2 list-inside list-disc">
                        {permissions.map(
                            (
                                permission,
                            ) => (
                                <li
                                    key={
                                        permission
                                    }
                                >
                                    {
                                        permission
                                    }
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;