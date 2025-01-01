import React, { useEffect, useRef, useState, type CSSProperties } from 'react'

import { calcFrequency, calcMagnitude, fastFloor } from '../../math'
import { getMousePosition } from '../../utils'
import { useGraph } from '../..'

export type MouseTrackerProps = {
  lineWidth?: number
  lineColor?: CSSProperties['color']
  backgroundColor?: CSSProperties['color']
  gainPrecision?: number
}

export const MouseTracker = ({
  lineWidth,
  lineColor,
  backgroundColor,
  gainPrecision = 1
}: MouseTrackerProps) => {
  const {
    width,
    height,
    scale,
    svgRef,
    theme: {
      background: {
        tracker,
        label: { fontSize, fontFamily }
      }
    }
  } = useGraph()

  const { minGain, maxGain, minFreq, maxFreq } = scale

  const strokeDasharray = '1,3'
  const color = lineColor || tracker.lineColor
  const strokeWidth = lineWidth || tracker.lineWidth
  const fillColor = backgroundColor || tracker.backgroundColor

  const [freqWidth, setFreqWidth] = useState(0)
  const [gainWidth, setGainWidth] = useState(0)
  const [freqLabel, setFreqLabel] = useState(0)
  const [gainLabel, setGainLabel] = useState(0)
  const [trackMouse, setTrackMouse] = useState(false)
  const [mouse, setMouse] = useState({ x: -50, y: -50 })

  const freqLabelRef = useRef<SVGTextElement | null>(null)
  const gainLabelRef = useRef<SVGTextElement | null>(null)

  const mouseMove = (e: MouseEvent) => {
    const { x, y } = getMousePosition(e)
    setMouse({ x, y })

    const newGain = calcMagnitude(y, minGain, maxGain, height).toFixed(
      gainPrecision
    )
    if (newGain !== String(gainLabel)) {
      setGainLabel(Number(newGain))
    }

    const newFreq = fastFloor(calcFrequency(x, width, minFreq, maxFreq))
    if (newFreq !== freqLabel) {
      setFreqLabel(newFreq)
    }
  }

  useEffect(() => {
    if (!freqLabelRef.current) return
    const w = fastFloor(freqLabelRef.current.getBBox().width)
    if (w !== freqWidth) {
      setFreqWidth(w)
    }
  }, [freqLabel])

  useEffect(() => {
    if (!gainLabelRef.current) return
    const w = fastFloor(gainLabelRef.current.getBBox().width)
    if (w !== gainWidth) {
      setGainWidth(w)
    }
  }, [gainLabel])

  useEffect(() => {
    if (!svgRef.current) return
    svgRef.current.addEventListener('mouseenter', () => setTrackMouse(true))
    svgRef.current.addEventListener('mouseleave', () => setTrackMouse(false))
    svgRef.current?.addEventListener('mousemove', mouseMove)
  }, [svgRef])

  useEffect(() => {
    setTrackMouse(true)
  }, [])

  if (!trackMouse) return null

  const fontSizePadding = fontSize + 3

  return (
    <React.Fragment>
      <rect
        width={freqWidth + 6}
        height={fontSizePadding}
        fill={backgroundColor}
        stroke={color}
        x={mouse.x - freqWidth / 2 - 3}
        y={height - fontSizePadding - 1}
      ></rect>
      <text
        ref={freqLabelRef}
        x={mouse.x - freqWidth / 2}
        y={height - 4}
        fill={color}
        fontSize={fontSize}
        fontFamily={fontFamily}
      >
        {freqLabel}
      </text>

      <rect
        width={gainWidth + 6}
        height={fontSizePadding}
        fill={fillColor}
        stroke={color}
        x={0.5}
        y={mouse.y - 7}
      ></rect>
      <text
        ref={gainLabelRef}
        x={3}
        y={mouse.y + 3}
        fill={color}
        fontSize={fontSize}
        fontFamily={fontFamily}
      >
        {gainLabel > 0 ? `+${gainLabel}` : gainLabel}
      </text>

      <line
        x1={gainWidth + 7}
        x2={width}
        y1={mouse.y}
        y2={mouse.y}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeLinecap="round"
      />

      <line
        x1={mouse.x}
        x2={mouse.x}
        y1={0}
        y2={height - 14}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeLinecap="round"
      />
    </React.Fragment>
  )
}
