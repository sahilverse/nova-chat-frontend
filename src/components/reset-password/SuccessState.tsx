"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export function SuccessState() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">Password Reset Successful!</CardTitle>
                    <CardDescription>
                        Your password has been successfully updated. You can now sign in with your new password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <Button className="w-full nova-gradient text-white" onClick={() => router.push("/accounts/login")}>
                            Continue to Sign In
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/")}>
                            <Home className="w-4 h-4 mr-2" />
                            Go to Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
