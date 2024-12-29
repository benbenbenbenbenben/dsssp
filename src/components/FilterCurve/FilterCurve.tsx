import { FilterPin } from '.'
import { calcCurve } from '../../math'
import { type GraphFilter } from '../../types'
import { useGraph } from '../..'

export type FilterCurveProps = {
  /**
   * Filter to render
   */
  filter: GraphFilter
  /**
   * Index of the color in the theme colors array to use if no `color` prop is provided
   */
  index?: number
  /**
   * Active state (same as hovered)
   */
  active?: boolean
  /**
   * Show vertical pin to connect the curve to the FilterPoint
   */
  showPin?: boolean
  /**
   * Gradient ID to fill the curve with a gradient
   */
  gradientId?: string
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
  opacity?: number
  /**
   * Active curve opacity
   * @default theme.curve.opacity.active || 0.7
   */
  activeOpacity?: number
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
}

/**
 * The `FilterCurve` component renders the frequency response curve of a given filter on the graph.
 * It displays the filter's shape and can optionally show a vertical pin to connect to the specific types of `FilterPoint`'s, such as `NOTCH`, `LOWPASS`, `HIGHPASS`.
 */
export const FilterCurve = ({
  filter,
  color,
  index = 0,
  lineWidth,
  opacity,

  gradientId = '',
  showPin = true,
  active = false,

  activeColor,
  activeLineWidth,
  activeOpacity
}: FilterCurveProps) => {
  const {
    scale,
    width,
    height,
    theme: {
      curve,
      filters: { defaultColor, colors }
    }
  } = useGraph()

  const { path, vars } = calcCurve(filter, scale, width, height) || {}
  if (!path || !vars) return null

  const normalColor = color || colors[index]?.curve || defaultColor
  const curveColor = active
    ? activeColor || colors[index]?.active || normalColor
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
          width={curveWidth}
          opacity={curveOpacity}
        />
      )}
      <path
        d={path}
        stroke={curveColor}
        strokeWidth={curveWidth}
        strokeOpacity={curveOpacity}
        fill={gradientId ? `url(#${gradientId})` : 'none'}
      />
    </>
  )
}
