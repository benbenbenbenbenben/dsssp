import { useEffect, useRef, type CSSProperties } from 'react'

import { calcFilterFunction, calcFilterMagnitudes } from '../../math'
import { type BiQuadFunction, type GraphFilter } from '../../types'
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
   * Filter to render
   */
  filter: GraphFilter
  /**
   * Index of the color in the theme colors array to use if no `color` prop is provided
   */
  index?: number
  /**
   * Show vertical pin to connect the curve to its FilterPoint
   */
  showPin?: boolean
  /**
   * Show Bypass curve
   *
   * For most use cases showing zero curve is not necessary
   * @default false
   */
  showBypass?: boolean
  /**
   * Active state (trigger it to highlight the curve along with hovered FilterPoint)
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
   * @default 2
   */
  resolutionFactor?: number
  /**
   * Callback invoked when the BiQuad parameters for the specified filter index change.
   *
   * @param index The index of the filter whose parameters changed.
   * @param vars The newly calculated BiQuad function parameters for the filter.
   */
  onVarsChange?: (index: number, vars: BiQuadFunction) => void
}

/**
 * This component renders the frequency response curve of a given filter on the graph.
 * It displays the filter's shape and can optionally show a vertical pin to connect it with specific types of `FilterPoint`'s, such as `NOTCH`, `LOWPASS`, `HIGHPASS`.
 *
 * Uses `defaultColor` from the theme as a fallback when filter colors are not specified. `BYPASS` curve automatically fallbacks to `zeroPoint.color` from the theme.
 */
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

  const prevFilterRef = useRef('')

  const vars = calcFilterFunction(filter, scale)
  const magnitudes = calcFilterMagnitudes(vars, scale, width, resolutionFactor)

  useEffect(() => {
    const filterHash = JSON.stringify(filter)
    if (vars && prevFilterRef.current !== filterHash) {
      onVarsChange?.(index, vars)
      prevFilterRef.current = filterHash
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
