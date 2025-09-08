"use client"

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AnimatedGridBackground, FloatingIcons, GlowingOrb } from "./animated-background";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
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

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <AnimatedGridBackground />
      <FloatingIcons />

      {/* Glowing Orbs */}
      <GlowingOrb className="w-96 h-96 -top-48 -left-48" />
      <GlowingOrb className="w-80 h-80 -bottom-40 -right-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Introducing Nova Chat - Now Available
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance"
              variants={itemVariants}
            >
              The Future of <span className="nova-gradient-text">Messaging</span>
              <br />
              is Here
            </motion.h1>

            <motion.p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty" variants={itemVariants}>
              Experience modern messaging with beautiful design and smooth interactions.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="nova-gradient text-white hover:opacity-90 h-14 px-8 rounded-2xl nova-shadow-colored font-semibold text-lg group"
            >
              <Link href="/signup">
                Start Chatting Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center justify-center space-x-8 text-sm text-muted-foreground"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-success" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-success" />
              <span>No Ads</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-success" />
              <span>Cross Platform</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
