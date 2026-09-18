"use client";

import { FaUser } from "react-icons/fa6";

import { useCurrentUser } from "@/src/hooks/queries/useCurrentUser";

const DashboardUser = () => {
    const { data, isLoading, isError } = useCurrentUser();

    if (isLoading) {
        return (
            <div className="flex items-center gap-3">
                <div className="skeleton h-10 w-10 rounded-xl" />

                <div className="hidden space-y-2 lg:block">
                    <div className="skeleton h-3 w-32" />
                    <div className="skeleton h-2 w-16" />
                </div>
            </div>
        );
    }

    if (isError || !data?.user) {
        return (
            <div className="flex items-center gap-3">
                <div
                    className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-xl
                        bg-slate-100
                        text-slate-500
                    "
                >
                    <FaUser size={16} />
                </div>

                <span className="hidden text-sm text-slate-500 lg:block">
                    User unavailable
                </span>
            </div>
        );
    }

    const user = data.user;

    const firstLetter = user.email.charAt(0).toUpperCase();

    const role = user.roles.length > 0 ? user.roles.join(", ") : "NO ROLE";

    return (
        <div className="flex items-center gap-3">
            <div
                className="
                    flex h-10 w-10
                    shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-slate-950
                    font-bold
                    text-yellow-400
                "
            >
                {firstLetter}
            </div>

            <div className="hidden min-w-0 lg:block">
                <p
                    className="
                        max-w-52
                        truncate
                        text-sm
                        font-semibold
                        text-slate-950
                    "
                >
                    {user.email}
                </p>

                <p
                    className="
                        mt-0.5 max-w-52 truncate
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wide
                        text-slate-500
                    "
                >
                    {role}
                </p>
            </div>
        </div>
    );
};

export default DashboardUser;
