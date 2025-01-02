import { useGraph } from '.'

export const GraphGradient = () => {
  const {
    theme: {
      background: {
        gradient: { start, stop },
        grid: {
          lineColor,
          lineWidth: { border: borderWidth }
        }
      }
    }
  } = useGraph()

  const id = `gBg${Math.random().toString().substring(2, 9)}`
  return (
    <>
      <linearGradient
        id={id}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop
          offset="0%"
          stopColor={start}
        />
        <stop
          offset="100%"
          stopColor={stop}
        />
      </linearGradient>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#${id})`}
      />
      {Boolean(borderWidth) && (
        <rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={`calc(100% - ${borderWidth}px)`}
          height={`calc(100% - ${borderWidth}px)`}
          fill="none"
          stroke={lineColor}
          strokeWidth={borderWidth}
        />
      )}
    </>
  )
}
