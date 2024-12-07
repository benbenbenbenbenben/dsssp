'use client'

import React, { createContext, useContext } from 'react'

import { type GraphScale, type GraphTheme } from './types'

type FrequencyGraph = {
  theme: GraphTheme
  scale: GraphScale
  svgRef: React.RefObject<SVGSVGElement>
}

const FrequencyGraphContext = createContext<FrequencyGraph | undefined>(
  undefined
)

const FrequencyGraphProvider = ({
  children,
  svgRef,
  scale,
  theme
}: {
  children: React.ReactNode
  svgRef: React.RefObject<SVGSVGElement>
  scale: GraphScale
  theme: GraphTheme
}) => {
  const contextValue = {
    svgRef,
    theme,
    scale
  }

  return (
    <FrequencyGraphContext.Provider value={contextValue}>
      {children}
    </FrequencyGraphContext.Provider>
  )
}
export default FrequencyGraphProvider

export const useGraph = () => {
  const context = useContext(FrequencyGraphContext)
  if (context === undefined) {
    throw new Error('useGraph must be used within an FrequencyGraphProvider')
  }
  return context
}
