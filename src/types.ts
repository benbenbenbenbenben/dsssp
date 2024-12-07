import { type CSSProperties } from 'react'

import { type filterTypes } from './constants'

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

export type FilterType = keyof typeof filterTypes

export type GraphFilter = {
  type: FilterType
  freq: number
  gain: number
  q: number
}

export type GraphScale = {
  width: number
  height: number
  logScale: LogScaleFunction

  sampleRate: number
  minFreq: number
  maxFreq: number
  minDB: number
  maxDB: number
  dbStep: number
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
  curve: CSSProperties['color']
  active: CSSProperties['color']
  gradient: CSSProperties['color']
  dragging: CSSProperties['color']
  background: CSSProperties['color']
}

export type GraphTheme = {
  background: {
    grid: {
      tickColor: CSSProperties['color']
      lineColor: CSSProperties['color']
      lineWidth: {
        minor: number
        major: number
        center: number
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

export type FilterIconProps = {
  type?: FilterType
  gain?: number
  filter?: GraphFilter
  size?: number
  color?: string
  style?: CSSProperties
  className?: string
}

export type FilterTypedIconProps = Omit<FilterIconProps, 'type'>

export type FilterCurveProps = {
  filter: GraphFilter
  color?: string
  index?: number
  lineWidth?: number
  opacity?: number

  showPin?: boolean
  gradientId?: string

  active?: boolean
  activeColor?: string
  activeLineWidth?: number
  activeOpacity?: number
}

export type FilterGradientProps = {
  id: string
  filter: GraphFilter
  index?: number
  color?: string
  opacity?: number
  staticGradient?: boolean
}

export type FilterPinProps = {
  filter: GraphFilter
  scale: GraphScale
  vars: BiQuadFunction
  width?: number
  opacity?: CSSProperties['opacity']
  color?: CSSProperties['color']
}

type FilterChangeEvent = Partial<GraphFilter> & {
  index?: number
  ended?: boolean
}

export type FilterPointProps = {
  filter: GraphFilter
  index: number
  dragX?: boolean
  dragY?: boolean
  radius?: number
  active?: boolean
  lineWidth?: number
  showIcon?: boolean
  label?: string
  labelFontFamily?: string
  labelFontSize?: number
  labelColor?: CSSProperties['color']
  color?: CSSProperties['color']
  background?: CSSProperties['color']
  activeColor?: CSSProperties['color']
  zeroColor?: CSSProperties['color']
  zeroBackground: CSSProperties['color']
  backgroundOpacity?: CSSProperties['opacity']
  dragBackgroundOpacity?: CSSProperties['opacity']
  activeBackgroundOpacity?: CSSProperties['opacity']
  onChange?: (filterEvent: FilterChangeEvent) => void
  onEnter?: (filterEvent: FilterChangeEvent) => void
  onLeave?: () => void
  onDrag?: (dragging: boolean) => void
}

export type MultipliedCurveProps = {
  magnitudes: Magnitude[][]
  dotted?: boolean
  width?: number
  color?: string
}

export type MouseTrackerProps = {
  lineWidth?: number
  lineColor?: CSSProperties['color']
  backgroundColor?: CSSProperties['color']
}
