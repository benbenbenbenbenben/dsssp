import { type CSSProperties } from 'react'

import { type FilterType, type GraphFilter } from '../../types'
import { getIconStyles, getIconSymbol } from '../../utils'
import '../../icons/font.css'

export type FilterIconProps = {
  /**
   * Filter type to display
   * Can be provided directly or via filter prop
   */
  type?: FilterType
  /**
   * Filter gain value to adjust icon appearance
   * Can be provided directly or via filter prop
   */
  gain?: number
  /**
   * Filter object containing type and gain
   * Alternative to providing type and gain separately
   */
  filter?: GraphFilter
  /**
   * Icon size in pixels
   * @default 24
   */
  size?: number
  /**
   * Icon color
   * @default '#FFFFFF'
   */
  color?: string
  /**
   * Additional CSS styles
   */
  style?: CSSProperties
  /**
   * Additional CSS classes
   */
  className?: string
}

export type FilterTypedIconProps = Omit<FilterIconProps, 'type'>

/**
 * Renders filter type icons using custom font symbols.
 * Icons automatically adjust their appearance based on filter gain.
 */
export const FilterIcon = ({
  color = '#FFFFFF',
  size = 24,
  gain,
  type,
  filter,
  className = '',
  ...style
}: FilterIconProps) => {
  const pxSize = `${size}px`
  const iconGain = gain || filter?.gain || 0
  const iconType = type || filter?.type || 'BYPASS'
  const iconStyles = getIconStyles(iconType, iconGain)
  const iconSymbol = getIconSymbol(iconType)

  return (
    <div
      className={className}
      style={{
        color,
        border: 0,
        margin: 0,
        padding: 0,
        width: pxSize,
        height: pxSize,
        lineHeight: 1,
        fontSize: pxSize,
        fontFamily: 'dsssp',
        textAlign: 'center',
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
        ...iconStyles
      }}
      dangerouslySetInnerHTML={{ __html: iconSymbol }}
    />
  )
}

export const BypassIcon = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="BYPASS"
  />
)
export const LowPassIcon = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="LOWPASS2"
  />
)
export const HighPassIcon = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="HIGHPASS2"
  />
)
export const LowShelfIcon = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="LOWSHELF2"
  />
)
export const HighShelfIcon = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="HIGHSHELF2"
  />
)
export const BandPassIcon = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="BANDPASS"
  />
)
export const NotchIcon = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="NOTCH"
  />
)
export const PeakIcon = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="PEAK"
  />
)
export const GainIcon = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="GAIN"
  />
)
