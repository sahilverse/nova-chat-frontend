"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock, AlertCircle, Loader2 } from "lucide-react";
import { resetPassword } from "@/api/queries";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetPasswordSchema, type ResetPasswordFormInputs } from "@/lib/zod";
import { useAppSelector } from "@/store/hooks";

interface ResetPasswordFormProps {
    resetToken: string;
    onSuccess: () => void;
}

export function ResetPasswordForm({ resetToken, onSuccess }: ResetPasswordFormProps) {
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const theme = useAppSelector((state) => state.theme.actualTheme);

    const {
        register,
        handleSubmit,
        setError: setFormError,
        formState: { errors },
    } = useForm<ResetPasswordFormInputs>({
        resolver: zodResolver(resetPasswordSchema),
    })

    const resetPasswordMutation = useMutation({
        mutationFn: ({ newPassword, confirmNewPassword }: { newPassword: string; confirmNewPassword: string }) =>
            resetPassword(resetToken, newPassword, confirmNewPassword),
        onSuccess: () => {
            onSuccess();
            sessionStorage.removeItem("reset_token");
            toast.success("Password reset successfully!");
        },
        onError: (err: any) => {
            if (err.fieldErrors?.newPassword) {
                setFormError("newPassword", {
                    type: "manual",
                    message: err.fieldErrors.newPassword,
                });
            } else if (err.fieldErrors?.confirmNewPassword) {
                setFormError("confirmNewPassword", {
                    type: "manual",
                    message: err.fieldErrors.confirmNewPassword,
                });
            } else if (err.errorMessage) {
                toast.error(err.errorMessage);
            } else {
                toast.error("Failed to reset password. Please try again.");
            }
        },
    })

    const onSubmit = (data: ResetPasswordFormInputs) => {
        setError("")
        resetPasswordMutation.mutate({
            newPassword: data.newPassword,
            confirmNewPassword: data.confirmNewPassword,
        });
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
                        <div className="w-8 h-8 nova-gradient rounded-lg flex items-center justify-center nova-shadow">
                            <Lock className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-semibold">Reset Your Password</CardTitle>
                    <CardDescription>Enter your new password below</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-sm font-semibold text-foreground">
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        {...register("newPassword")}
                                        className={`h-12 px-4 pr-12 border-2 bg-background/50 focus:border-primary focus:ring-0 transition-all duration-200 ${theme === "dark" ? "border-input" : "border-slate-200"}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground">
                                    Confirm New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        {...register("confirmNewPassword")}
                                        className={`h-12 px-4 pr-12 border-2 bg-background/50 focus:border-primary focus:ring-0 transition-all duration-200 ${theme === "dark" ? "border-input" : "border-slate-200"}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.confirmNewPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>
                                )}
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 nova-gradient text-white font-semibold text-base shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
                            disabled={resetPasswordMutation.status === "pending"}
                        >
                            {resetPasswordMutation.status === "pending" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Resetting Password...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-muted-foreground">
                            Remember your password?{" "}
                            <a href="/accounts/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                                Sign in
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
