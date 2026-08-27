"use client";

import DashboardBreadcrumb from "./DashboardBreadcrumb";
import DashboardNotifications from "./DashboardNotifications";
import DashboardUser from "./DashboardUser";

const DashboardNavbar = () => {
    return (
        <header
            className="
                flex h-16 w-full
                shrink-0
                items-center
                justify-between
                border-b
                border-slate-200
                bg-white
                px-6
            "
        >
            <DashboardBreadcrumb />

            <div className="flex items-center gap-5">
                <DashboardNotifications />

                <div className="h-8 w-px bg-slate-200" />

                <DashboardUser />
            </div>
        </header>
    );
};

export default DashboardNavbar;