"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";
type Language = "en" | "fa";

type UIStore = {
    isSidebarOpen: boolean;
    theme: Theme;
    language: Language;

    toggleSidebar: () => void;
    openSidebar: () => void;
    closeSidebar: () => void;

    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;

    setLanguage: (language: Language) => void;
};

export const useUIStore = create<UIStore>()(
    persist(
        (set) => ({
            isSidebarOpen: true,
            theme: "light",
            language: "en",

            toggleSidebar: () =>
                set((state) => ({
                    isSidebarOpen: !state.isSidebarOpen,
                })),

            openSidebar: () =>
                set({
                    isSidebarOpen: true,
                }),

            closeSidebar: () =>
                set({
                    isSidebarOpen: false,
                }),

            setTheme: (theme) =>
                set({
                    theme,
                }),

            toggleTheme: () =>
                set((state) => ({
                    theme:
                        state.theme === "light"
                            ? "dark"
                            : "light",
                })),

            setLanguage: (language) =>
                set({
                    language,
                }),
        }),
        {
            name: "ui-settings",
        },
    ),
);