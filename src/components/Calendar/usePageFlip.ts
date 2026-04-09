"use client";
import { useRef, useCallback } from "react";

export function usePageFlip() {
  const cardRef = useRef<HTMLDivElement>(null);

  const flip = useCallback(async (direction: "next" | "prev", onMidpoint: () => void) => {
    if (!cardRef.current || typeof window === "undefined") return;

    try {
      const { default: gsap } = await import("gsap");
      const card = cardRef.current;

      const tl = gsap.timeline();

      tl.to(card, {
        rotateY: direction === "next" ? -12 : 12,
        x: direction === "next" ? "-2%" : "2%",
        scale: 0.98,
        duration: 0.2,
        ease: "power2.in",
        transformPerspective: 1200,
      })
      .call(onMidpoint)
      .to(card, {
        rotateY: 0,
        x: "0%",
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
        transformPerspective: 1200,
      });

      return tl;
    } catch {
      // If GSAP fails, just call the midpoint
      onMidpoint();
    }
  }, []);

  return { cardRef, flip };
}
