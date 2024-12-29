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

export const defaultScale: GraphScale = {
  minFreq: 20,
  maxFreq: 20000,
  sampleRate: 44100,
  minGain: -16,
  maxGain: 16,
  dbSteps: 4,
  octaveTicks: 10,
  octaveLabels: [10, 20, 40, 60, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]
}

export const defaultTheme: GraphTheme = {
  background: {
    grid: {
      lineColor: '#3D4C5F',
      lineWidth: { minor: 0.3, major: 0.6, center: 1.5, border: 0.3 }
    },
    gradient: {
      start: '#1E2530',
      end: '#000000'
    },
    tracker: {
      lineWidth: 0.6,
      lineColor: '#7B899D',
      backgroundColor: '#070C18'
    },
    label: {
      fontSize: 10,
      fontFamily: 'sans-serif',
      color: '#626F84'
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
      radius: 16,
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
