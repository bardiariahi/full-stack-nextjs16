"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight, FaHouse } from "react-icons/fa6";

const formatLabel = (value: string) => {
    return value
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) =>
            char.toUpperCase(),
        );
};

const DashboardBreadcrumb = () => {
    const pathname = usePathname();

    const segments = pathname
        .split("/")
        .filter(Boolean);

    return (
        <nav
            aria-label="Breadcrumb"
            className="
                flex min-w-0
                items-center
                gap-2
                text-sm
            "
        >
            {segments.map((segment, index) => {
                const href =
                    "/" +
                    segments
                        .slice(0, index + 1)
                        .join("/");

                const isLast =
                    index ===
                    segments.length - 1;

                const label =
                    formatLabel(segment);

                return (
                    <div
                        key={href}
                        className="
                            flex min-w-0
                            items-center
                            gap-2
                        "
                    >
                        {index > 0 && (
                            <FaChevronRight
                                size={10}
                                className="
                                    shrink-0
                                    text-slate-400
                                "
                            />
                        )}

                        {isLast ? (
                            <span
                                className="
                                    flex min-w-0
                                    items-center
                                    gap-2
                                    font-semibold
                                    text-slate-950
                                "
                            >
                                {segment ===
                                    "dashboard" && (
                                    <FaHouse
                                        size={14}
                                    />
                                )}

                                <span className="truncate">
                                    {label}
                                </span>
                            </span>
                        ) : (
                            <Link
                                href={href}
                                className="
                                    flex min-w-0
                                    items-center
                                    gap-2
                                    text-slate-500
                                    transition-colors
                                    hover:text-slate-950
                                "
                            >
                                {segment ===
                                    "dashboard" && (
                                    <FaHouse
                                        size={14}
                                    />
                                )}

                                <span className="truncate">
                                    {label}
                                </span>
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default DashboardBreadcrumb;