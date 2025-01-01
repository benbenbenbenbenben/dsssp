import { useMemo } from 'react'

import { type GraphFilter } from '../../types'
import { getZeroGain } from '../../utils'
import { useGraph } from '../..'

export type FilterGradientProps = {
  /**
   * Gradient Id. It is required to connect the gradient to the filter curve.
   */
  id: string
  /**
   * Filter to render
   */
  filter: GraphFilter
  /**
   * Index of the color in the theme colors array to use if no `color` prop is provided
   */
  index?: number
  /**
   * Stop color of the gradient.
   *
   * (Start color is always transparent.)
   * @default theme.filters.colors[index].gradient || theme.filters.defaultColor || '#00FF00'
   */
  color?: string
  /**
   * Stop opacity of the gradient.
   *
   * (Start opacity is always 0, unless `fill` flag was used.)
   * @default theme.filters.gradientOpacity || 0.7
   */
  opacity?: number
  /**
   * Use static fill color for the gradient
   * @default theme.filters.staticGradient || false
   */
  fill?: boolean
}

export const FilterGradient = ({
  id,
  filter,
  index = 0,
  opacity,
  color,
  fill = false
}: FilterGradientProps) => {
  const {
    theme: { filters }
  } = useGraph()

  const stopColor =
    color || filters.colors?.[index]?.gradient || filters.defaultColor
  const stopOpacity = opacity || filters.gradientOpacity

  let gradientDirection

  const zeroGain = useMemo(() => getZeroGain(filter.type), [filter.type])

  const startColor = fill || filters.fill ? stopColor : false

  if (zeroGain) {
    gradientDirection = { y1: '140%', y2: '0%' }
  } else if (filter.gain <= 0) {
    gradientDirection = { y1: '100%', y2: '0%' }
  } else {
    gradientDirection = { y1: '0%', y2: '100%' }
  }

  return (
    <linearGradient
      id={id}
      x1="0%"
      x2="0%"
      {...gradientDirection}
    >
      <stop
        offset="0%"
        stopColor={stopColor}
        stopOpacity={stopOpacity}
      />
      <stop
        offset="100%"
        stopColor={startColor || 'transparent'}
        stopOpacity={startColor ? stopOpacity : 0}
      />
    </linearGradient>
  )
}
