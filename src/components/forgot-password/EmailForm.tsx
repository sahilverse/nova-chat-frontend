"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormInputs } from "@/lib/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { sendOtp } from "@/api/queries";
import { useMutation } from "@tanstack/react-query";



interface EmailFormProps {
    onSuccess: (email: string) => void;
    theme: "light" | "dark";
}

export default function EmailForm({ onSuccess, theme }: EmailFormProps) {
    const { register, handleSubmit, setError, getValues, formState: { errors } } = useForm<ForgotPasswordFormInputs>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const mutation = useMutation({
        mutationFn: (email: string) => sendOtp(email),
        onSuccess: () => {
            toast.success("OTP sent successfully! Check your email.");
            onSuccess(getValues("email"));
        },
        onError: (err: any) => {
            if (err.fieldErrors?.email) {
                setError("email", { type: "server", message: err.fieldErrors.email });
            } else if (err.errorMessage) {
                toast.error(err.errorMessage);
            } else {
                toast.error("Failed to send OTP. Please try again.");
            }
        },
    });

    const onSubmit = (data: ForgotPasswordFormInputs) => mutation.mutate(data.email);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                    Email address
                </Label>
                <div className="relative">
                    <Input
                        id="email"
                        type="text"
                        placeholder="Enter your email address"
                        {...register("email")}
                        className={`h-12 px-4 pl-12 border-2 bg-background/50 focus:border-primary focus:ring-0 transition-all duration-200 ${theme === "dark" ? "border-input" : "border-slate-200"}`}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <Button
                type="submit"
                disabled={mutation.status === "pending"}
                className="w-full h-12 nova-gradient text-white font-semibold text-base shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
            >
                {mutation.status === "pending" ? (
                    <>
                        <ClipLoader size={20} color="#ffffff" className="mr-2" />
                        Sending OTP...
                    </>
                ) : (
                    "Send verification code"
                )}
            </Button>
        </form>
    )
}
