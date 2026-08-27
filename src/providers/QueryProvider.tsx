"use client";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import {
    ReactQueryDevtools,
} from "@tanstack/react-query-devtools";


type Props = {
    children: ReactNode;
};


export default function QueryProvider({
    children,
}: Props) {

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60,
                        retry: 1,
                    },
                },
            }),
    );


    return (
        <QueryClientProvider client={queryClient}>
            {children}

            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools />
            )}
        </QueryClientProvider>
    );
}