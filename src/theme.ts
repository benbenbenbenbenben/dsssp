import { type GraphTheme } from './types'

export const defaultTheme: GraphTheme = {
  background: {
    // background grid lines
    grid: {
      lineColor: '#3D4C5F',
      lineWidth: { minor: 0.25, major: 0.5, center: 1, border: 0.25 }
    },
    // background gradient
    gradient: {
      start: '#1E2530',
      end: '#000000'
    },
    // frequency and gain labels
    label: {
      fontSize: 10,
      fontFamily: 'sans-serif',
      color: '#626F84'
    },
    // mouse tracker
    tracker: {
      lineWidth: 0.5,
      lineColor: '#7B899D',
      backgroundColor: '#070C18'
    }
  },
  // basic frequency response and composite curves
  curve: {
    width: 1.5,
    opacity: 1,
    color: '#FFFFFF'
  },

  filters: {
    // filter curves
    curve: {
      width: { normal: 1, active: 1 },
      opacity: { normal: 0.5, active: 0.7 }
    },

    // filter points
    point: {
      radius: 16,
      lineWidth: 2,
      backgroundOpacity: {
        normal: 0.2,
        active: 0.6,
        drag: 0.8
      },
      // label inside the point
      // size and color applicable to filter icons as well
      label: {
        fontSize: 24,
        fontFamily: 'monospace',
        color: 'inherit'
      }
    },

    // styles of the empty / zero gain filters
    zeroPoint: {
      color: '#626F84',
      background: '#97A3B4'
    },

    gradientOpacity: 0.7,
    staticGradient: false,
    // default color for filters, points, and curves
    defaultColor: '#CC66FF',
    // empty placeholder of filter colors
    colors: []
  }
}
