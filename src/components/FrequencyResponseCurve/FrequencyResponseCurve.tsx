import { useLayoutEffect, useMemo, useRef } from 'react'

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

  // Track first mount and previous path
  const firstMount = useRef(true)
  const prevPathRef = useRef<string>('')
  // Reference to animate element
  const animateRef = useRef<SVGAnimateElement>(null)

  // Memoize paths calculation
  const { currentPath, initialPath } = useMemo(() => {
    const points = scaleMagnitudes(magnitudes, scale, width, height)
    const flatPoints = points.map((p) => ({ x: p.x, y: height / 2 }))

    const currentPath = plotCurve(points, scale, width, height)
    const initialPath = plotCurve(flatPoints, scale, width, height)

    return { currentPath, initialPath }
  }, [magnitudes, scale, width, height])

  // Handle initial mount state
  useLayoutEffect(() => {
    if (firstMount.current) {
      prevPathRef.current = initialPath
      firstMount.current = false
    }
  }, [initialPath])

  // Update previous path and trigger animation
  useLayoutEffect(() => {
    if (!firstMount.current && animate && animateRef.current) {
      prevPathRef.current = currentPath
      animateRef.current.beginElement()
    }
  }, [magnitudes, animate])

  // Determine which path to display
  const displayPath = animate && firstMount.current ? initialPath : currentPath
  const fromPath = prevPathRef.current || initialPath

  const curveColor = color || curve.color
  const curveWidth = lineWidth || curve.width
  const curveOpacity = opacity || curve.opacity

  return (
    <path
      d={displayPath}
      stroke={curveColor}
      strokeWidth={curveWidth}
      strokeOpacity={curveOpacity}
      strokeLinecap="round"
      {...(dotted ? { strokeDasharray: '1,3' } : {})}
      fill={gradientId ? `url(#${gradientId})` : 'none'}
      className={className}
      style={style}
    >
      {animate && (
        <animate
          ref={animateRef}
          from={fromPath}
          to={currentPath}
          fill="freeze"
          repeatCount="1"
          attributeName="d"
          dur={`${duration}ms`}
          calcMode="spline"
          keyTimes="0;1"
          keySplines={easingSplines[easing]}
          additive="replace"
          accumulate="none"
        />
      )}
    </path>
  )
}
