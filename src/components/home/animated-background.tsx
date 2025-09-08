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

export function FloatingIcons() {
  const icons = [
    { Icon: MessageCircle, delay: 0 },
    { Icon: Heart, delay: 1 },
    { Icon: Star, delay: 2 },
    { Icon: Zap, delay: 3 },
    { Icon: Sparkles, delay: 4 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay }, index) => (
        <div
          key={index}
          className="absolute opacity-20 animate-float"
          style={{
            left: `${20 + index * 15}%`,
            top: `${10 + index * 12}%`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon className="w-8 h-8 text-primary" />
        </div>
      ))}
    </div>
  )
}

export function GlowingOrb({ className }: { className?: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl opacity-20 ${className}`}>
      <div className="w-full h-full nova-gradient" />
    </div>
  )
}

import { MessageCircle, Heart, Star, Zap, Sparkles } from "lucide-react"
