"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";








export  function HighlightPulse({
  children,
}: {
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      opacity: 0.3,
      duration: 0.8,
      repeat: 2,
      yoyo: true,
      ease: "power1.inOut",
    })
  }, [])

  return (
    <span ref={ref} className="text-white font-medium">
      {children}
    </span>
  )
}


gsap.registerPlugin(ScrollTrigger);

type AnimateDirection = "leftToRight" | "rightToLeft" | "topToBottom" | "bottomToTop";

interface AnimatedTextProps {
  children: React.ReactNode;
  animate: AnimateDirection;
  duration?: number;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  animate,
  duration = .5,
  delay = 0,
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;

    let fromVars: gsap.TweenVars = { opacity: 0 };

    switch (animate) {
      case "leftToRight":
        fromVars.x = -50;
        break;
      case "rightToLeft":
        fromVars.x = 50;
        break;
      case "topToBottom":
        fromVars.y = -100;
        break;
      case "bottomToTop":
        fromVars.y = 50;
        break;
    }

    gsap.fromTo(
      elRef.current,
      { ...fromVars },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        scrollTrigger: {
          trigger: elRef.current,
          start: "top 100%",
            toggleActions: "play ", 
        },
      }
    );
  }, [animate, duration, delay]);

  return <div ref={elRef}>{children}</div>;
};

export default AnimatedText;

