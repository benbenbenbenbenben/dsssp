/* eslint-disable no-param-reassign */
/**
 * SVG Path transition timing functions
 */
export const easing = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  elastic: (t: number) => {
    const p = 0.3
    return (
      Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
    )
  },
  bounce: (t: number) => {
    if (t < 1 / 2.75) return 7.5625 * t * t
    if (t < 2 / 2.75) {
      t -= 1.5 / 2.75
      return 7.5625 * t * t + 0.75
    }
    if (t < 2.5 / 2.75) {
      t -= 2.25 / 2.75
      return 7.5625 * t * t + 0.9375
    }
    t -= 2.625 / 2.75
    return 7.5625 * t * t + 0.984375
  }
} as const

export type EasingFunction = (typeof easing)[keyof typeof easing]
export type EasingType = keyof typeof easing

/**
 * Get easing function by name
 */
export const getEasing = (type: EasingType): EasingFunction => easing[type]
