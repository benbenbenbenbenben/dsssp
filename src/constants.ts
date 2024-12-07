import { type GraphScale, type GraphTheme } from './types'

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

export const defaultScale: Partial<GraphScale> = {
  minDB: -8,
  maxDB: 8,
  dbStep: 2,
  width: 1000,
  height: 500
}

export const defaultTheme: GraphTheme = {
  background: {
    grid: {
      tickColor: '#626F84',
      lineColor: '#3D4C5F',
      lineWidth: { minor: 0.3, major: 0.6, center: 1.5 }
    },
    gradient: {
      start: '#1E2530',
      end: '#000000'
    },
    tracker: {
      lineWidth: 0.6,
      lineColor: '#7B899D',
      backgroundColor: '#070C18'
    }
  },
  curve: {
    width: { active: 1.5, normal: 1.5 },
    opacity: { active: 0.7, normal: 0.5 },
    multiplied: { width: 1.5, color: '#FFFFFF' }
  },

  filters: {
    staticGradient: false,
    gradientOpacity: 0.7,

    zeroPoint: {
      color: '#626F84',
      background: '#97A3B4'
    },

    point: {
      radius: 17,
      lineWidth: 2,
      backgroundOpacity: {
        normal: 0.2,
        active: 0.6,
        drag: 0.8
      },
      label: {
        fontSize: 24,
        fontFamily: 'monospace',
        color: 'inherit'
      }
    },

    defaultColor: '#00FF00',
    colors: []
  }
}
