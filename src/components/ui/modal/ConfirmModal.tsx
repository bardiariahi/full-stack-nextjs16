"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ConfirmModalProps = {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmModal = ({
    open,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => {
            setMounted(false);
        };
    }, []);

    useEffect(() => {
        if (!open) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !loading) {
                onCancel();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open, loading, onCancel]);

    if (!mounted || !open) {
        return null;
    }

    return createPortal(
        <div
            className="
                fixed inset-0 z-[9999]
                flex items-center justify-center
                bg-black/50 p-4
            "
            onMouseDown={() => {
                if (!loading) {
                    onCancel();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
                className="
                    w-full max-w-md
                    rounded-2xl
                    bg-white
                    p-6
                    shadow-2xl
                "
                onMouseDown={(event) => event.stopPropagation()}
            >
                <h2
                    id="confirm-modal-title"
                    className="text-xl font-bold text-slate-950"
                >
                    {title}
                </h2>

                <p className="mt-3 leading-6 text-slate-600">{message}</p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={onCancel}
                        className="
                            cursor-pointer
                            rounded-xl
                            border border-slate-300
                            px-4 py-2
                            font-medium
                            text-slate-700
                            transition
                            hover:bg-slate-100
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onConfirm}
                        className="
                            flex min-w-24
                            cursor-pointer
                            items-center justify-center
                            rounded-xl
                            bg-red-600
                            px-4 py-2
                            font-semibold
                            text-white
                            transition
                            hover:bg-red-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default ConfirmModal;
