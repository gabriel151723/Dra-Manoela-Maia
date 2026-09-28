import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.65,
  className = '',
  once = true,
  ...props
}) => {
  const getVariants = () => {
    switch (variant) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 35 },
          visible: { opacity: 1, y: 0 }
        };
      case 'fade-down':
        return {
          hidden: { opacity: 0, y: -35 },
          visible: { opacity: 1, y: 0 }
        };
      case 'fade-left':
        return {
          hidden: { opacity: 0, x: 35 },
          visible: { opacity: 1, x: 0 }
        };
      case 'fade-right':
        return {
          hidden: { opacity: 0, x: -35 },
          visible: { opacity: 1, x: 0 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.94 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Luxury cubic-bezier deceleration
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
