"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

export default function Protected({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const isAuthenticated = !!useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <>{children}</> : null;
}
