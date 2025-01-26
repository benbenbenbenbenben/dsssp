import { useEffect, useRef, type CSSProperties } from 'react'

import { calcFilterCoefficients, calcFilterMagnitudes } from '../../math'
import { type BiQuadCoefficients, type GraphFilter } from '../../types'
import {
  type FrequencyResponseCurveProps,
  FrequencyResponseCurve,
  useGraph
} from '../..'
import { FilterPin } from '.'

export type FilterCurveProps = Omit<
  FrequencyResponseCurveProps,
  'magnitudes' | 'dotted'
> & {
  /**
   * Filter parameters object defining type, frequency, gain and Q values
   */
  filter: GraphFilter
  /**
   * Index in the theme colors array. Used for consistent coloring across
   * multiple filters when no explicit color is provided
   * @default -1
   */
  index?: number
  /**
   * Renders a vertical pin connecting the curve to its corresponding FilterPoint
   * Useful for NOTCH, LOWPASS, and HIGHPASS filter types
   * @default false
   */
  showPin?: boolean
  /**
   * Show Bypass curve
   * For most use cases showing zero curve is not necessary
   * @default false
   */
  showBypass?: boolean
  /**
   * Active state (trigger it to highlight the curve along with hovered FilterPoint)
   * @default false
   */
  active?: boolean
  /**
   * Curve color
   * @default theme.colors[index].curve || theme.filters.defaultColor || '#00FF00'
   */
  color?: string
  /**
   * Active curve color
   * @default theme.colors[index].active || color || theme.filters.defaultColor || '#00FF00'
   */
  activeColor?: string
  /**
   * Curve opacity
   * @default theme.curve.opacity.normal || 0.5
   */
  opacity?: CSSProperties['opacity']
  /**
   * Active curve opacity
   * @default theme.curve.opacity.active || 0.7
   */
  activeOpacity?: CSSProperties['opacity']
  /**
   * Curve line width
   * @default theme.curve.width.normal || 1.5
   */
  lineWidth?: number
  /**
   * Active curve line width
   * @default theme.curve.width.active || 1.5
   */
  activeLineWidth?: number
  /**
   * Adjusts the resolution of the curve by reducing the number of points based on the graph's width.
   * Lower values = more points = smoother curve but slower performance.
   * @default 2
   */
  resolutionFactor?: number
  /**
   * Optional gradient ID to fill the curve with a gradient.
   * The gradient must be defined elsewhere in the SVG.
   * @default undefined
   */
  gradientId?: string
  /**
   * Callback invoked when the BiQuad parameters for the specified filter index change.
   * Useful for syncing filter parameters with Web Audio API nodes.
   * @param index - The index of the filter whose parameters changed
   * @param vars - The newly calculated BiQuad function parameters for the filter
   */
  onVarsChange?: (index: number, vars: BiQuadCoefficients) => void
}

/**
 * Renders a frequency response curve for a single filter.
 * Visualizes filter's magnitude response and provides interactive controls
 * when used with FilterPoint component.
 *
 * Features:
 * - BiQuad coefficient calculation
 * - Active state support
 * - Optional vertical pin
 * - Performance optimization
 **/
export const FilterCurve = ({
  filter,
  color,
  index = -1,
  lineWidth,
  opacity,

  resolutionFactor = 2,

  gradientId,
  showPin = false,
  showBypass = false,
  active = false,

  activeColor,
  activeLineWidth,
  activeOpacity,

  onVarsChange
}: FilterCurveProps) => {
  const {
    scale,
    width,
    theme: {
      filters: { zeroPoint, curve, defaultColor, colors }
    }
  } = useGraph()

  const prevFilterHashRef = useRef('')

  const vars = calcFilterCoefficients(filter, scale.sampleRate)
  const magnitudes = calcFilterMagnitudes(vars, scale, width, resolutionFactor)

  useEffect(() => {
    const filterHash = JSON.stringify(filter)
    if (vars && prevFilterHashRef.current !== filterHash) {
      onVarsChange?.(index, vars)
      prevFilterHashRef.current = filterHash
    }
  }, [filter, vars, onVarsChange])

  if (!vars || !magnitudes?.length) return null

  const zeroValue = filter.type === 'BYPASS'
  if (zeroValue && !showBypass) return null

  const normalColor = color || colors?.[index]?.curve || defaultColor
  const curveColor = zeroValue
    ? zeroPoint.color
    : active
      ? activeColor || colors?.[index]?.active || normalColor
      : normalColor

  const curveOpacity = active
    ? activeOpacity || curve.opacity.active
    : opacity || curve.opacity.normal

  const curveWidth = active
    ? activeLineWidth || curve.width.active
    : lineWidth || curve.width.normal

  return (
    <>
      {showPin && (
        <FilterPin
          vars={vars}
          filter={filter}
          color={curveColor}
          opacity={curveOpacity}
          width={curveWidth}
        />
      )}
      <FrequencyResponseCurve
        magnitudes={magnitudes}
        color={curveColor}
        opacity={curveOpacity}
        lineWidth={curveWidth}
        gradientId={gradientId}
      />
    </>
  )
}
