"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { login } from "@/src/services/auth.service";

export function useLogin() {
    const router = useRouter();

    return useMutation({
        mutationFn: login,

        onSuccess: () => {
            toast.success("Login successful");
            router.replace("/dashboard");
        },

        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}
