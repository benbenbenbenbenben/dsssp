import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  calcBiquadFunction,
  calcCompositeMagnitudes,
  calcMagnitudes
} from '../../math'
import { type GraphFilter, type Magnitude } from '../../types'
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

const getFilterKey = (filter: GraphFilter) =>
  `${filter.type}_${filter.freq}_${filter.q}_${filter.gain}`

export const CompositeCurve = ({
  filters,
  dotted = false,
  color = '#FFFFFF',
  opacity = 1,
  lineWidth = 1.5,
  resolutionFactor = 2
}: CompositeCurveProps) => {
  const { scale, width } = useGraph()
  const { minFreq, maxFreq, sampleRate } = scale

  const [magnitudesCache, setMagnitudesCache] = useState<
    Record<string, Magnitude[]>
  >({})

  const memoizedGetFilterKey = useCallback((filter: GraphFilter) => {
    return getFilterKey(filter)
  }, [])

  const activeKeys = useMemo(() => {
    return new Set<string>(filters.map((f) => memoizedGetFilterKey(f)))
  }, [filters, memoizedGetFilterKey])

  const updateCache = useCallback(() => {
    const newCache: Record<string, Magnitude[]> = { ...magnitudesCache }

    Object.keys(newCache).forEach((cachedKey) => {
      if (!activeKeys.has(cachedKey)) {
        delete newCache[cachedKey]
      }
    })

    filters.forEach((filter) => {
      const key = memoizedGetFilterKey(filter)
      if (!newCache[key]) {
        const { freq, q, gain, type } = filter
        const steps = width / resolutionFactor
        const vars = calcBiquadFunction(sampleRate, type, freq, q, gain)
        newCache[key] =
          calcMagnitudes(sampleRate, minFreq, maxFreq, steps, vars) || []
      }
    })

    setMagnitudesCache(newCache)
  }, [filters])

  useEffect(() => {
    updateCache()
  }, [updateCache])

  const compositeMagnitudes = useMemo(() => {
    const allMags = Object.values(magnitudesCache).filter((m) => m.length)
    return calcCompositeMagnitudes(allMags)
  }, [magnitudesCache])

  return (
    <>
      <use href="#centerLine" />
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
