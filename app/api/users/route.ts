import { prisma } from "@/src/lib/prisma";

import { errorResponse, successResponse } from "@/src/lib/apiResponse";

import { HttpStatus } from "@/src/constants/httpStatus";
import { requirePermission } from "../auth/requirePermission";

export async function GET() {
    try {
        await requirePermission("USER_READ");

        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                status: true,

                activeFrom: true,
                activeUntil: true,

                createdAt: true,
                updatedAt: true,

                roles: {
                    select: {
                        role: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },

            orderBy: {
                createdAt: "desc",
            },
        });

        return successResponse({
            message: "Users fetched successfully",

            data: {
                users,
            },

            status: HttpStatus.OK,
        });
    } catch (error) {
        if (error instanceof Error && error.message === "UNAUTHORIZED") {
            return errorResponse({
                message: "Unauthorized",
                status: HttpStatus.UNAUTHORIZED,
            });
        }

        if (error instanceof Error && error.message === "FORBIDDEN") {
            return errorResponse({
                message: "Forbidden",
                status: HttpStatus.FORBIDDEN,
            });
        }

        console.error("GET USERS ERROR:", error);

        return errorResponse({
            message: "Something went wrong",
            status: HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }
}
