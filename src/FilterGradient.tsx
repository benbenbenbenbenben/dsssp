import { useMemo } from 'react'

import { useGraph } from './FrequencyGraphProvider'
import { type FilterGradientProps } from './types'
import { getZeroGain } from './utils'

export const FilterGradient = ({
  id,
  filter,
  index = 0,
  opacity,
  color,
  staticGradient
}: FilterGradientProps) => {
  const {
    theme: { filters }
  } = useGraph()

  const stopColor =
    color || filters.colors?.[index]?.gradient || filters.defaultColor
  const stopOpacity = opacity || filters.gradientOpacity

  let gradientDirection

  const zeroGain = useMemo(() => getZeroGain(filter.type), [filter.type])

  const startColor =
    staticGradient || filters.staticGradient ? stopColor : false

  if (zeroGain) {
    gradientDirection = { y1: '140%', y2: '0%' }
  } else if (filter.gain <= 0) {
    gradientDirection = { y1: '100%', y2: '0%' }
  } else {
    gradientDirection = { y1: '0%', y2: '100%' }
  }

  return (
    <linearGradient id={id} x1="0%" x2="0%" {...gradientDirection}>
      <stop offset="0%" stopColor={stopColor} stopOpacity={stopOpacity} />
      <stop
        offset="100%"
        stopColor={startColor || 'black'}
        stopOpacity={startColor ? stopOpacity : 0}
      />
    </linearGradient>
  )
}
