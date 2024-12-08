import { useGraph } from './FrequencyGraphProvider'

export const GraphGradient = () => {
  const { theme } = useGraph()
  const {
    background: {
      gradient: { start, end }
    }
  } = theme

  const id = `gBg${Math.random().toString().substring(2, 9)}`
  return (
    <>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={start} />
        <stop offset="100%" stopColor={end} />
      </linearGradient>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
    </>
  )
}
