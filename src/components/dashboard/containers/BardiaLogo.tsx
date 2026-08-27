"use client";

type BardiaLogoProps = {
    collapsed?: boolean;
};

const BardiaLogo = ({ collapsed = false }: BardiaLogoProps) => {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-yellow-400">
                <svg
                    viewBox="0 0 64 64"
                    className="h-8 w-8"
                    aria-hidden="true"
                >
                    <path
                        fill="currentColor"
                        d="M16 8h18c9 0 16 5 16 13 0 6-4 10-10 12 8 2 12 7 12 14 0 9-7 17-19 17H16V8Zm11 10v11h7c4 0 7-2 7-6s-3-5-7-5h-7Zm0 20v16h8c5 0 8-3 8-8s-3-8-9-8h-7Z"
                    />
                </svg>
            </div>

            {!collapsed && (
                <div className="leading-tight">
                    <div className="text-xl font-extrabold tracking-[0.18em] text-slate-950">
                        BARDIA
                    </div>

                    <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-slate-700">
                        Admin Panel
                    </div>
                </div>
            )}
        </div>
    );
};

export default BardiaLogo;