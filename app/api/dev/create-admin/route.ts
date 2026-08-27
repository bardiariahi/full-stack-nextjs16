import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { email, password } = body;

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

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    message: "User already exists",
                },
                {
                    status: 409,
                },
            );
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const adminRole = await prisma.role.findUnique({
            where: {
                name: "ADMIN",
            },
        });

        if (!adminRole) {
            return NextResponse.json(
                {
                    message: "ADMIN role not found. Run database seed first.",
                },
                {
                    status: 500,
                },
            );
        }

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,

                status: "ACTIVE",

                activatedAt: new Date(),
                activationType: "SYSTEM",

                roles: {
                    create: {
                        roleId: adminRole.id,
                    },
                },
            },

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
        });

        return NextResponse.json(
            {
                message: "Admin user created successfully",

                user: {
                    id: user.id,
                    email: user.email,
                    status: user.status,

                    roles: user.roles.map((userRole) => ({
                        name: userRole.role.name,

                        permissions: userRole.role.permissions.map(
                            (rolePermission) =>
                                rolePermission.permission.name,
                        ),
                    })),
                },
            },
            {
                status: 201,
            },
        );
    } catch (error) {
        console.error(error);

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