import { Variants } from "framer-motion";

// Fades elements up while becoming opaque (e.g. headings, text blocks)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Slides elements in from the right edge
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

// Slides elements in from the left edge
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

// Used on a parent motion container to stagger the rendering of its children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// Standardized hover animation for interactive cards (e.g. Services)
export const hoverScale: Variants = {
  rest: { scale: 1, y: 0, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" },
  hover: { 
    scale: 1.03, 
    y: -5,
    boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};

// Standardized hover animation for CTA buttons (replaces pulse animation)
export const pulseButton: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};
