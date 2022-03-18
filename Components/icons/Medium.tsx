import React from 'react'
import cn from 'classnames'
import type { ISocialIcons } from '@Components/icons'
import s from './icon.module.css'

const Medium = ({ size, variant, hasBg }: ISocialIcons) => {
  let fill
  if (variant === 'white') {
    fill = '#fff'
  } else {
    fill = '#000'
  }
  return (
    <div className={cn(hasBg && s.iconBg)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 24 24"
        className={size && s[size]}
      >
        <path
          fill={fill}
          d="M12 0c-6.626 0-12 5.372-12 12 0 6.627 5.374 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm6.974 17.557v-.235l-1.092-1.072c-.096-.073-.144-.194-.124-.313v-7.874c-.02-.119.028-.24.124-.313l1.118-1.072v-.235h-3.869l-2.758 6.88-3.138-6.88h-4.059v.235l1.308 1.575c.128.115.194.285.176.457v6.188c.038.223-.032.451-.189.614l-1.471 1.784v.235h4.17v-.235l-1.471-1.784c-.158-.163-.233-.389-.202-.614v-5.352l3.66 7.985h.425l3.143-7.985v6.365c0 .17 0 .202-.111.313l-1.13 1.098v.235h5.49z"
        />
      </svg>
    </div>
  )
}
export default Medium
