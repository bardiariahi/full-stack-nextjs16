export const ApiResponses = {
    OK: {
        status: 200,
        message: "Success",
    },

    CREATED: {
        status: 201,
        message: "Created successfully",
    },

    NO_CONTENT: {
        status: 204,
        message: "No content",
    },

    BAD_REQUEST: {
        status: 400,
        message: "Bad request",
    },

    UNAUTHORIZED: {
        status: 401,
        message: "Unauthorized",
    },

    FORBIDDEN: {
        status: 403,
        message: "Forbidden",
    },

    NOT_FOUND: {
        status: 404,
        message: "Not found",
    },

    CONFLICT: {
        status: 409,
        message: "Conflict",
    },

    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: "Something went wrong",
    },
} as const;

export type ApiResponseDefinition =
    (typeof ApiResponses)[keyof typeof ApiResponses];