import { getScrollbarType, scrollbarMap } from './constants'
import styleModule from './scrollbar.module.less'

import type { CSSProperties, Ref } from 'vue'

export function createBarVNode(
  barRef: Ref<HTMLElement | null>,
  thumbRef: Ref<HTMLElement | null>,
  style: CSSProperties,
  vertical: boolean
) {
  const sign = scrollbarMap[getScrollbarType(vertical)].sign.toUpperCase()

  return (
    <div ref={barRef} class={[styleModule.bar, styleModule[`bar${sign}`]]}>
      <div
        ref={thumbRef}
        class={[styleModule.thumb, styleModule[`thumb${sign}`]]}
        style={style}
      ></div>
    </div>
  )
}
