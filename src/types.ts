import { type CSSProperties } from 'react'

export const filterTypes = {
  BYPASS: 0x00,
  PEAK: 0x06,
  HIGHSHELF1: 0x01,
  HIGHSHELF2: 0x02,
  LOWSHELF1: 0x03,
  LOWSHELF2: 0x04,
  HIGHPASS1: 0x07,
  HIGHPASS2: 0x08,
  LOWPASS1: 0x09,
  LOWPASS2: 0x0a,
  BANDPASS: 0x0b,
  NOTCH: 0x05,
  GAIN: 0x0c
  // COEFFICIENTS: 0x10
}

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

type FilterThemeColors = {
  // point colors for each state
  point?: CSSProperties['color']
  drag?: CSSProperties['color']
  active?: CSSProperties['color']
  // point background colors for each state
  background?: CSSProperties['color']
  dragBackground?: CSSProperties['color']
  activeBackground?: CSSProperties['color']
  // gradient stop color
  // gradient's start color is always transparent, unless `fill` prop is set to true
  gradient?: CSSProperties['color']
  // curve color
  curve?: CSSProperties['color']
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
      stop: CSSProperties['color']
    }

    label: {
      fontSize: number
      fontFamily: string
      color: CSSProperties['color'] | 'inherit'
    }
    tracker: {
      lineWidth: number
      lineColor: CSSProperties['color']
      labelColor: CSSProperties['color']
      backgroundColor: CSSProperties['color']
    }
  }

  curve: {
    width: number
    color: CSSProperties['color']
    opacity: CSSProperties['opacity']
  }

  filters: {
    curve: {
      width: {
        normal: number
        active: number
      }

      opacity: {
        normal: CSSProperties['opacity']
        active: CSSProperties['opacity']
      }
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

    zeroPoint: {
      color: CSSProperties['color']
      background: CSSProperties['color']
    }

    fill: boolean
    gradientOpacity: CSSProperties['opacity']

    defaultColor: CSSProperties['color']
    colors: FilterThemeColors[]
  }
}
