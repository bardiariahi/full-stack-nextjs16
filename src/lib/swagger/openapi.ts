const openApiDocument = {
    openapi: "3.0.0",

    info: {
        title: "Full Stack Project API",
        version: "1.0.0",
        description: "API documentation",
    },

    servers: [
        {
            url: "http://localhost:3000",
            description: "Local development",
        },
    ],

    paths: {
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

                                required: ["email", "password", "rememberMe"],

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
