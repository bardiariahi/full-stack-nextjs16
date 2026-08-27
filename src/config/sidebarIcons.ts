import type { IconType } from "react-icons";

import { FaGaugeHigh, FaUserClock, FaUserPlus, FaUsers } from "react-icons/fa6";

import type { SidebarIcon } from "./sidebarItems";

export const sidebarIcons: Record<SidebarIcon, IconType> = {
    dashboard: FaGaugeHigh,
    users: FaUsers,
    pendingUsers: FaUserClock,
    userAdd: FaUserPlus,
};
