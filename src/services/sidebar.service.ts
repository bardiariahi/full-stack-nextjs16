import type { SidebarItem } from "@/src/config/sidebarItems";

type SidebarResponse = {
    items: SidebarItem[];
};

export async function getSidebar(): Promise<SidebarResponse> {
    const response = await fetch("/api/sidebar", {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.message || "Failed to load sidebar",
        );
    }

    return data;
}