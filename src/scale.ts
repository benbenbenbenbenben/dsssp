import { type GraphScale } from './types'

export const defaultScale: GraphScale = {
  minFreq: 20,
  maxFreq: 20000,
  sampleRate: 44100, // 48000 / 96000 / 192000
  minGain: -16,
  maxGain: 16,
  dbSteps: 4, // 0 to disable
  dbLabels: true,
  octaveTicks: 10, // ticks per octave (0 to disable)
  octaveLabels: [20, 40, 60, 100, 200, 500, 1000, 2000, 5000, 10000, 20000],
  majorTicks: [100, 1000, 10000] // ticks with the major line width, same as zero gain
}
