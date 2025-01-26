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

export type FrequencyResponseGraphProps = {
  /**
   * Width of the SVG element in pixels
   */
  width: number
  /**
   * Height of the SVG element in pixels
   */
  height: number
  /**
   * Scale configuration to override default frequency and gain ranges
   * @default defaultScale
   */
  scale?: Partial<GraphScale>
  /**
   * Theme override for colors and styles
   * @default defaultTheme
   */
  theme?: GraphThemeOverride
  /**
   * Child components to render inside the graph
   */
  children?: React.ReactNode
}

/**
 * This component renders a frequency response graph with customizable dimensions, scaling and theming.
 * It provides the base SVG container and context for rendering filter curves, points and other graph elements.
 *
 * Uses deep merge to combine default theme/scale with provided overrides. Arrays are completely replaced rather than merged.
 */
export const FrequencyResponseGraph = forwardRef<
  SVGSVGElement,
  FrequencyResponseGraphProps
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
