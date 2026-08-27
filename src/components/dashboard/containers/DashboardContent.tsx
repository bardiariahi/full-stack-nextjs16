import React from "react";
import DashboardNavbar from "./navbar/DashboardNavbar";

type DCProps = {
    children: React.ReactNode;
};

const DashboardContent = ({ children }: DCProps) => {
    return (
        <div className="flex flex-col gap-5 w-full">
            <DashboardNavbar />
            {children}
        </div>
    );
};

export default DashboardContent;
