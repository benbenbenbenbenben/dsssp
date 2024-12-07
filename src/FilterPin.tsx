import { useGraph } from './FrequencyGraphProvider'
import {
  calcMagnitudeForFrequency,
  getCenterLine,
  scaleMagnitude
} from './math'
import { type FilterPinProps } from './types'
import { getZeroGain } from './utils'

export const FilterPin = ({
  filter,
  scale,
  vars,
  opacity,
  width,
  color
}: FilterPinProps) => {
  const { minDB, maxDB, height, logScale, sampleRate } = scale
  const { freq, type } = filter
  let { gain, q } = filter
  const zeroGain = getZeroGain(type)
  const {
    theme: {
      filters: { point }
    }
  } = useGraph()
  if (!['LOW', 'HIGH', 'NOTCH'].some((item) => type.includes(item))) return null

  const pass1FilterType = type.includes('PASS1') || type === 'NOTCH'
  const pass2FilterType = type.includes('PASS2')

  // fake zeroGain for PASS filters
  if (pass1FilterType || pass2FilterType) gain = 0
  if (pass1FilterType) q = 0.7

  // circle radius used in the FilterPoint component
  let pointRadius = gain >= 0 || zeroGain ? point.radius : -point.radius

  let pass2UpFlag = false
  if (pass2FilterType && q > 1.1) {
    pointRadius = -point.radius
    pass2UpFlag = true
  }

  let pointY = pointRadius
  if (pass1FilterType || pass2FilterType) {
    pointY += getCenterLine(minDB, maxDB, height)
  } else {
    pointY += scaleMagnitude(gain, minDB, maxDB, height)
  }

  const centerMagnitude = calcMagnitudeForFrequency(sampleRate, freq, vars)
  const magnitudeY = scaleMagnitude(centerMagnitude, minDB, maxDB, height)
  const deltaX = pointY > magnitudeY
  const x = logScale.x(freq)

  if ((gain < 0 && deltaX) || (gain >= 0 && !deltaX) || pass2UpFlag) {
    return (
      <line
        x1={x}
        x2={x}
        y1={pointY}
        y2={magnitudeY}
        stroke={color}
        strokeWidth={width}
        strokeOpacity={opacity}
      />
    )
  }
  return null
}
