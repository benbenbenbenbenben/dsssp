import type { CSSProperties } from 'react'

export const easingSplines = {
  // Standard CSS easing values translated to SVG keySplines format
  linear: '0 0 1 1',
  easeIn: '0.42 0 1 1',
  easeOut: '0 0 0.58 1',
  easeInOut: '0.42 0 0.58 1'
} as const

export type EasingType = keyof typeof easingSplines

export type CurveStyleProps = {
  /**
   * Additional CSS classes to apply to the curve path
   */
  className?: string
  /**
   * Additional inline styles to apply to the curve path
   */
  style?: CSSProperties
}

export type CurveAnimationProps = {
  /**
   * Whether to animate the curve path on magnitudes change
   * @default false
   */
  animate?: boolean
  /**
   * Easing function to use for the animation
   * @default 'easeInOut'
   */
  easing?: EasingType
  /**
   * Duration of the animation in milliseconds
   * @default 300
   */
  duration?: number
}

export type DefaultCurveProps = CurveStyleProps &
  CurveAnimationProps & {
    /**
     * Color override for the curve stroke
     * @default theme.curve.color || '#FFFFFF'
     */
    color?: CSSProperties['color']
    /**
     * Opacity override for the curve stroke
     * @default theme.curve.opacity || 1
     */
    opacity?: CSSProperties['opacity']
    /**
     * Line width override for the curve stroke
     * @default theme.curve.width || 1.5
     */
    lineWidth?: number
    /**
     * Whether to render the curve with a dotted/dashed line style
     * @default false
     */
    dotted?: boolean
    /**
     * Optional gradient ID to fill the curve with a gradient
     * The gradient must be defined by `FilterGradient` component and referenced by its ID
     * @default undefined
     */
    gradientId?: string
  }
