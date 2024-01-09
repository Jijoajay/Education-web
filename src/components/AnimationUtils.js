import { useAnimation } from 'framer-motion';

export const fadeInFromLeft = (delay) => ({
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, delay },
});

export const verticalAnimate = (x) => ({
  initial: { x, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x, opacity: 0 },
  transition: { delay: 1, type: 'spring', stiffness: 10, duration: 0.5 },
});

export const animateFromRight = (delay) => ({
  initial: { x: 250, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 250, opacity: 0 },
  transition: { delay, ease: 'easeInOut', duration: 1 },
});

export const animateLeft = (delay)=>({
    initial:{x:-250, opacity: 0},
    animate:{ x: 0 , opacity: 1},
    exit:{x:-250, opacity:0},
    transition:{ delay: delay, ease: "easeInOut", duration: 1}
  })
export const container = {
    hidden: { opacity: 1, scale: .2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.5,
        duration: 1
      },
    },
  };
 export const item = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        duration: 0.5,
      },
    },
  };
  