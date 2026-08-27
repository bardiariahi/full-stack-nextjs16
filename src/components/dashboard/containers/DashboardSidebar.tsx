"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
    FaChevronDown,
    FaRightFromBracket,
} from "react-icons/fa6";

import ConfirmModal from "@/src/components/ui/modal/ConfirmModal";
import { sidebarIcons } from "@/src/config/sidebarIcons";
import { useSidebar } from "@/src/hooks/queries/useSidebar";
import { useUIStore } from "@/src/store/useUIStore";

import SidebarCollapse from "./SidebarCollapse";
import BardiaLogo from "./BardiaLogo";

const DashboardSidebar = () => {
    const pathname = usePathname();

    const isSidebarOpen = useUIStore(
        (state) => state.isSidebarOpen,
    );

    const openSidebar = useUIStore(
        (state) => state.openSidebar,
    );

    const [openMenus, setOpenMenus] =
        useState<string[]>([]);

    const [logoutModalOpen, setLogoutModalOpen] =
        useState(false);

    const [logoutLoading, setLogoutLoading] =
        useState(false);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useSidebar();

    const toggleMenu = (id: string) => {
        setOpenMenus((prev) =>
            prev.includes(id)
                ? prev.filter(
                      (itemId) => itemId !== id,
                  )
                : [...prev, id],
        );
    };

    const handleParentClick = (itemId: string) => {
        if (!isSidebarOpen) {
            openSidebar();

            setOpenMenus((prev) =>
                prev.includes(itemId)
                    ? prev
                    : [...prev, itemId],
            );

            return;
        }

        toggleMenu(itemId);
    };

    const handleLogout = async () => {
        try {
            setLogoutLoading(true);

            const response = await fetch(
                "/api/auth/logout",
                {
                    method: "POST",
                    credentials: "include",
                },
            );

            if (!response.ok) {
                throw new Error("Logout failed");
            }

            window.location.href = "/auth/login";
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLogoutLoading(false);
            setLogoutModalOpen(false);
        }
    };

    return (
        <>
            <aside
                className={`
                    relative flex h-full shrink-0 flex-col
                    bg-yellow-400
                    shadow-xl
                    transition-[width]
                    duration-300
                    ease-in-out
                    ${
                        isSidebarOpen
                            ? "w-72"
                            : "w-20"
                    }
                `}
            >
                <SidebarCollapse />

                <div className="shrink-0 px-4 pt-5">
                    <BardiaLogo
                        collapsed={!isSidebarOpen}
                    />
                </div>

                <div className="mt-8 min-h-0 flex-1 overflow-y-auto px-3">
                    {isLoading && (
                        <div className="flex justify-center pt-6">
                            <span className="loading loading-spinner loading-sm" />
                        </div>
                    )}

                    {isError && (
                        <p className="text-sm text-red-700">
                            {error.message}
                        </p>
                    )}

                    {!isLoading &&
                        !isError &&
                        data?.items.map((item) => {
                            const Icon =
                                sidebarIcons[item.icon];

                            const hasChildren =
                                !!item.children?.length;

                            const isMenuOpen =
                                openMenus.includes(
                                    item.id,
                                );

                            const isActive =
                                item.href &&
                                pathname === item.href;

                            if (hasChildren) {
                                return (
                                    <div
                                        key={item.id}
                                        className="mb-2"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleParentClick(
                                                    item.id,
                                                )
                                            }
                                            className="
                                                flex h-12 w-full
                                                cursor-pointer
                                                items-center
                                                gap-3
                                                rounded-2xl
                                                px-3
                                                text-slate-950
                                                transition-colors
                                                hover:bg-yellow-200/70
                                            "
                                        >
                                            <Icon
                                                size={21}
                                                className="shrink-0"
                                            />

                                            {isSidebarOpen && (
                                                <>
                                                    <span className="flex-1 text-left font-semibold">
                                                        {item.label}
                                                    </span>

                                                    <FaChevronDown
                                                        size={14}
                                                        className={`
                                                            shrink-0
                                                            transition-transform
                                                            duration-300
                                                            ${
                                                                isMenuOpen
                                                                    ? "rotate-180"
                                                                    : "rotate-0"
                                                            }
                                                        `}
                                                    />
                                                </>
                                            )}
                                        </button>

                                        {isSidebarOpen && (
                                            <div
                                                className={`
                                                    overflow-hidden
                                                    transition-all
                                                    duration-300
                                                    ease-in-out
                                                    ${
                                                        isMenuOpen
                                                            ? "max-h-96 opacity-100"
                                                            : "max-h-0 opacity-0"
                                                    }
                                                `}
                                            >
                                                <div className="ml-4 mt-1 space-y-1 rounded-2xl bg-yellow-100/70 p-2">
                                                    {item.children?.map(
                                                        (child) => {
                                                            const ChildIcon =
                                                                sidebarIcons[
                                                                    child.icon
                                                                ];

                                                            const childActive =
                                                                pathname ===
                                                                child.href;

                                                            return (
                                                                <Link
                                                                    key={
                                                                        child.id
                                                                    }
                                                                    href={
                                                                        child.href ||
                                                                        "#"
                                                                    }
                                                                    className={`
                                                                        flex h-10
                                                                        items-center
                                                                        gap-3
                                                                        rounded-xl
                                                                        px-3
                                                                        text-sm
                                                                        transition-colors
                                                                        ${
                                                                            childActive
                                                                                ? "bg-slate-950 text-yellow-400"
                                                                                : "text-slate-900 hover:bg-yellow-200"
                                                                        }
                                                                    `}
                                                                >
                                                                    <ChildIcon
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="shrink-0"
                                                                    />

                                                                    <span className="truncate">
                                                                        {
                                                                            child.label
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.id}
                                    href={item.href || "#"}
                                    className={`
                                        mb-2
                                        flex h-12
                                        items-center
                                        gap-3
                                        rounded-2xl
                                        px-3
                                        transition-colors
                                        ${
                                            isActive
                                                ? "bg-slate-950 text-yellow-400"
                                                : "text-slate-950 hover:bg-yellow-200/70"
                                        }
                                    `}
                                >
                                    <Icon
                                        size={21}
                                        className="shrink-0"
                                    />

                                    {isSidebarOpen && (
                                        <span className="truncate font-semibold">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                </div>

                <div className="shrink-0 px-4 pb-5 pt-4">
                    <div className="mb-4 h-px w-full bg-slate-950/70" />

                    <button
                        type="button"
                        onClick={() =>
                            setLogoutModalOpen(true)
                        }
                        className="
                            flex h-12
                            w-full
                            cursor-pointer
                            items-center
                            gap-3
                            rounded-2xl
                            bg-yellow-200/70
                            px-3
                            text-slate-950
                            transition-colors
                            hover:bg-yellow-200
                        "
                    >
                        <FaRightFromBracket
                            size={20}
                            className="shrink-0"
                        />

                        {isSidebarOpen && (
                            <span className="font-semibold">
                                Logout
                            </span>
                        )}
                    </button>
                </div>
            </aside>

            <ConfirmModal
                open={logoutModalOpen}
                title="Logout"
                message="Are you sure you want to logout?"
                confirmText="Logout"
                cancelText="Cancel"
                loading={logoutLoading}
                onCancel={() =>
                    setLogoutModalOpen(false)
                }
                onConfirm={handleLogout}
            />
        </>
    );
};

export default DashboardSidebar;