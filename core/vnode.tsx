import { getScrollbarType, scrollbarMap } from './constants'

import type { CSSProperties, Ref } from 'vue'

export function createBarVNode(
  ref: Ref,
  style: CSSProperties,
  vertical: boolean
) {
  const sign = scrollbarMap[getScrollbarType(vertical)].sign

  const barClass = `scroll__bar-${sign}`
  const thumbClass = `scroll__thumb-${sign}`

  return (
    <div class={barClass}>
      <div ref={ref} class={thumbClass} style={style}></div>
    </div>
  )
}
