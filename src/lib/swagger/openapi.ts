const openApiDocument = {
    openapi: "3.0.0",

    info: {
        title: "Full Stack Project API",
        version: "1.0.0",
        description: "API documentation",
    },

    servers: [
        {
            url: "/",
            description: "Current server",
        },
    ],

    components: {
        securitySchemes: {
            sessionCookie: {
                type: "apiKey",
                in: "cookie",
                name: "session",
                description: "Log in using POST /api/auth/login first. The browser sends the HttpOnly session cookie automatically.",
            },
        },
    },

    // Keep these operations in sync with the route handlers in app/api.
    paths: {
        "/api/auth/me": {
            get: {
                tags: ["Auth"],
                summary: "Get current user",
                description: "Returns the authenticated user's id, email, status, roles and permissions.",
                security: [{ sessionCookie: [] }],
                responses: {
                    "200": { description: "Current user returned in the user field" },
                    "401": { description: "Unauthorized" },
                    "500": { description: "Internal server error" },
                },
            },
        },
        "/api/auth/logout": {
            post: {
                tags: ["Auth"],
                summary: "Log out",
                description: "Deletes the current session and clears its cookie. Also succeeds when no session cookie exists.",
                responses: {
                    "200": { description: "Logout successful" },
                    "500": { description: "Internal server error" },
                },
            },
        },
        "/api/users": {
            get: {
                tags: ["Users"],
                summary: "List users",
                description: "Requires USER_READ permission. Returns data.users ordered by creation date, newest first, including roles and activation dates.",
                security: [{ sessionCookie: [] }],
                responses: {
                    "200": { description: "Users fetched successfully" },
                    "401": { description: "Unauthorized" },
                    "403": { description: "Missing USER_READ permission" },
                    "500": { description: "Internal server error" },
                },
            },
        },
        "/api/sidebar": {
            get: {
                tags: ["Sidebar"],
                summary: "Get sidebar items",
                description: "Returns items and their children filtered by the authenticated user's permissions.",
                security: [{ sessionCookie: [] }],
                responses: {
                    "200": { description: "Available sidebar items returned in the items field" },
                    "401": { description: "Unauthorized" },
                    "500": { description: "Internal server error" },
                },
            },
        },
        "/api/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Login user",
                description: "Authenticate user with email and password",

                requestBody: {
                    required: true,

                    content: {
                        "application/json": {
                            schema: {
                                type: "object",

                                required: ["email", "password"],

                                properties: {
                                    email: {
                                        type: "string",
                                        format: "email",
                                        example: "test@example.com",
                                    },

                                    password: {
                                        type: "string",
                                        format: "password",
                                        example: "Password@123",
                                    },

                                    rememberMe: {
                                        type: "boolean",
                                        example: true,
                                    },
                                },
                            },
                        },
                    },
                },

                responses: {
                    "200": {
                        description: "Login successful",
                    },

                    "400": {
                        description: "Invalid input",
                    },

                    "401": {
                        description: "Invalid email or password",
                    },

                    "403": {
                        description: "Account is not active",
                    },

                    "500": {
                        description: "Internal server error",
                    },
                },
            },
        },
        "/api/dev/create-admin": {
            post: {
                tags: ["Dev"],
                summary: "Create active admin user",

                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "password"],
                                properties: {
                                    email: {
                                        type: "string",
                                        format: "email",
                                        example: "admin@test.com",
                                    },
                                    password: {
                                        type: "string",
                                        example: "Admin@12345",
                                    },
                                },
                            },
                        },
                    },
                },

                responses: {
                    400: {
                        description: "Email and password are required",
                    },
                    201: {
                        description: "Admin created successfully",
                    },
                    409: {
                        description: "User already exists",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
    },
};

export default openApiDocument;
