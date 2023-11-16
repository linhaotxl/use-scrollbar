import { unrefElement } from '@vueuse/core'
import { isRef } from 'vue'

import type { MaybeElement, MaybeRef } from '@vueuse/core'

type ScrollType = 'vertical' | 'horizontal'

interface ScrollbarMap {
  sign: 'x' | 'y'
  rectType: 'width' | 'height'
}

export type OffsetNumberOrElement = MaybeRef<number | MaybeElement>

export const getScrollbarType = (vertical: boolean): ScrollType =>
  vertical ? 'vertical' : 'horizontal'

export const scrollClass = 'scroll'
export const scrollWrapClass = 'scroll__wrap'

export const scrollbarMap: Record<ScrollType, ScrollbarMap> = {
  horizontal: {
    sign: 'x',
    rectType: 'width',
  },

  vertical: {
    sign: 'y',
    rectType: 'height',
  },
}

export const resolveOffset = (
  offset: OffsetNumberOrElement | undefined | null,
  vertical: boolean
): number => {
  if (!offset) {
    return 0
  }

  if (typeof offset === 'number') {
    return offset
  }

  if (isRef(offset)) {
    return resolveOffset(offset.value, vertical)
  }

  const type = scrollbarMap[getScrollbarType(vertical)].rectType
  const el = unrefElement(offset)
  return el?.getBoundingClientRect()[type] ?? 0
}
