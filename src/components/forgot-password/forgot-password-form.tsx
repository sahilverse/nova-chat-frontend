"use client"

import type React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ArrowLeft, Shield } from "lucide-react";
import { useState } from "react";
import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";
import { useAppSelector } from "@/store/hooks";

const ForgotPasswordForm = () => {
    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = useState("");

    const theme = useAppSelector((state) => state.theme.actualTheme);


    return (
        <div className="space-y-8 container mx-auto max-w-lg px-4 py-16">
            <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
                    <div className="w-8 h-8 nova-gradient rounded-lg flex items-center justify-center nova-shadow">
                        {step === "otp" ? (
                            <Shield className="w-5 h-5 text-white" />
                        ) : (
                            <MessageCircle className="w-5 h-5 text-white" />
                        )}
                    </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {step === "otp" ? "Enter verification code" : "Forgot password?"}
                </h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    {step === "otp"
                        ? `Enter the 6-digit code we sent to ${email}`
                        : "No worries! Enter your email address and we'll send you a code to reset your password."}
                </p>
            </div>

            <Card className="border-0 shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                    {step === "email" ? (
                        <EmailForm
                            onSuccess={(email: string) => {
                                setEmail(email)
                                setStep("otp")
                            }}
                            theme={theme}
                        />
                    ) : (
                        <OtpForm
                            theme={theme}
                            email={email}
                            onUseDifferentEmail={() => setStep("email")}
                        />
                    )}
                </CardContent>
            </Card>

            <div className="text-center space-y-4">
                <Link
                    href="/login"
                    className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to sign in</span>
                </Link>

                <div className="text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordForm;
