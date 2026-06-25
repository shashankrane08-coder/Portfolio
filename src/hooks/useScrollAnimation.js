import { useInView } from 'react-intersection-observer'

/**
 * useScrollAnimation
 * Returns framer-motion props for a smooth scroll-triggered reveal.
 *
 * Usage:
 *   const anim = useScrollAnimation()
 *   <motion.div {...anim.container}>
 *     <motion.p {...anim.item(0)}>...</motion.p>
 *     <motion.p {...anim.item(1)}>...</motion.p>
 *   </motion.div>
 */
export function useScrollAnimation(threshold = 0.15) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold })

  const container = {
    ref,
    initial:   'hidden',
    animate:   inView ? 'visible' : 'hidden',
    variants: {
      hidden:  {},
      visible: { transition: { staggerChildren: 0.1 } },
    },
  }

  const item = (extraDelay = 0) => ({
    variants: {
      hidden:  { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay:    extraDelay,
          ease:     [0.22, 1, 0.36, 1],
        },
      },
    },
  })

  const slideIn = (direction = 'left', extraDelay = 0) => ({
    variants: {
      hidden:  { opacity: 0, x: direction === 'left' ? -24 : 24 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.55,
          delay:    extraDelay,
          ease:     [0.22, 1, 0.36, 1],
        },
      },
    },
  })

  return { ref, inView, container, item, slideIn }
}