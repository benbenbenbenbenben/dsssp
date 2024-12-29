import { calcMultipliedCurve } from '../../math'
import { type Magnitude } from '../../types'
import { useGraph } from '../..'

export type MultipliedCurveProps = {
  magnitudes: Magnitude[][]
  dotted?: boolean
  width?: number
  color?: string
}

export const MultipliedCurve = ({
  magnitudes,
  dotted = false,
  color
}: MultipliedCurveProps) => {
  const {
    scale,
    width,
    height,
    theme: { curve }
  } = useGraph()
  if (magnitudes?.length === 0) return null
  const path = calcMultipliedCurve(magnitudes, scale, width, height)
  const strokeColor = color || curve.multiplied.color
  const strokeWidth = width || curve.multiplied.width

  // NOTE: center line should be rendered on top of all filter curves but behind the final, resulting one

  return (
    <>
      <use href="#centerLine" />
      <path
        d={path}
        fill="transparent"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        {...(dotted ? { strokeDasharray: '1,3' } : {})}
      />
    </>
  )
}
