import merge from 'deepmerge'
import type React from 'react'
import { forwardRef, useImperativeHandle, useRef } from 'react'

import { getLogScaleFn } from '../../math'
import { defaultScale, defaultTheme } from '../../constants'
import { type GraphScale, type GraphTheme } from '../../types'
import {
  GraphGainGrid,
  GraphFrequencyGrid,
  GraphGradient,
  FrequencyResponseGraphProvider
} from '.'

export const FrequencyResponseGraph = forwardRef<
  SVGSVGElement,
  {
    width: number
    height: number
    scale?: Partial<GraphScale>
    theme?: Partial<GraphTheme>
    children?: React.ReactNode
  }
>((props, forwardedRef): React.ReactElement => {
  const ref = useRef<SVGSVGElement>(null)
  useImperativeHandle(forwardedRef, () => ref.current!)

  const { width, height, scale, theme, children } = props
  const mergedTheme: GraphTheme = merge(defaultTheme, theme ?? {})
  const mergedScale: GraphScale = merge(defaultScale, scale ?? {}, {
    arrayMerge: (_, source) => source // overwrite arrays
  })

  const { minFreq, maxFreq } = mergedScale
  const logScale = getLogScaleFn(minFreq, maxFreq, width)

  FrequencyResponseGraph.displayName = 'FrequencyResponseGraph'

  return (
    <svg
      ref={ref}
      style={{
        width,
        height,
        userSelect: 'none',
        position: 'relative',
        verticalAlign: 'middle'
      }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <FrequencyResponseGraphProvider
        svgRef={ref}
        width={width}
        height={height}
        theme={mergedTheme}
        scale={mergedScale}
        logScale={logScale}
      >
        <GraphGradient />
        <GraphGainGrid />
        <GraphFrequencyGrid />
        {children}
      </FrequencyResponseGraphProvider>
    </svg>
  )
})
