"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { verifyOtp, sendOtp } from "@/api/queries";
import { useMutation } from "@tanstack/react-query";

type OTPInputFormProps = {
    email: string;
    onUseDifferentEmail: () => void;
    theme: "light" | "dark";
}

export default function OtpForm({ email, onUseDifferentEmail, theme }: OTPInputFormProps) {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleOTPChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) otpRefs.current[index + 1]?.focus();

    };

    const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
    };

    const verifyMutation = useMutation({
        mutationFn: (otpValue: string) => verifyOtp(email, otpValue),
        onSuccess: (data) => {
            sessionStorage.setItem("reset_token", data.Result.reset_token);
            toast.success("OTP verified successfully!");
            router.push("/accounts/reset-password");
        },
        onError: (err: any) => {
            if (err.fieldErrors?.token) {
                toast.error(err.fieldErrors.token);
            } else if (err.errorMessage) {
                toast.error(err.errorMessage);
            } else {
                toast.error("Invalid OTP. Please try again.");
            }
        },
    });

    const resendMutation = useMutation({
        mutationFn: () => sendOtp(email),
        onSuccess: () => {
            toast.success("OTP resent successfully!");
            setOtp(["", "", "", "", "", ""]);
            otpRefs.current[0]?.focus();
        },
        onError: (err: any) => {
            toast.error(err.errorMessage || "Failed to resend OTP. Please try again.");
        },
    });

    const handleOTPSubmit = (otpValue?: string) => {
        const value = otpValue ?? otp.join("");
        if (value.length !== 6) return toast.error("Please enter all 6 digits");
        verifyMutation.mutate(value);
    };

    const handleResendOTP = async () => {
        resendMutation.mutate();
    }

    useEffect(() => { otpRefs.current[0]?.focus() }, [])

    if (!email) {
        router.push("/accounts/forgot-password");
        return null;
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <Label className="text-sm font-semibold text-foreground text-center block">Verification Code</Label>
                <div className="flex justify-center space-x-3">
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            ref={(el) => { otpRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOTPChange(index, e.target.value.replace(/\D/g, ""))}
                            onKeyDown={(e) => handleOTPKeyDown(index, e)}
                            className={`w-12 h-12 text-center text-lg font-semibold border-2 bg-background/50 focus:border-primary focus:ring-0 transition-all duration-200 ${theme === "dark" ? "border-input" : "border-slate-200"}`}
                        />
                    ))}
                </div>
            </div>

            <Button
                onClick={() => handleOTPSubmit()}
                disabled={verifyMutation.status === "pending" || otp.join("").length !== 6}
                className="w-full h-12 nova-gradient text-white font-semibold text-base shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
            >
                {verifyMutation.status === "pending" ? (
                    <>
                        <ClipLoader size={20} color="#ffffff" className="mr-2" />
                        Verifying...
                    </>
                ) : (
                    "Verify code"
                )}
            </Button>

            <div className="space-y-3 text-center">
                <Button
                    onClick={handleResendOTP}
                    disabled={resendMutation.status === "pending"}
                    variant="outline"
                    className="w-full h-12 border-2 hover:bg-primary/5 transition-all duration-200 bg-transparent"
                >
                    {resendMutation.status === "pending" ? (
                        <>
                            <ClipLoader size={20} color="currentColor" className="mr-2" />
                            Resending...
                        </>
                    ) : (
                        "Resend verification code"
                    )}
                </Button>

                <Button
                    onClick={() => {
                        setOtp(["", "", "", "", "", ""]);
                        onUseDifferentEmail();
                    }}
                    variant="ghost"
                    className="w-full h-12 text-muted-foreground hover:text-foreground transition-colors"
                >
                    Use different email address
                </Button>
            </div>
        </div>
    )
}
