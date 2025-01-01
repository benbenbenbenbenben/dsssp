import {
  calcBiquadFunction,
  calcCompositeMagnitudes,
  calcMagnitudes
} from '../../math'
import { type GraphFilter, type Magnitude } from '../../types'
import { getZeroGain } from '../../utils'
import { useGraph, FrequencyResponseCurve } from '..'

type CompositeCurveProps = {
  /**
   * Array of filters to combine for the final composite curve
   */
  filters: GraphFilter[]
  /**
   * Dotted curve style
   * @default false
   */
  dotted?: boolean
  /**
   * Composite curve color
   * @default theme.curve.composite.color || '#FFFFFF'
   */
  color?: string
  /**
   * Composite curve opacity
   * @default theme.curve.composite.opacity || 1
   */
  opacity?: number
  /**
   * Composite curve line width
   * @default theme.curve.composite.width || 1.5
   */
  lineWidth?: number
  /**
   * Adjusts the resolution of the curve by reducing the number of points based on the graph's width.
   *
   * Calculations of the composite curve are expensive, so use this prop to optimize performance if more than 10 filters applied.
   * @default 2
   */
  resolutionFactor?: number
}

export const CompositeCurve = ({
  filters,
  dotted,
  color,
  opacity,
  lineWidth,
  resolutionFactor = 2
}: CompositeCurveProps) => {
  const { scale, width } = useGraph()
  const { minFreq, maxFreq, sampleRate } = scale

  const filterMagnitudesArray: Magnitude[][] = []

  filters.forEach((filter) => {
    const { freq, q, gain, type } = filter
    const zeroGain = getZeroGain(type)

    if ((gain === 0 && !zeroGain) || type === 'BYPASS') {
      return
    }
    const steps = width / resolutionFactor
    const vars = calcBiquadFunction(sampleRate, type, freq, q, gain)
    const mags = calcMagnitudes(sampleRate, minFreq, maxFreq, steps, vars)

    if (mags?.length) filterMagnitudesArray.push(mags)
  })

  const compositeMagnitudes = calcCompositeMagnitudes(filterMagnitudesArray)

  return (
    <>
      <use href="#center-line" />
      <FrequencyResponseCurve
        magnitudes={compositeMagnitudes}
        dotted={dotted}
        color={color}
        opacity={opacity}
        lineWidth={lineWidth}
      />
    </>
  )
}
