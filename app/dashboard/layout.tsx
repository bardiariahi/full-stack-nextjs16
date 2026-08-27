import DashboardContainer from "@/src/components/dashboard/containers/DashboardContainer";
import DashboardContent from "@/src/components/dashboard/containers/DashboardContent";
import DashboardPadding from "@/src/components/dashboard/containers/DashboardPadding";
import DashboardSidebar from "@/src/components/dashboard/containers/DashboardSidebar";
import React from "react";

type LTypes = {
    children: React.ReactNode;
};

const layout = ({ children }: LTypes) => {
    return (
        <DashboardContainer>
            {/* <ToastProvider /> */}
            <DashboardSidebar />
            <DashboardContent>
                <DashboardPadding>{children}</DashboardPadding>
            </DashboardContent>
        </DashboardContainer>
    );
};

export default layout;
