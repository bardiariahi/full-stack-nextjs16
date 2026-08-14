import SwaggerClient from "./SwaggerClient";

export default function SwaggerPage() {
    if (process.env.NODE_ENV !== "development") {
        return null;
    }

    return <SwaggerClient />;
}