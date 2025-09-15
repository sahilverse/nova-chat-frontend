"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/store";

export default function Protected({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
        if (!accessToken) {
            router.replace("/login");
        }
    }, [accessToken, router]);

    return accessToken ? <>{children}</> : null;
}
