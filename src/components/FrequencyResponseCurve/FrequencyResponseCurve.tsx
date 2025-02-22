import { useEffect, useRef, useState } from 'react'

import { type DefaultCurveProps, easingSplines } from '../types'
import { plotCurve, scaleMagnitudes } from '../../math'
import { type Magnitude } from '../../types'
import { useGraph } from '../..'

export type FrequencyResponseCurveProps = DefaultCurveProps & {
  /**
   * Array of magnitude values defining the curve shape
   */
  magnitudes: Magnitude[]
}

/**
 * Renders a frequency response curve from an array of magnitude values.
 * This is the basic curve component used internally by `CompositeCurve` and `FilterCurve`.
 * Can also be used directly to render custom frequency response curves.
 *
 * Uses `theme.curve` values as defaults for styling, when color/opacity/width are not specified.
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
  style,
  animate = false,
  easing = 'easeInOut',
  duration = 300 // ms
}: FrequencyResponseCurveProps) => {
  const {
    scale,
    width,
    height,
    theme: { curve }
  } = useGraph()

  const previousPathRef = useRef<string>('')
  const [initialized, setInitialized] = useState(false)

  const points = scaleMagnitudes(magnitudes, scale, width, height)
  const path = plotCurve(points, scale, width, height)

  // Single effect to handle both initialization and updates
  useEffect(() => {
    if (!initialized) {
      // First time - create flat line with same number of points
      const zeroes = new Array(magnitudes.length).fill(0)
      const initialPoints = scaleMagnitudes(zeroes, scale, width, height)
      previousPathRef.current = plotCurve(initialPoints, scale, width, height)
      setInitialized(true)
    } else {
      previousPathRef.current = path
    }
  }, [path, magnitudes.length, scale, width, height])

  // Don't render animation until initialized
  const showAnimation = animate && initialized && previousPathRef.current

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
    >
      {showAnimation && (
        <animate
          key={path} // Forces new animation when path changes
          attributeName="d"
          from={previousPathRef.current}
          to={path}
          dur={`${duration}ms`}
          fill="freeze"
          calcMode="spline"
          keySplines={easingSplines[easing]}
          repeatCount="1"
        />
      )}
    </path>
  )
}
