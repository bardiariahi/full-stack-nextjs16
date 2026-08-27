import { requireAuth } from "./requireAuth";

export async function requirePermission(
    permissionName: string,
) {
    const session = await requireAuth();

    const permissions =
        session.user.roles.flatMap((userRole) =>
            userRole.role.permissions.map(
                (rolePermission) =>
                    rolePermission.permission.name,
            ),
        );

    if (!permissions.includes(permissionName)) {
        throw new Error("FORBIDDEN");
    }

    return session;
}