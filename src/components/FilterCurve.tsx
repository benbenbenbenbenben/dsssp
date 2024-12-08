import { calcCurve } from '../math'
import { type GraphFilter } from '../types'
import { FilterPin } from './FilterPin'
import { useGraph } from './FrequencyGraphProvider'

export type FilterCurveProps = {
  /**
   * Filter to render
   */
  filter: GraphFilter
  /**
   * Index of the color in the theme colors array to use if no color is provided
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
   * Gradient ID to use for the curve fill
   */
  gradientId?: string
  /**
   * Curve color
   * @default theme.colors[index].curve
   */
  color?: string
  /**
   * Active curve color
   * @default theme.colors[index].active
   */
  activeColor?: string
  /**
   * Curve opacity
   * @default theme.curve.opacity.normal
   */
  opacity?: number
  /**
   * Active curve opacity
   * @default theme.curve.opacity.active
   */
  activeOpacity?: number
  /**
   * Curve line width
   * @default theme.curve.width.normal
   */
  lineWidth?: number
  /**
   * Active curve line width
   * @default theme.curve.width.active
   */
  activeLineWidth?: number
}

export const FilterCurve = ({
  filter,
  color,
  index = 0,
  lineWidth,
  opacity,

  gradientId,
  showPin = true,
  active = false,

  activeColor,
  activeLineWidth,
  activeOpacity
}: FilterCurveProps) => {
  const {
    scale,
    theme: {
      curve,
      filters: { defaultColor, colors }
    }
  } = useGraph()

  const { path, vars } = calcCurve(filter, scale) || {}
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
          scale={scale}
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
