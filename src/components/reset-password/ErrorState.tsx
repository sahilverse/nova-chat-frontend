"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorStateProps {
    error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">Invalid Reset Link</CardTitle>
                    <CardDescription>
                        The password reset link is invalid or has expired. Please request a new one.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                        <Button
                            className="w-full nova-gradient text-white"
                            onClick={() => router.push("/accounts/forgot-password")}
                        >
                            Request New Reset Link
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/accounts/login")}>
                            Back to Sign In
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
