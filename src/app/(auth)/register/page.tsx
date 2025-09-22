"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { registerSchema } from "@/lib/zod";
import { ClipLoader } from "react-spinners";

import { registerThunk } from "@/slices/auth";
import { loginThunk } from "@/slices/auth";
import { useAppDispatch } from "@/store/hooks";
import type { RegisterFormInputs } from "@/lib/zod";
import { useAppSelector } from "@/store/hooks";


const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { theme } = useAppSelector((state) => state.theme);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormInputs) => {
        setIsLoading(true);
        try {
            await dispatch(
                registerThunk({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                })
            ).unwrap();


            // login the user directly after registration
            await dispatch(
                loginThunk({
                    email: data.email,
                    password: data.password,
                })
            ).unwrap();


        } catch (err: any) {
            const { fieldErrors } = err;
            if (fieldErrors) {
                Object.entries(fieldErrors).forEach(([field, message]) => {
                    setError(field as keyof RegisterFormInputs, {
                        type: "manual",
                        message: message as string,
                    });
                });
            } else {
                const errorMessage =
                    err.errorMessage ||
                    "An error occurred during registration. Please try again.";
                toast.error(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">

            {/* Logo */}
            <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
                    <div className="w-8 h-8 nova-gradient rounded-lg flex items-center justify-center nova-shadow">
                        <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Create your account
                </h1>
                <p className="text-muted-foreground text-lg">
                    Join Nova and start messaging with the future
                </p>
            </div>

            {/* Form */}
            <Card className="border-0 shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="name"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    Full name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    {...register("name")}
                                    className={`h-12 px-4 border-2 bg-background/50 focus:border-primary focus:ring-0 transition-all duration-200  ${theme === "dark" ? "border-input" : "border-slate-200 "}`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                    className={`h-12 px-4 border-2 bg-background/50 focus:border-primary focus:ring-0 transition-all duration-200  ${theme === "dark" ? "border-input" : "border-slate-200 "}`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        {...register("password")}
                                        className={`h-12 px-4 pr-12 border-2 bg-background/50 focus:border-primary focus:ring-0 transition-all duration-200  ${theme === "dark" ? "border-input" : "border-slate-200 "}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="confirmPassword"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    Confirm password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        {...register("confirmPassword")}
                                        className={`h-12 px-4 pr-12 border-2 bg-background/50 focus:border-primary focus:ring-0 transition-all duration-200  ${theme === "dark" ? "border-input" : "border-slate-200 "}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 nova-gradient text-white font-semibold text-base shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <>
                                    <ClipLoader size={24} color="#ffffff" /> Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center">
                <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
