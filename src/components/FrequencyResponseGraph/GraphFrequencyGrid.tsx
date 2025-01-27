import { useGraph } from '.'

export const GraphFrequencyGrid = () => {
  const {
    height,
    logScale,
    scale: { octaveLabels, octaveTicks, majorTicks },
    theme: {
      background: {
        grid: { lineColor, lineWidth },
        label: { color: labelColor, fontSize, fontFamily }
      }
    }
  } = useGraph()

  const ticks = octaveTicks ? logScale.ticks(octaveTicks) : [0, 0]
  const lastOctave = octaveLabels.at(-1)

  return (
    <>
      {ticks.slice(1, -1).map((tick) => {
        const tickX = logScale.x(tick)

        const width = majorTicks.includes(tick)
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

      {octaveLabels.map((octave) => {
        const octaveX = logScale.x(octave)
        return (
          <text
            key={octave}
            y={height - 4}
            x={octaveX + (octave === lastOctave ? -4 : 4)}
            textAnchor={octave === lastOctave ? 'end' : 'start'}
            fill={labelColor}
            fontSize={fontSize}
            fontFamily={fontFamily}
          >
            {(octave < 1000 ? octave : `${octave / 1000}k`) + 'Hz'}
          </text>
        )
      })}
    </>
  )
}
