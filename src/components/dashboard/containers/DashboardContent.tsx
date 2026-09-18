import React from "react";
import DashboardNavbar from "./navbar/DashboardNavbar";

type DCProps = {
    children: React.ReactNode;
};

const DashboardContent = ({ children }: DCProps) => {
    return (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <DashboardNavbar />
            {children}
        </div>
    );
};

export default DashboardContent;
