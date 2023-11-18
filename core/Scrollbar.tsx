import { defineComponent, ref } from 'vue'

import { useThumb } from './composables'
import styleModules from './scrollbar.module.less'
import { createBarVNode } from './vnode'

export const ScrollBar = defineComponent({
  name: 'ScrollBar',

  setup(_, { slots }) {
    const wrapRef = ref<HTMLDivElement | null>(null)
    const { thumbYStyle, thumbXStyle, thumbXRef, thumbYRef, barYRef, barXRef } =
      useThumb(wrapRef)

    return () => {
      return (
        <div class={styleModules.scrollbar}>
          <div ref={wrapRef} class={styleModules.wrap}>
            {slots.default?.()}
          </div>

          {createBarVNode(barXRef, thumbXRef, thumbXStyle.value, false)}

          {createBarVNode(barYRef, thumbYRef, thumbYStyle.value, true)}
        </div>
      )
    }
  },
})
