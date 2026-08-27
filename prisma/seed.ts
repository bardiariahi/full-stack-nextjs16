import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.role.upsert({
        where: {
            name: "USER",
        },
        update: {},
        create: {
            name: "USER",
        },
    });

    const adminRole = await prisma.role.upsert({
        where: {
            name: "ADMIN",
        },
        update: {},
        create: {
            name: "ADMIN",
        },
    });

    const permissionNames = [
        "USER_READ",
        "USER_CREATE",
        "USER_UPDATE",
        "USER_DELETE",
        "USER_ACTIVATE",
        "USER_DEACTIVATE",
        "USER_REJECT",
        "USER_MANAGE_ACCESS_PERIOD",
    ];

    const permissions = [];

    for (const name of permissionNames) {
        const permission = await prisma.permission.upsert({
            where: {
                name,
            },
            update: {},
            create: {
                name,
            },
        });

        permissions.push(permission);
    }

    for (const permission of permissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: adminRole.id,
                    permissionId: permission.id,
                },
            },
            update: {},
            create: {
                roleId: adminRole.id,
                permissionId: permission.id,
            },
        });
    }

    console.log("✅ Roles and permissions seeded.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
