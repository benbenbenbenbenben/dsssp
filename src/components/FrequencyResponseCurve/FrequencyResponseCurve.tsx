import { type CSSProperties } from 'react'

import { plotCurve, scaleMagnitudes } from '../../math'
import { type Magnitude } from '../../types'
import { useGraph } from '../..'

export type FrequencyResponseCurveProps = {
  magnitudes: Magnitude[]
  color?: string
  opacity?: CSSProperties['opacity']
  lineWidth?: number
  dotted?: boolean
  /**
   * Gradient Id to fill the curve with a gradient
   */
  gradientId?: string
}

/**
 * This component renders the given curve described as an array of Magnitudes on the graph.
 * It is the basic curve component used internally to render the `CompositeCurve` and `FilterCurve`. It can be used to render custom curves as well.
 */
export const FrequencyResponseCurve = ({
  magnitudes,
  dotted = false,
  color,
  opacity,
  lineWidth,
  gradientId = ''
}: FrequencyResponseCurveProps) => {
  const {
    scale,
    width,
    height,
    theme: { curve }
  } = useGraph()
  if (magnitudes.length === 0) return null

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
    />
  )
}
