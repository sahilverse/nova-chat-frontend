"use client"

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 nova-gradient rounded-lg flex items-center justify-center nova-shadow">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold nova-gradient-text">Nova</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Why Free
            </a>
            <ThemeToggle variant="button" size="sm" />
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm" className="nova-gradient text-white hover:opacity-90">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <ThemeToggle variant="button" size="sm" />
          </div>
        </div>
      </div>
    </nav>
  )
}
