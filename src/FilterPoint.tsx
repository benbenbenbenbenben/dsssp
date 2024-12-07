/* eslint-disable no-param-reassign */
import React, { useMemo, useRef, useState } from 'react'

import { useGraph } from './FrequencyGraphProvider'
import {
  calcFrequency,
  calcMagnitude,
  getCenterLine,
  limitRange,
  scaleMagnitude,
  stripTail
} from './math'
import { type FilterPointProps } from './types'
import {
  getIconStyles,
  getIconSymbol,
  getMousePosition,
  getZeroGain
} from './utils'

export const FilterPoint = ({
  filter,
  index = 0,
  dragX = true,
  dragY = true,
  active = false, // manual `hovered` state
  showIcon = false,
  label = '',
  labelFontSize,
  labelFontFamily,
  labelColor,
  color,
  radius,
  lineWidth,
  background,
  activeColor,
  zeroColor,
  zeroBackground,
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
    theme: {
      filters: { zeroPoint, colors, defaultColor, point }
    }
  } = useGraph()
  const { minDB, maxDB, height, width, minFreq, maxFreq, logScale } = scale
  const { freq: filterFreq, gain: filterGain, q: filterQ, type } = filter

  const circleRef = useRef<SVGCircleElement | null>(null)
  const [hovered, setHovered] = useState(false)

  const [zeroGain, passFilter] = useMemo(
    () => [getZeroGain(type), type.includes('PASS') || type === 'NOTCH'],
    [type]
  )

  const x = logScale.x(filterFreq)
  const centerY = getCenterLine(minDB, maxDB, height)
  const y = !passFilter
    ? scaleMagnitude(filterGain, minDB, maxDB, height)
    : centerY

  let offset: { x: number; y: number } = { x: 0, y: 0 }
  let selectedElement: SVGCircleElement | null = null

  const zeroValue = filterGain === 0 && !zeroGain

  let cx: number
  let cy: number
  let moveFreq: number
  let moveGain: number

  const dragMove = (e: MouseEvent) => {
    if (!selectedElement) return
    const { x, y } = getMousePosition(e)

    if (dragX) {
      cx = limitRange(x - offset.x, 0, width)
      selectedElement.setAttributeNS(null, 'cx', String(cx))
      moveFreq = limitRange(
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
      selectedElement.setAttributeNS(null, 'cy', String(cy))
      const gain = calcMagnitude(cy, minDB, maxDB, height)
      moveGain = gain < 0.05 && gain > -0.05 ? 0 : gain
    }
    onChange?.({
      index,
      freq: moveFreq,
      ...(!passFilter ? { gain: moveGain } : {})
    })
  }

  const dragEnd = (e: MouseEvent) => {
    dragMove(e)
    const svg = svgRef.current
    if (!selectedElement || !svg) return
    selectedElement.setAttribute(
      'fill-opacity',
      String(activeBackgroundOpacity || point.backgroundOpacity.active)
    )
    svg.removeEventListener('mousemove', dragMove)
    svg.removeEventListener('mouseup', dragEnd)
    svg.removeEventListener('mouseleave', dragEnd)
    selectedElement = null
    onChange?.({
      index,
      freq: moveFreq,
      gain: moveGain,
      ended: true
    })
    onDrag?.(false)
  }

  const dragStart = (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    const svg = svgRef.current
    if (!svg) return
    selectedElement = e.currentTarget
    offset = getMousePosition(e as unknown as MouseEvent)
    offset.x -= parseFloat(selectedElement.getAttributeNS(null, 'cx') || '0')
    offset.y -= parseFloat(selectedElement.getAttributeNS(null, 'cy') || '0')
    selectedElement.setAttribute(
      'fill-opacity',
      String(dragBackgroundOpacity || point.backgroundOpacity.drag)
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
    onLeave?.()
  }

  const scrollQ = (e: WheelEvent) => {
    e.preventDefault()
    let newQ = filterQ
    newQ += e.deltaY > 0 ? 0.1 : -0.1
    newQ = stripTail(limitRange(newQ, 0.1, 10))
    onChange?.({ index, q: newQ, ended: true })
  }

  if (['BYPASS', 'UNKNOWN'].includes(type)) return null

  circleRef.current?.addEventListener('wheel', scrollQ, { passive: false })

  const strokeWidth = lineWidth || point.lineWidth

  const normalColor = color || colors?.[index]?.point || defaultColor
  const strokeColor = zeroValue
    ? zeroColor || zeroPoint.color
    : active || hovered
      ? activeColor || colors?.[index]?.active || normalColor // fallback to regular point color if active color is not defined
      : normalColor

  const fillColor = zeroValue
    ? zeroBackground || zeroPoint.background
    : background || colors?.[index]?.background || defaultColor

  const fillOpacity =
    active || hovered
      ? activeBackgroundOpacity || point.backgroundOpacity.active
      : backgroundOpacity || point.backgroundOpacity.normal

  if (label || showIcon) {
    labelColor ||= point.label.color
    labelFontSize ||= point.label.fontSize
    labelFontFamily ||= point.label.fontFamily
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
        <g transform={`translate(${x}, ${y})`}>
          <text
            x={0}
            y={0}
            textAnchor="middle"
            dominantBaseline="central"
            fill={labelColor}
            fontSize={labelFontSize}
            fontFamily={labelFontFamily}
            style={{ pointerEvents: 'none' }}
            dangerouslySetInnerHTML={{ __html: label }}
            {...labelStyle}
          />
        </g>
      )}
    </>
  )
}
