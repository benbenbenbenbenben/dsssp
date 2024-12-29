'use client'

import type React from 'react'
import { createContext, useContext } from 'react'

import {
  type GraphScale,
  type GraphTheme,
  type LogScaleFunction
} from '../../types'

type FrequencyGraph = {
  width: number
  height: number
  theme: GraphTheme
  scale: GraphScale
  logScale: LogScaleFunction
  svgRef: React.RefObject<SVGSVGElement>
}

const FrequencyResponseGraphContext = createContext<FrequencyGraph | undefined>(
  undefined
)

export const FrequencyResponseGraphProvider = ({
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
    <FrequencyResponseGraphContext.Provider value={contextValue}>
      {children}
    </FrequencyResponseGraphContext.Provider>
  )
}

export const useGraph = () => {
  const context = useContext(FrequencyResponseGraphContext)
  if (context === undefined) {
    throw new Error(
      'useGraph must be used within an FrequencyResponseGraphProvider'
    )
  }
  return context
}
