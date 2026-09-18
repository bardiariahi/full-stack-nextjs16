"use client";

import DashboardBreadcrumb from "./DashboardBreadcrumb";
import DashboardNotifications from "./DashboardNotifications";
import DashboardUser from "./DashboardUser";

const DashboardNavbar = () => {
    return (
        <header
            className="
                flex h-16 w-full min-w-0 gap-2
                shrink-0
                items-center
                justify-between
                border-b
                border-slate-200
                bg-white
                pl-6 pr-3 sm:pr-6
            "
        >
            <DashboardBreadcrumb />

            <div className="flex shrink-0 items-center gap-2 lg:gap-5">
                <DashboardNotifications />

                <div className="h-8 w-px bg-slate-200" />

                <DashboardUser />
            </div>
        </header>
    );
};

export default DashboardNavbar;