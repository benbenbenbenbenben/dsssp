import { type GraphScale } from './types'

export const defaultScale: GraphScale = {
  minFreq: 20,
  maxFreq: 20000,
  sampleRate: 44100,
  minGain: -16,
  maxGain: 16,
  dbSteps: 4,
  octaveTicks: 10,
  octaveLabels: [20, 40, 60, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]
}
