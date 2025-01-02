import type React from 'react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import merge from 'deepmerge'

import { defaultScale, defaultTheme } from '../../defaults'
import { getLogScaleFn } from '../../math'
import { type GraphScale, type GraphTheme } from '../../types'

import {
  GraphGainGrid,
  GraphFrequencyGrid,
  GraphGradient,
  GraphProvider
} from '.'

// Recursive type DeepPartial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Helper type Exact to ensure the absence of additional keys
type Exact<P, I extends P> = P & Record<Exclude<keyof I, keyof P>, never>

export type GraphThemeOverride = Exact<
  DeepPartial<GraphTheme>,
  DeepPartial<GraphTheme>
>

export const FrequencyResponseGraph = forwardRef<
  SVGSVGElement,
  {
    width: number
    height: number
    scale?: Partial<GraphScale>
    theme?: GraphThemeOverride
    children?: React.ReactNode
  }
>((props, forwardedRef): React.ReactElement => {
  const ref = useRef<SVGSVGElement>(null)
  useImperativeHandle(forwardedRef, () => ref.current!)

  const { width, height, scale = {}, theme = {}, children } = props
  const mergedTheme: GraphTheme = merge(defaultTheme, theme as GraphTheme)
  const mergedScale: GraphScale = merge(defaultScale, scale, {
    arrayMerge: (_, source) => source // overwrite arrays
  })

  const { minFreq, maxFreq } = mergedScale
  const logScale = getLogScaleFn(minFreq, maxFreq, width)

  FrequencyResponseGraph.displayName = 'FrequencyResponseGraph'

  const graphId = `frequency-response-graph-${String(Math.random()).slice(2, 9)}`
  const resetStyles = `
  #${graphId} * {
    pointer-events: none;
  }`

  return (
    <svg
      id={graphId}
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
      <style>{resetStyles}</style>
      <GraphProvider
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
      </GraphProvider>
    </svg>
  )
})
