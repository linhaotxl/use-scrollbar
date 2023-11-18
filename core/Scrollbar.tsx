import { defineComponent, ref } from 'vue'

import { useThumb } from './composables'
import styleModules from './scrollbar.module.less'
import { createBarVNode } from './vnode'

export const ScrollBar = defineComponent({
  name: 'ScrollBar',

  setup(_, { slots }) {
    const wrapRef = ref<HTMLDivElement | null>(null)
    const {
      thumbYStyle,
      thumbXStyle,
      thumbXRef,
      thumbYRef,
      barYRef,
      barXRef,
      barXVisible,
      barYVisible,
      toggleBarVisible,
    } = useThumb(wrapRef)

    const mountRef = ref<HTMLDivElement | null>(null)
    useEventListener(mountRef, 'mouseenter', toggleBarVisible)
    useEventListener(mountRef, 'mouseleave', toggleBarVisible)

    return () => {
      return (
        <div ref={mountRef} class={styleModules.scrollbar}>
          <div ref={wrapRef} class={styleModules.wrap}>
            {slots.default?.()}
          </div>

          {createBarVNode(
            barXRef,
            thumbXRef,
            thumbXStyle.value,
            false,
            barXVisible
          )}

          {createBarVNode(
            barYRef,
            thumbYRef,
            thumbYStyle.value,
            true,
            barYVisible
          )}
        </div>
      )
    }
  },
})
