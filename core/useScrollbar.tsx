import { unrefElement } from '@vueuse/core'
import { computed, defineComponent, h, ref, render, watch } from 'vue'

import { useThumb } from './composables'
import { scrollClass, scrollWrapClass } from './constants'
import { createBarVNode } from './vnode'

import type { UseScrollbarOptions } from './composables'
import type { MaybeElementRef } from '@vueuse/core'

export function useScrollbar(
  mount: MaybeElementRef,
  options?: UseScrollbarOptions
) {
  const wrapRef = ref<HTMLElement | null>(null)
  const mountRef = computed(() => unrefElement(mount))
  const { thumbYStyle, thumbXStyle, thumbXRef, thumbYRef } = useThumb(
    wrapRef,
    options
  )

  const ScrollbarTrack = defineComponent({
    name: 'ScrollbarTrack',

    setup() {
      return () => {
        return (
          <>
            {createBarVNode(thumbXRef, thumbXStyle.value, false)}

            {createBarVNode(thumbYRef, thumbYStyle.value, true)}
          </>
        )
      }
    },
  })

  watch(
    mountRef,
    el => {
      if (el && el.parentElement) {
        el.classList.add(scrollWrapClass)
        el.parentElement.classList.add(scrollClass)
        wrapRef.value = el as HTMLElement

        render(h(ScrollbarTrack), el.parentElement)
      }
    },
    { immediate: true }
  )
}
