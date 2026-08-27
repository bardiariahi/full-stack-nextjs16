import { notFound } from "next/navigation";
import SwaggerClient from "./SwaggerClient";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'swagger',
  description: 'project swagger',
}

export default function SwaggerPage() {
    if (process.env.NODE_ENV !== "development") {
        notFound();
    }

    return <SwaggerClient />;
}