"use client"

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
};

function AnimatedCounter({ end, suffix = "", duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const start = 0;

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
        setCount(Math.floor(progress * (end - start) + start))
        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          setCount(end)
        }
      };
      requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="flex items-center justify-center text-4xl lg:text-5xl font-bold nova-gradient-text">
      <span>
        {count}
      </span>
      <span className="ml-1">{suffix}</span>
    </div>
  );
}

export function StatsSection() {
  const stats = [
    { number: 99, suffix: "%", label: "Uptime" },
    { number: 50, suffix: "ms", label: "Message Speed" },
    { number: 24, suffix: "/7", label: "Available" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
