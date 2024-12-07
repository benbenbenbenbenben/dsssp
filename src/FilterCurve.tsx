import { FilterPin } from './FilterPin'
import { useGraph } from './FrequencyGraphProvider'
import { calcCurve } from './math'
import { type FilterCurveProps } from './types'

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
