import { unrefElement } from '@vueuse/core'
import { computed, defineComponent, h, ref, render, watch } from 'vue'

import { useThumb } from './composables'
import styleModules from './scrollbar.module.less'
import { createBarVNode } from './vnode'

import type { UseScrollbarOptions } from './composables'
import type { MaybeElementRef } from '@vueuse/core'

export function useScrollbar(
  mount: MaybeElementRef,
  options?: UseScrollbarOptions
) {
  const wrapRef = ref<HTMLElement | null>(null)
  const mountRef = computed(() => unrefElement(mount))
  const {
    thumbYStyle,
    thumbXStyle,
    thumbXRef,
    thumbYRef,
    barXRef,
    barYRef,
    barXVisible,
    barYVisible,
    toggleBarVisible,
  } = useThumb(wrapRef, options)

  const ScrollbarTrack = defineComponent({
    name: 'ScrollbarTrack',

    setup() {
      return () => {
        return (
          <>
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
          </>
        )
      }
    },
  })

  watch(
    mountRef,
    el => {
      if (el && el.parentElement) {
        el.classList.add(styleModules.wrap)
        el.parentElement.classList.add(styleModules.scrollbar)
        useEventListener(el.parentElement, 'mouseenter', toggleBarVisible)
        useEventListener(el.parentElement, 'mouseleave', toggleBarVisible)
        wrapRef.value = el as HTMLElement

        render(h(ScrollbarTrack), el.parentElement)
      }
    },
    { immediate: true }
  )
}
