"use client";

import { useQuery } from "@tanstack/react-query";

import { getSidebar } from "@/src/services/sidebar.service";

export function useSidebar() {
    return useQuery({
        queryKey: ["sidebar"],
        queryFn: getSidebar,
        staleTime: 5 * 60 * 1000,
    });
}