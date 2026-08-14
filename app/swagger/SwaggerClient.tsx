"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import openApiDocument from "@/src/lib/swagger/openapi";

export default function SwaggerClient() {
    return <SwaggerUI spec={openApiDocument} />;
}