"use client";

import { LazyMotion, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";

// Design.md §7: --duration-slow and --ease-out, children staggered by 60–80 ms.
const DURATION_SLOW = 0.4;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const STAGGER = 0.07;
const RISE = 24;

const loadFeatures = () => import("@/utils/motion-features").then((mod) => mod.domAnimation);

const elements = { div: m.div, li: m.li } as const;

interface RevealProps {
  children: ReactNode;
  /** Position in a group, used to stagger siblings. */
  index?: number;
  as?: keyof typeof elements;
  className?: string;
}

/**
 * Fades and rises content into view once. For below-the-fold content only: never wrap the
 * hero, which is the LCP element and must be visible in the server HTML.
 */
export function Reveal({ children, index = 0, as = "div", className }: RevealProps) {
  // `initial` must match between server and client, and useReducedMotion() is null on the
  // server. So with reduced motion the rise completes instantly while the element is still
  // invisible, and only opacity animates.
  const reduceMotion = useReducedMotion();
  const Element = elements[as];
  const fade = { duration: DURATION_SLOW, ease: EASE_OUT, delay: index * STAGGER };

  return (
    <LazyMotion features={loadFeatures} strict>
      <Element
        className={className}
        initial={{ opacity: 0, y: RISE }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={reduceMotion ? { opacity: fade, y: { duration: 0 } } : fade}
      >
        {children}
      </Element>
    </LazyMotion>
  );
}
