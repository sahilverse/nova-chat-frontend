"use client"

import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Heart, ArrowRight, Check } from "lucide-react"
import Link from "next/link";


export function WhyFreeSection() {
  const features = [
    "Unlimited messages",
    "High-quality calls",
    "File sharing",
    "Group chats",
    "Cross-platform sync",
    "Dark mode support",
  ]

  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">
            Completely <span className="nova-gradient-text">Free</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            No hidden costs, no subscriptions, no premium tiers
          </p>
        </div>

        <Card className="max-w-3xl mx-auto border-2 border-primary/20 nova-shadow-colored relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <CardContent className="relative p-8 lg:p-12 text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 nova-gradient rounded-3xl nova-shadow">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold">Always Free</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                We believe great communication should be accessible to everyone. Enjoy all features without any
                limitations or hidden costs.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="nova-gradient text-white hover:opacity-90 h-14 px-8 rounded-2xl nova-shadow-colored font-semibold text-lg w-full sm:w-auto"
            >
              <Link href="/auth/register">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
