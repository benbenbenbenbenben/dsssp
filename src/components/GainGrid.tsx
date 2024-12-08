import React from 'react'

import { getCenterLine } from '../math'
import { useGraph } from './FrequencyGraphProvider'

export const GainGrid = () => {
  const {
    scale: { minDB, maxDB, dbStep, height },
    theme: {
      background: {
        grid: { tickColor, lineColor, lineWidth }
      }
    }
  } = useGraph()

  const dBs = Array.from({ length: (maxDB - minDB) / dbStep + 1 }, (_, i) => {
    return maxDB - i * dbStep
  })

  const centerY = getCenterLine(minDB, maxDB, height)

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
      {dBs.map((tick, index) => {
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
                fill={tickColor}
                fontSize="10"
                textAnchor="start"
                transform="translate(0 -3)"
              >
                {tickLabel}
              </text>
            )}
            <text y={12} x={5} fill={tickColor} fontSize="10">
              dB
            </text>
          </React.Fragment>
        )
      })}
    </>
  )
}
