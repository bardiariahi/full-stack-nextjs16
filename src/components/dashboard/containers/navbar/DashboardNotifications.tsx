"use client";

import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa6";

const DashboardNotifications = () => {
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // Temporary
    // Later this will come from the API.
    const unreadCount = 3;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Notifications"
                className="
                    relative
                    flex h-10 w-10
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-xl
                    text-slate-600
                    transition-colors
                    hover:bg-slate-100
                    hover:text-slate-950
                "
            >
                <FaBell size={20} />

                {unreadCount > 0 && (
                    <span
                        className="
                            absolute
                            -right-1
                            -top-1
                            flex h-5
                            min-w-5
                            items-center
                            justify-center
                            rounded-full
                            bg-red-600
                            px-1
                            text-[10px]
                            font-bold
                            text-white
                        "
                    >
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div
                    className="
                        fixed
                        right-3
                        top-16
                        sm:absolute sm:right-0 sm:top-12
                        z-50
                        w-80 max-w-[calc(100vw-1.5rem)]
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        shadow-xl
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-slate-100
                            px-4
                            py-3
                        "
                    >
                        <h3
                            className="
                                font-semibold
                                text-slate-950
                            "
                        >
                            Notifications
                        </h3>

                        {unreadCount > 0 && (
                            <span
                                className="
                                    rounded-full
                                    bg-slate-100
                                    px-2
                                    py-1
                                    text-xs
                                    font-medium
                                    text-slate-600
                                "
                            >
                                {unreadCount} unread
                            </span>
                        )}
                    </div>

                    <div
                        className="
                            max-h-[min(20rem,calc(100dvh-12rem))]
                            overflow-y-auto
                        "
                    >
                        <div
                            className="
                                border-b
                                border-slate-100
                                px-4
                                py-3
                                transition-colors
                                hover:bg-slate-50
                            "
                        >
                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-slate-900
                                "
                            >
                                New user waiting for approval
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-500
                                "
                            >
                                A new user has registered and requires approval.
                            </p>
                        </div>

                        <div
                            className="
                                border-b
                                border-slate-100
                                px-4
                                py-3
                                transition-colors
                                hover:bg-slate-50
                            "
                        >
                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-slate-900
                                "
                            >
                                New user waiting for approval
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-500
                                "
                            >
                                A new user has registered and requires approval.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="
                            w-full
                            cursor-pointer
                            border-t
                            border-slate-100
                            px-4
                            py-3
                            text-center
                            text-sm
                            font-semibold
                            text-slate-700
                            transition-colors
                            hover:bg-slate-50
                        "
                    >
                        View all notifications
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashboardNotifications;
