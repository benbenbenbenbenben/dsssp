import merge from 'deepmerge'
import React, { forwardRef } from 'react'

import { defaultScale, defaultTheme } from './constants'
import FrequencyGraphProvider from './FrequencyGraphProvider'
import { FrequencyGrid } from './FrequencyGrid'
import { GainGrid } from './GainGrid'
import { GraphGradient } from './GraphGradient'
import { type GraphScale, type GraphTheme } from './types'

export const FrequencyResponseGraph = forwardRef<
  SVGSVGElement,
  { scale: GraphScale; theme: GraphTheme; children: React.ReactNode }
>((props, forwardedRef): React.ReactElement => {
  const ref = React.useRef<SVGSVGElement>(null)
  React.useImperativeHandle(forwardedRef, () => ref.current!)

  const { scale, theme, children } = props
  const mergedTheme: GraphTheme = merge(defaultTheme, theme ?? {})
  const mergedScale: GraphScale = merge(defaultScale, scale ?? {})
  const { width, height } = mergedScale

  return (
    <svg
      ref={ref}
      style={{ userSelect: 'none' }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <FrequencyGraphProvider
        svgRef={ref}
        theme={mergedTheme}
        scale={mergedScale}
      >
        <GraphGradient />
        <GainGrid />
        <FrequencyGrid />
        {children}
      </FrequencyGraphProvider>
    </svg>
  )
})
