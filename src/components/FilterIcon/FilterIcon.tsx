import { type CSSProperties } from 'react'
import { type FilterType, type GraphFilter } from '../../types'
import { getIconStyles, getIconSymbol } from '../../utils'
import '../../icons/font.css'

export type FilterIconProps = {
  type?: FilterType
  gain?: number
  filter?: GraphFilter
  size?: number
  color?: string
  style?: CSSProperties
  className?: string
}

export type FilterTypedIconProps = Omit<FilterIconProps, 'type'>

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

export const FilterIconBypass = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="BYPASS"
  />
)
export const FilterIconLowPass = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="LOWPASS1"
  />
)
export const FilterIconHighPass = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="HIGHPASS1"
  />
)
export const FilterIconLowShelf = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="LOWSHELF1"
  />
)
export const FilterIconHighShelf = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="HIGHSHELF1"
  />
)
export const FilterIconBandPass = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="BANDPASS"
  />
)
export const FilterIconNotch = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="NOTCH"
  />
)
export const FilterIconPeak = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="PEAK"
  />
)
export const FilterIconGain = (props: FilterTypedIconProps) => (
  <FilterIcon
    {...props}
    type="GAIN"
  />
)
