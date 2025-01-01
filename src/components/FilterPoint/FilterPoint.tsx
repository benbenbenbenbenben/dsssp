/* eslint-disable no-param-reassign */
import type React from 'react'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

import {
  calcFrequency,
  calcMagnitude,
  getCenterLine,
  limitRange,
  scaleMagnitude,
  stripTail
} from '../../math'
import { type GraphFilter } from '../../types'
import {
  getIconStyles,
  getIconSymbol,
  getMousePosition,
  getZeroGain
} from '../../utils'
import { useGraph } from '../..'

import '../../icons/font.css'

export type FilterChangeEvent = GraphFilter & {
  index: number
  ended?: boolean
}

export type FilterPointProps = {
  filter: GraphFilter
  index?: number
  dragX?: boolean
  dragY?: boolean
  wheelQ?: boolean
  radius?: number
  active?: boolean
  lineWidth?: number

  showIcon?: boolean

  label?: string
  labelFontFamily?: string
  labelFontSize?: number
  labelColor?: CSSProperties['color']

  color?: CSSProperties['color']
  zeroColor?: CSSProperties['color']
  dragColor?: CSSProperties['color']
  activeColor?: CSSProperties['color']

  background?: CSSProperties['color']
  zeroBackground?: CSSProperties['color']
  dragBackground?: CSSProperties['color']
  activeBackground?: CSSProperties['color']

  backgroundOpacity?: CSSProperties['opacity']
  dragBackgroundOpacity?: CSSProperties['opacity']
  activeBackgroundOpacity?: CSSProperties['opacity']

  onChange?: (filterEvent: FilterChangeEvent) => void
  onEnter?: (filterEvent: FilterChangeEvent) => void
  onLeave?: (filterEvent: FilterChangeEvent) => void
  onDrag?: (dragState: boolean) => void
}

/**
 * Uses `defaultColor` from the theme as a fallback when filter colors are not specified.
 */
export const FilterPoint = ({
  filter,
  index = -1,
  dragX = true,
  dragY = true,
  wheelQ = true,
  active = false, // manual `hovered` state
  showIcon = false,
  label = '',
  labelFontSize,
  labelFontFamily,
  labelColor,
  radius,
  lineWidth,

  color,
  zeroColor,
  dragColor,
  activeColor,

  background,
  zeroBackground,
  dragBackground,
  activeBackground,

  backgroundOpacity,
  dragBackgroundOpacity,
  activeBackgroundOpacity,
  onChange,
  onEnter,
  onLeave,
  onDrag
}: FilterPointProps) => {
  const {
    svgRef,
    scale,
    logScale,
    height,
    width,
    theme: {
      filters: { zeroPoint, colors, defaultColor, point }
    }
  } = useGraph()
  const { minGain, maxGain, minFreq, maxFreq } = scale
  const { freq: filterFreq, gain: filterGain, q: filterQ, type } = filter

  const circleRef = useRef<SVGCircleElement | null>(null)
  const labelRef = useRef<SVGTextElement | null>(null)

  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)

  const [zeroGain, passFilter] = useMemo(
    () => [getZeroGain(type), type.includes('PASS') || type === 'NOTCH'],
    [type]
  )

  const x = logScale.x(filterFreq)
  const centerY = getCenterLine(minGain, maxGain, height)
  const y = !passFilter
    ? scaleMagnitude(filterGain, minGain, maxGain, height)
    : centerY

  let offset: { x: number; y: number } = { x: 0, y: 0 }

  let cx: number
  let cy: number
  const moveFreq = useRef(filterFreq)
  const moveGain = useRef(filterGain)

  const zeroValue = moveGain.current === 0 && !zeroGain

  const dragMove = (e: MouseEvent) => {
    if (!circleRef.current) return
    const { x, y } = getMousePosition(e)

    if (dragX) {
      cx = limitRange(x - offset.x, 0, width)
      circleRef.current.setAttributeNS(null, 'cx', String(cx))
      labelRef.current?.setAttributeNS(null, 'x', String(cx))
      moveFreq.current = limitRange(
        calcFrequency(cx, width, minFreq, maxFreq),
        minFreq,
        maxFreq
      )
    }

    if (dragY) {
      if (zeroGain) {
        cy = centerY
      } else {
        cy = limitRange(y - offset.y, 0, height)
      }
      circleRef.current.setAttributeNS(null, 'cy', String(cy))
      labelRef.current?.setAttributeNS(null, 'y', String(cy))
      const gain = calcMagnitude(cy, minGain, maxGain, height)
      // TODO: move this rounding to props
      moveGain.current = gain < 0.05 && gain > -0.05 ? 0 : gain
    }
    onChange?.({
      index,
      ...filter,
      freq: moveFreq.current,
      ...(!passFilter ? { gain: moveGain.current } : {})
    })
  }

  const dragEnd = (e: MouseEvent) => {
    dragMove(e)
    const svg = svgRef.current
    const circleEl = circleRef.current

    if (!svg || !circleEl) return
    circleEl.setAttribute(
      'fill-opacity',
      String(activeBackgroundOpacity || point?.backgroundOpacity?.active)
    )
    svg.removeEventListener('mousemove', dragMove)
    svg.removeEventListener('mouseup', dragEnd)
    svg.removeEventListener('mouseleave', dragEnd)
    setDragging(false)
    onChange?.({
      index,
      ...filter,
      freq: moveFreq.current,
      gain: moveGain.current,
      ended: true
    })
    onDrag?.(false)
  }

  const dragStart = (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    const svg = svgRef.current
    if (!svg) return
    // selectedElement = e.currentTarget
    setDragging(true)
    const circleEl = circleRef.current
    // console.log('selectedElement', selectedElement, 'ref', circleRef.current)
    offset = getMousePosition(e as unknown as MouseEvent)
    offset.x -= parseFloat(circleEl?.getAttributeNS(null, 'cx') || '0')
    offset.y -= parseFloat(circleEl?.getAttributeNS(null, 'cy') || '0')
    circleEl?.setAttribute(
      'fill-opacity',
      String(dragBackgroundOpacity || point?.backgroundOpacity?.drag)
    )
    svg.addEventListener('mousemove', dragMove)
    svg.addEventListener('mouseup', dragEnd)
    svg.addEventListener('mouseleave', dragEnd)
    onDrag?.(true)
  }

  const handleMouseEnter = () => {
    setHovered(true)
    onEnter?.({ ...filter, index })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    onLeave?.({ ...filter, index })
  }

  const scrollQ = (e: WheelEvent) => {
    e.preventDefault()
    let newQ = filterQ
    newQ += e.deltaY > 0 ? 0.1 : -0.1
    newQ = stripTail(limitRange(newQ, 0.1, 10))
    onChange?.({ index, ...filter, q: newQ, ended: true })
  }

  useEffect(() => {
    const circleEl = circleRef.current
    if (wheelQ) circleEl?.addEventListener('wheel', scrollQ)
    return () => circleEl?.removeEventListener('wheel', scrollQ)
  }, [wheelQ])

  if (type === 'BYPASS') return null

  const strokeWidth = lineWidth || point.lineWidth

  const pointColor = color || colors?.[index]?.point || defaultColor
  const bgColor = background || colors?.[index]?.background || pointColor

  const strokeColor = zeroValue
    ? zeroColor || zeroPoint?.color
    : dragging
      ? dragColor || colors?.[index]?.drag || pointColor
      : active || hovered
        ? activeColor || colors?.[index]?.active || pointColor // fallback to regular point color if active color is not defined
        : pointColor

  const fillColor = zeroValue
    ? zeroBackground || zeroPoint?.background
    : dragging
      ? dragBackground || colors?.[index]?.drag || bgColor
      : active || hovered
        ? activeBackground || colors?.[index]?.activeBackground || bgColor
        : bgColor

  const fillOpacity =
    active || hovered
      ? (activeBackgroundOpacity ?? point?.backgroundOpacity?.active)
      : (backgroundOpacity ?? point?.backgroundOpacity?.normal)

  if (label || showIcon) {
    labelColor ||= point?.label?.color
    labelFontSize ||= point?.label?.fontSize
    labelFontFamily ||= point?.label?.fontFamily
    if (labelColor === 'inherit') labelColor = strokeColor
  }

  let labelStyle = {}
  if (showIcon) {
    label = getIconSymbol(type)
    labelFontFamily = 'dsssp'
    labelStyle = getIconStyles(type, filterGain)
  }

  return (
    <>
      <circle
        ref={circleRef}
        cx={x}
        cy={y}
        r={radius || point.radius}
        fill={fillColor}
        fillOpacity={fillOpacity}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        style={{ cursor: 'pointer' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={dragStart}
      />
      {Boolean(label) && (
        <text
          ref={labelRef}
          x={x}
          y={y}
          textAnchor="middle"
          alignmentBaseline="central"
          fill={labelColor}
          fontSize={labelFontSize}
          fontFamily={labelFontFamily}
          style={{ pointerEvents: 'none', ...labelStyle }}
          dangerouslySetInnerHTML={{ __html: label }}
        />
      )}
    </>
  )
}
