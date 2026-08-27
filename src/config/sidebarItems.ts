export type SidebarIcon = "dashboard" | "users" | "pendingUsers" | "userAdd";

export type SidebarItem = {
    id: string;
    label: string;
    href?: string;
    icon: SidebarIcon;
    permission?: string;
    children?: SidebarItem[];
};

export const sidebarItems: SidebarItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: "dashboard",
    },

    {
        id: "users",
        label: "Users",
        icon: "users",
        permission: "USER_READ",

        children: [
            {
                id: "all-users",
                label: "All Users",
                href: "/dashboard/users",
                icon: "users",
                permission: "USER_READ",
            },

            {
                id: "pending-users",
                label: "Pending Approval",
                href: "/dashboard/users/pending",
                icon: "pendingUsers",
                permission: "USER_ACTIVATE",
            },

            {
                id: "create-user",
                label: "Create User",
                href: "/dashboard/users/create",
                icon: "userAdd",
                permission: "USER_CREATE",
            },
        ],
    },
];
