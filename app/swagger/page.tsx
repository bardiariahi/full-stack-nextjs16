import { notFound } from "next/navigation";
import SwaggerClient from "./SwaggerClient";

export default function SwaggerPage() {
    if (process.env.NODE_ENV !== "development") {
        notFound();
    }

    return <SwaggerClient />;
}