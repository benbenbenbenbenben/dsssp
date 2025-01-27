import { type CSSProperties } from 'react'

import { plotCurve, scaleMagnitudes } from '../../math'
import { type Magnitude } from '../../types'
import { useGraph } from '../..'

export type FrequencyResponseCurveProps = {
  /**
   * Array of magnitude values defining the curve shape
   */
  magnitudes: Magnitude[]
  /**
   * Color override for the curve stroke
   * @default theme.curve.color
   */
  color?: CSSProperties['color']
  /**
   * Opacity override for the curve stroke
   * @default theme.curve.opacity
   */
  opacity?: CSSProperties['opacity']
  /**
   * Line width override for the curve stroke
   * @default theme.curve.width
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
  /**
   * Additional CSS classes to apply to the curve path
   */
  className?: string
  /**
   * Additional inline styles to apply to the curve path
   */
  style?: CSSProperties
}

/**
 * Renders a frequency response curve from an array of magnitude values.
 * This is the basic curve component used internally by `CompositeCurve` and `FilterCurve`.
 * Can also be used directly to render custom frequency response curves.
 *
 * Uses `theme.curve` values as defaults for styling when color/opacity/width are not specified.
 * Supports optional gradient fills and dotted line styles.
 */
export const FrequencyResponseCurve = ({
  magnitudes,
  dotted = false,
  color,
  opacity,
  lineWidth,
  gradientId,
  className,
  style
}: FrequencyResponseCurveProps) => {
  const {
    scale,
    width,
    height,
    theme: { curve }
  } = useGraph()

  const points = scaleMagnitudes(magnitudes, scale, width, height)
  const path = plotCurve(points, scale, width, height)

  const curveColor = color || curve.color
  const curveWidth = lineWidth || curve.width
  const curveOpacity = opacity || curve.opacity

  // NOTE: center line should be rendered on top of all filter curves but behind the final, resulting one

  return (
    <path
      d={path}
      stroke={curveColor}
      strokeWidth={curveWidth}
      strokeOpacity={curveOpacity}
      strokeLinecap="round"
      {...(dotted ? { strokeDasharray: '1,3' } : {})}
      fill={gradientId ? `url(#${gradientId})` : 'none'}
      className={className}
      style={style}
    />
  )
}
