import { getScrollbarType, scrollbarMap } from './constants'

import type { CSSProperties, Ref } from 'vue'

export function createBarVNode(
  barRef: Ref<HTMLElement | null>,
  thumbRef: Ref<HTMLElement | null>,
  style: CSSProperties,
  vertical: boolean
) {
  const sign = scrollbarMap[getScrollbarType(vertical)].sign

  const barClass = `scroll__bar-${sign}`
  const thumbClass = `scroll__thumb-${sign}`

  return (
    <div ref={barRef} class={barClass}>
      <div ref={thumbRef} class={thumbClass} style={style}></div>
    </div>
  )
}
