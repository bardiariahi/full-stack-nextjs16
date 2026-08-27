import { NextResponse } from "next/server";

import {
    ApiResponses,
    type ApiResponseDefinition,
} from "@/src/constants/apiResponses";

type SuccessResponseOptions<T> = {
    data?: T;
    message?: string;
    response?: ApiResponseDefinition;
};

type ErrorResponseOptions = {
    message?: string;
    response?: ApiResponseDefinition;
};

export function successResponse<T>({
    data,
    message,
    response = ApiResponses.OK,
}: SuccessResponseOptions<T>) {
    return NextResponse.json(
        {
            success: true,
            message: message ?? response.message,
            data: data ?? null,
        },
        {
            status: response.status,
        },
    );
}

export function errorResponse({
    message,
    response = ApiResponses.INTERNAL_SERVER_ERROR,
}: ErrorResponseOptions = {}) {
    return NextResponse.json(
        {
            success: false,
            message: message ?? response.message,
            data: null,
        },
        {
            status: response.status,
        },
    );
}