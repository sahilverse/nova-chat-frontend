"use client"

import { Button } from "../ui/button"
import { AnimatedGridBackground } from "./animated-background"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 relative overflow-hidden">
      <AnimatedGridBackground />
      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-3xl lg:text-5xl font-bold text-balance">
          Ready to try <span className="nova-gradient-text">Nova</span>?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Experience modern messaging with beautiful design and smooth interactions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="nova-gradient text-white hover:opacity-90 h-16 px-8 rounded-2xl nova-shadow-colored font-semibold text-xl group"
          >
            <Link href="/auth/register">
              Start Chatting Now
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-16 px-8 rounded-2xl border-2 font-semibold text-xl hover:bg-primary/5 bg-transparent"
          >
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
