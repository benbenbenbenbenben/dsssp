import React from 'react'

import { getCenterLine } from '../../math'
import { useGraph } from '.'

export const GraphGainGrid = () => {
  const {
    height,
    scale: { minGain, maxGain, dbSteps },
    theme: {
      background: {
        grid: { lineColor, lineWidth },
        label: { color: labelColor, fontSize, fontFamily }
      }
    }
  } = useGraph()

  const dBs = Array.from(
    { length: (maxGain - minGain) / dbSteps + 1 },
    (_, i) => {
      return maxGain - i * dbSteps
    }
  )

  const centerY = getCenterLine(minGain, maxGain, height)

  return (
    <>
      <defs>
        <line
          id="centerLine"
          x1="0"
          x2="100%"
          y1={centerY}
          y2={centerY}
          stroke={lineColor}
          strokeWidth={lineWidth.center}
        />
      </defs>
      {dBs.slice(0, -1).map((tick, index) => {
        if (index === 0) return null
        const tickY = `${(index / (dBs.length - 1)) * 100}%`
        const tickLabel = tick > 0 ? `+${tick}` : tick
        return (
          <React.Fragment key={tick}>
            <line
              x1="0"
              x2="100%"
              y1={tickY}
              y2={tickY}
              stroke={lineColor}
              strokeWidth={lineWidth.minor}
            />
            {index !== 0 && index !== dBs.length - 1 && (
              <text
                x={3}
                y={tickY}
                fill={labelColor}
                fontSize={fontSize}
                fontFamily={fontFamily}
                textAnchor="start"
                transform="translate(0 -3)"
              >
                {tickLabel}
              </text>
            )}
          </React.Fragment>
        )
      })}
      <text
        y={12}
        x={5}
        fill={labelColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
      >
        dB
      </text>
    </>
  )
}
