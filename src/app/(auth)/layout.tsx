"use client";

import { ReactNode } from "react";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const router = useRouter();

    const blobVariants = {
        float: {
            y: [0, -10, 0],
            transition: { repeat: Infinity, duration: 4 },
        },
    };

    const featureList = [
        "Secure messaging platform",
        "HD audio & video calls",
        "Cross-platform support",
    ];

    return (
        <div className="min-h-screen flex bg-background">
            {/* Left side - Auth Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/")}
                    className="absolute top-8 left-4 flex items-center space-x-2  hover:text-blue-400 cursor-pointer"
                    title="Go back to Home"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-nova-blue/5 blur-3xl"
                        variants={blobVariants}
                        animate="float"
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-nova-purple/5 blur-3xl"
                        variants={blobVariants}
                        animate="float"
                        transition={{ ...blobVariants.float.transition, delay: 1 }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-accent/10 blur-2xl"
                        variants={blobVariants}
                        animate="float"
                        transition={{ ...blobVariants.float.transition, delay: 2 }}
                    />
                </div>

                <div className="w-full max-w-md space-y-8 relative z-10">
                    {children}
                </div>
            </div>

            {/* Right side - Brand Section */}
            <div className="lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
                {/* Gradient overlay */}
                <div className="absolute inset-0 nova-gradient opacity-90" />

                {/* Decorative elements */}
                <motion.div
                    className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-40 right-32 w-1 h-1 bg-white/40 rounded-full"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                    className="absolute bottom-32 left-32 w-3 h-3 bg-white/20 rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                />

                {/* Main content */}
                <div className="relative flex flex-col items-center justify-center p-12 text-center text-white z-10">
                    {/* Nova logo */}
                    <div className="mb-8">
                        <div className="w-20 h-20 mx-auto rounded-3xl bg-white/15 backdrop-blur-lg border border-white/20 flex items-center justify-center shadow-2xl">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                                <div className="w-10 h-10 nova-gradient rounded-lg flex items-center justify-center nova-shadow">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero text */}
                    <motion.h2
                        className="text-4xl font-bold mb-4 leading-tight relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Welcome to{" "}
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent font-extrabold drop-shadow-[0_0_6px_rgba(0,0,0,0.7)]">
                            Nova
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-xl opacity-90 leading-relaxed mb-8 max-w-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        The future of messaging is here. Connect through text, audio, and video calls.
                    </motion.p>

                    {/* Features list */}
                    <motion.div
                        className="space-y-3 text-left"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.2 } },
                        }}
                    >
                        {featureList.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center space-x-3"
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0 },
                                }}
                            >
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                                <span className="text-white/90">{feature}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
        </div>
    );
}
