"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyOtp } from "@/api/queries";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { VerifyingState } from "@/components/reset-password/VerifyingState";
import { ErrorState } from "@/components/reset-password/ErrorState";
import { SuccessState } from "@/components/reset-password/SuccessState";
import { ResetPasswordForm } from "@/components/reset-password/ResetPasswordForm";

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState<"verifying" | "reset" | "success" | "error">("reset");
    const [error, setError] = useState("");
    const [resetToken, setResetToken] = useState("");

    const token = searchParams.get("token");

    const verifyEmailTokenMutation = useMutation({
        mutationFn: ({ token }: { token: string }) => verifyOtp(token),
        onSuccess: (data) => {
            setResetToken(data.Result.reset_token);
            setStep("reset");
            toast.success("Reset link verified successfully!");
        },
        onError: (err: any) => {
            if (err.fieldErrors?.token) {
                setError(err.fieldErrors.token);
            } else if (err.errorMessage) {
                setError(err.errorMessage);
            } else {
                setError("Invalid or expired reset token");
            }
            setStep("error");
        },
    });

    useEffect(() => {
        if (token) {
            setStep("verifying");
            verifyEmailTokenMutation.mutate({ token });
        } else {
            const sessionToken = sessionStorage.getItem("reset_token");

            if (sessionToken) {
                setResetToken(sessionToken);
                setStep("reset");
            } else {
                router.push("/accounts/forgot-password");
            }
        }
    }, [token, router])

    const handleResetSuccess = () => {
        setStep("success");
    };

    if (step === "verifying") {
        return <VerifyingState isLoading={verifyEmailTokenMutation.status === "pending"} error={error} />;
    };

    if (step === "error") {
        return <ErrorState error={error} />;
    }

    if (step === "success") {
        return <SuccessState />;
    }

    return <ResetPasswordForm resetToken={resetToken} onSuccess={handleResetSuccess} />;
}
