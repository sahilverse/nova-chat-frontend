"use client"

import { motion } from "framer-motion"
import { MessageCircle, Heart, Star, Zap, Sparkles } from "lucide-react"

export function AnimatedGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
    </div>
  )
}

const floatAnimation = {
  initial: { y: 0 },
  animate: { y: [0, -20, 0] },
}

export function FloatingIcons() {
  const icons = [
    { Icon: MessageCircle, delay: 0 },
    { Icon: Heart, delay: 0.5 },
    { Icon: Star, delay: 1 },
    { Icon: Zap, delay: 1.5 },
    { Icon: Sparkles, delay: 2 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20"
          style={{
            left: `${20 + index * 15}%`,
            top: `${10 + index * 12}%`,
          }}
          initial="initial"
          animate="animate"
          variants={floatAnimation}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            delay,
          }}
        >
          <Icon className="w-8 h-8 text-primary" />
        </motion.div>
      ))}
    </div>
  )
}

export function GlowingOrb({ className }: { className?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      initial={{ scale: 0.8, opacity: 0.1 }}
      animate={{ scale: 1.2, opacity: 0.3 }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <div className="w-full h-full nova-gradient" />
    </motion.div>
  )
}
