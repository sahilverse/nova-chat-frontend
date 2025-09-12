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
import * as z from "zod";
import { loginSchema } from "@/lib/zod";
import { ClipLoader } from "react-spinners";

import { loginThunk } from "@/slices/auth";
import { useAppDispatch } from "@/store/hooks";


type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        setIsLoading(true);
        try {
            await dispatch(
                loginThunk({ email: data.email, password: data.password })
            ).unwrap();

            // TODO: Redirect to chat Page
            toast.success("Logged in successfully!");

        } catch (err: any) {
            const { fieldErrors } = err;
            if (fieldErrors) {
                Object.entries(fieldErrors).forEach(([field, message]) => {
                    setError(field as keyof LoginFormInputs, {
                        type: "manual",
                        message: message as string,
                    });
                });
            } else {
                const errorMessage =
                    err.errorMessage || "An error occurred during login. Please try again.";
                toast.error(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
                    <div className="w-8 h-8 nova-gradient rounded-lg flex items-center justify-center nova-shadow">
                        <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                <p className="text-muted-foreground text-lg">
                    Sign in to your Nova account to continue
                </p>
            </div>

            <Card className="border-0 shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                    className="h-12 px-4 border-2 border-input bg-background/50 focus:border-primary focus:ring-0 transition-all duration-200"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        {...register("password")}
                                        className="h-12 px-4 pr-12 border-2 border-input bg-background/50 focus:border-primary focus:ring-0 transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="text-muted-foreground"></div>
                            <Link
                                href="/forgot-password"
                                className="font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 nova-gradient text-white font-semibold text-base shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <>
                                    <ClipLoader size={24} color="#ffffff" /> Signing in...
                                </>
                            ) : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="text-center">
                <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
