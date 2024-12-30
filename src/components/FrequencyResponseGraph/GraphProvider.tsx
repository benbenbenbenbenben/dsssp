'use client'

import type React from 'react'
import { createContext } from 'react'

import {
  type GraphScale,
  type GraphTheme,
  type LogScaleFunction
} from '../../types'

type GraphContextProps = {
  width: number
  height: number
  theme: GraphTheme
  scale: GraphScale
  logScale: LogScaleFunction
  svgRef: React.RefObject<SVGSVGElement>
}

export const GraphContext = createContext<GraphContextProps | undefined>(
  undefined
)

export const GraphProvider = ({
  children,
  svgRef,
  scale,
  logScale,
  height,
  width,
  theme
}: {
  children: React.ReactNode
  svgRef: React.RefObject<SVGSVGElement>
  theme: GraphTheme
  scale: GraphScale
  height: number
  width: number
  logScale: LogScaleFunction
}) => {
  const contextValue = {
    svgRef,
    theme,
    scale,
    logScale,
    height,
    width
  }

  return (
    <GraphContext.Provider value={contextValue}>
      {children}
    </GraphContext.Provider>
  )
}
