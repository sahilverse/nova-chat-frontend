"use client"

import { Users, MessageCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Users,
      title: "1. Create Account",
      desc: "Sign up with your email and you're ready to start chatting in seconds.",
    },
    {
      icon: MessageCircle,
      title: "2. Add Contacts",
      desc: "Find friends and colleagues to start meaningful conversations.",
    },
    {
      icon: Zap,
      title: "3. Start Chatting",
      desc: "Enjoy fast, reliable messaging with a beautiful interface.",
    },
  ];

  // Variants for the motion animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, opacity: { ease: "easeOut" } } },
  };

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Simple, <span className="nova-gradient-text">Intuitive</span> Messaging
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Get started in seconds and enjoy seamless communication across all your devices.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center space-y-4 group"
                variants={stepVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <div className="w-20 h-20 mx-auto nova-gradient rounded-3xl flex items-center justify-center nova-shadow">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-primary to-transparent" />
                  )}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-pretty">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
