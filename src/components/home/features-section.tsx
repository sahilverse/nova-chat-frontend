"use client"

import type React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Shield, Phone, Share2, Users, Zap, Globe } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      opacity: { ease: "linear" }
    },
  },
};

function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
}: {
  icon: React.ElementType
  title: string
  description: string
  gradient?: boolean
}) {
  return (
    <Card className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-6 space-y-4 flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${gradient ? "nova-gradient" : "bg-primary/10"
            } group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`w-6 h-6 ${gradient ? "text-white" : "text-primary"}`} />
        </div>
        <h3 className="font-semibold group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardContent>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: MessageCircle,
      title: "Instant Messaging",
      description: "Send messages instantly with real-time delivery and read receipts.",
      gradient: true,
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description: "Your conversations stay private with modern security practices.",
    },
    {
      icon: Users,
      title: "Group Chats",
      description: "Create groups with friends, family, or colleagues for seamless collaboration.",
    },
    {
      icon: Phone,
      title: "Voice & Video Calls",
      description: "High-quality voice and video calls with crystal clear audio.",
    },
    {
      icon: Share2,
      title: "File Sharing",
      description: "Share photos, documents, and files of any type effortlessly.",
    },
    {
      icon: Globe,
      title: "Cross Platform",
      description: "Available on all devices with seamless synchronization.",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-16">
          <div className="space-y-4">
            <Badge variant="outline" className="px-3 py-1">
              <Zap className="w-4 h-4 mr-2" />
              Features
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-balance">
              Everything you need for <span className="nova-gradient-text">modern communication</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Powerful features designed to enhance your messaging experience
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={cardVariants}>
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
