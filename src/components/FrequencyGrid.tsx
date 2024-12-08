import { useGraph } from './FrequencyGraphProvider'

export const FrequencyGrid = ({
  octaves = [20, 40, 60, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]
}: {
  octaves?: number[]
}) => {
  const {
    scale: { height, logScale },
    theme: {
      background: {
        grid: { tickColor, lineColor, lineWidth }
      }
    }
  } = useGraph()

  const ticks = logScale.ticks(10) // 10 ticks per octave
  const lastOctave = octaves.at(-1)

  return (
    <>
      {ticks.map((tick) => {
        const tickX = logScale.x(tick)

        const width = [100, 1000, 10000].includes(tick)
          ? lineWidth.major
          : lineWidth.minor

        return (
          <line
            key={tick}
            x1={tickX}
            x2={tickX}
            y1="0"
            y2="100%"
            stroke={lineColor}
            strokeWidth={width}
          />
        )
      })}

      {octaves.map((octave) => {
        const octaveX = logScale.x(octave)
        return (
          <text
            key={octave}
            y={height - 5}
            x={octaveX + (octave === lastOctave ? -5 : 5)}
            textAnchor={octave === lastOctave ? 'end' : 'start'}
            fill={tickColor}
            fontSize="10"
          >
            {(octave < 1000 ? octave : `${octave / 1000}k`) + 'Hz'}
          </text>
        )
      })}
    </>
  )
}
