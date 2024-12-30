import { type CSSProperties } from 'react'

import { filterTypes } from './constants'

export type FilterType = keyof typeof filterTypes
export const filterKeys = Object.keys(filterTypes) as FilterType[]

export type Magnitude = {
  magnitude: number
  frequency: number
}

export type GraphPoint = {
  x: number
  y: number
}

export type BiQuadFunction = {
  A0: number
  A1: number
  A2: number
  B1: number
  B2: number
}

export type LogScaleFunction = {
  x: (value: number) => number
  ticks: (count: number) => number[]
}

export type GraphFilter = {
  type: FilterType
  freq: number
  gain: number
  q: number
}

export type GraphScale = {
  sampleRate: number
  minFreq: number
  maxFreq: number
  minGain: number
  maxGain: number
  dbSteps: number
  octaveTicks: number
  octaveLabels: number[]
}

export type GraphCurve = {
  width: {
    normal: number
    active: number
  }

  opacity: {
    normal: CSSProperties['opacity']
    active: CSSProperties['opacity']
  }

  multiplied: {
    width: number
    color: CSSProperties['color']
  }
}

export type GraphColor = {
  point: CSSProperties['color']
  drag: CSSProperties['color']
  active: CSSProperties['color']

  curve: CSSProperties['color']
  gradient: CSSProperties['color']

  background: CSSProperties['color']
  dragBackground: CSSProperties['color']
  activeBackground: CSSProperties['color']
}

export type GraphTheme = {
  background: {
    grid: {
      lineColor: CSSProperties['color']
      lineWidth: {
        minor: number
        major: number
        center: number
        border: number
      }
    }
    gradient: {
      start: CSSProperties['color']
      end: CSSProperties['color']
    }
    tracker: {
      lineWidth: number
      lineColor: CSSProperties['color']
      backgroundColor: CSSProperties['color']
    }
    label: {
      fontSize: number
      fontFamily: string
      color: CSSProperties['color'] | 'inherit'
    }
  }

  curve: GraphCurve
  filters: {
    staticGradient?: boolean
    gradientOpacity: CSSProperties['opacity']

    zeroPoint: {
      color: CSSProperties['color']
      background: CSSProperties['color']
    }
    point: {
      radius: number
      lineWidth: number
      backgroundOpacity: {
        drag: CSSProperties['opacity']
        active: CSSProperties['opacity']
        normal: CSSProperties['opacity']
      }
      label: {
        fontSize: number
        fontFamily: string
        color: CSSProperties['color'] | 'inherit'
      }
    }

    defaultColor: CSSProperties['color']
    colors: GraphColor[]
  }
}
