"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, AlertCircle, Loader2 } from "lucide-react";

interface VerifyingStateProps {
    isLoading: boolean;
    error: string;
}

export function VerifyingState({ isLoading, error }: VerifyingStateProps) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
                        <div className="w-8 h-8 nova-gradient rounded-lg flex items-center justify-center nova-shadow">
                            <Lock className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-semibold">Verifying Reset Link</CardTitle>
                    <CardDescription>Please wait while we verify your password reset request</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    ) : null}
                </CardContent>
            </Card>
        </div>
    );
};
