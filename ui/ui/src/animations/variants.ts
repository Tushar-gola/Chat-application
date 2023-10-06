import { Variants } from "framer-motion";
import { transition } from "./transition";

export const stepperAnimationVariant = {
  initial: {
    opacity: 0,
    scale: 1.1,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      ...transition.instant,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
  },
};
export const pageAnimationVariant: Variants = {
  initial: {
    opacity: 0,
    y: -32,
    rotateX: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      ...transition.easeInOut,
    },
  },
  exit: {
    opacity: 0,
    y: 80,
    transition: {
      ...transition.easeInOut,
    },
  },
};
