"use client";

import { FaChevronLeft } from "react-icons/fa6";

import { useUIStore } from "@/src/store/useUIStore";

const SidebarCollapse = () => {
    const isSidebarOpen = useUIStore(
        (state) => state.isSidebarOpen,
    );

    const toggleSidebar = useUIStore(
        (state) => state.toggleSidebar,
    );

    return (
        <button
            type="button"
            onClick={toggleSidebar}
            aria-label={
                isSidebarOpen
                    ? "Collapse sidebar"
                    : "Expand sidebar"
            }
            className="
                absolute top-5 -right-5 z-50
                flex h-10 w-10
                items-center justify-center
                rounded-full
                border-4 border-white
                bg-slate-950
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
                active:scale-95
            "
        >
            <FaChevronLeft
                size={16}
                className={`
                    transition-transform
                    duration-300
                    ${
                        isSidebarOpen
                            ? "rotate-0"
                            : "rotate-180"
                    }
                `}
            />
        </button>
    );
};

export default SidebarCollapse;