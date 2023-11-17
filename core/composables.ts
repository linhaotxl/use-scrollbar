import {
  unrefElement,
  useEventListener,
  useMutationObserver,
  useResizeObserver,
} from '@vueuse/core'
import Big from 'big.js'
import { computed, ref } from 'vue'

import { resolveOffset, type OffsetNumberOrElement } from './constants'

import type { MaybeComputedElementRef } from '@vueuse/core'
import type { CSSProperties } from 'vue'

type ElementOrNil = HTMLElement | null | undefined

export interface UseScrollbarOptions {
  offsetTop?: OffsetNumberOrElement
  offsetLeft?: OffsetNumberOrElement
}

/**
 * 垂直滑块
 */
function useVerticalThumb(
  wrapRef: MaybeComputedElementRef<ElementOrNil>,
  barYRef: MaybeComputedElementRef<ElementOrNil>,
  offsetTop: OffsetNumberOrElement
) {
  const height = ref(0)
  const top = ref(resolveOffset(offsetTop, true))

  /**
   * 计算滑块高度
   * 滚动区域高度 / 可视区域高度 = 滚动条高度(可视区域高度) / 滑块高度
   */
  function executeHeight() {
    const wrapEl = unrefElement(wrapRef)
    const barYEl = unrefElement(barYRef)
    const { scrollHeight: wrapHeight = 1, offsetHeight: wrapViewHeight } =
      wrapEl || {}
    const { clientHeight: viewHeight = 0 } = barYEl || {}

    height.value =
      wrapViewHeight === wrapHeight
        ? 0
        : Math.round(
            new Big(viewHeight).times(viewHeight).div(wrapHeight).toNumber()
          )
  }

  /**
   * 计算滑块偏移
   * 可视区域滑动距离 / 滚动区域高度 = 滑块滑动距离 / 滚动条高度(可视区域高度)
   */
  function executeTop() {
    const wrapEl = unrefElement(wrapRef)
    const barYEl = unrefElement(barYRef)
    const { scrollTop: viewOffset = 0, scrollHeight: wrapHeight = 1 } =
      wrapEl || {}
    const { clientHeight: offsetHeight = 0 } = barYEl || {}

    top.value = Math.min(
      offsetHeight - height.value,
      Math.round(
        new Big(viewOffset)
          .times(offsetHeight)
          .div(wrapHeight)
          .plus(resolveOffset(offsetTop, true))
          .toNumber()
      )
    )
  }

  return { height, top, executeHeight, executeTop }
}

/**
 * 水平滑块
 */
function useHorizontalThumb(
  wrapRef: MaybeComputedElementRef<ElementOrNil>,
  barXRef: MaybeComputedElementRef<ElementOrNil>,
  offsetLeft: OffsetNumberOrElement
) {
  const width = ref(0)
  const left = ref(resolveOffset(offsetLeft, false))

  /**
   * 计算滑块宽度
   */
  function executeWidth() {
    const wrapEl = unrefElement(wrapRef)
    const barXEl = unrefElement(barXRef)
    const { scrollWidth: wrapWidth = 1, offsetWidth: wrapViewWidth = 0 } =
      wrapEl || {}
    const { clientWidth: viewWidth = 0 } = barXEl || {}

    width.value =
      wrapViewWidth === wrapWidth
        ? 0
        : Math.round(
            new Big(viewWidth).times(viewWidth).div(wrapWidth).toNumber()
          )
  }

  /**
   * 计算滑块偏移
   */
  function executeLeft() {
    const wrapEl = unrefElement(wrapRef)
    const barXEl = unrefElement(barXRef)
    const { scrollLeft: viewOffset = 0, scrollWidth: wrapWidth = 1 } =
      wrapEl || {}
    const { clientWidth: offsetWidth = 0 } = barXEl || {}

    left.value = Math.min(
      offsetWidth - width.value,
      Math.round(
        new Big(viewOffset)
          .times(offsetWidth)
          .div(wrapWidth)
          .plus(resolveOffset(offsetLeft, true))
          .toNumber()
      )
    )
  }

  return { width, left, executeWidth, executeLeft }
}

export function useThumb(
  wrap: MaybeComputedElementRef<ElementOrNil>,
  options: UseScrollbarOptions = {}
) {
  const { offsetTop, offsetLeft } = options

  const thumbYRef = ref<HTMLElement | null>(null)
  const thumbXRef = ref<HTMLElement | null>(null)

  const barYRef = ref<HTMLElement | null>(null)
  const barXRef = ref<HTMLElement | null>(null)

  const {
    height: thumbYHeight,
    top: thumbYTop,
    executeTop: executeThumbYTop,
    executeHeight: executeThumbYHeight,
  } = useVerticalThumb(wrap, barYRef, offsetTop)

  const {
    width: thumbXWidth,
    left: thumbXLeft,
    executeLeft: executeThumbXLeft,
    executeWidth: executeThumbXWidth,
  } = useHorizontalThumb(wrap, barXRef, offsetLeft)

  // 记录滑块被点击时的位置
  const down = { x: 0, y: 0 }

  // 记录滑块被拖拽的距离
  const offset = { x: 0, y: 0 }

  // 记录滑块被点击时的偏移位置
  const origin = { top: 0, left: 0 }

  // 滚动时只需计算滑块的位置
  useEventListener(wrap, 'scroll', () => {
    executeThumbYTop()
    executeThumbXLeft()
  })

  // 纵轴滑块按下事件
  useEventListener(thumbYRef, 'mousedown', e => {
    // 记录滑块被点击时的位置
    down.y = e.clientY
    // 记录滑块被点击时的偏移
    origin.top = unrefElement(wrap)?.scrollTop ?? 0
    // 为 window 添加滚动事件
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  })

  // 横轴滑块按下事件
  useEventListener(thumbXRef, 'mousedown', e => {
    // 记录滑块被点击时的位置
    down.x = e.clientX
    // 记录滑块被点击时的偏移
    origin.left = unrefElement(wrap)?.scrollLeft ?? 0
    // 为 window 添加滚动事件
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  })

  function handleMove(evt: MouseEvent) {
    // 计算滑块被推拽的距离
    offset.x = evt.clientX - down.x
    offset.y = evt.clientY - down.y

    const wrapEl = unrefElement(wrap)
    const {
      offsetHeight = 1,
      offsetWidth = 1,
      scrollHeight: wrapHeight = 0,
      scrollWidth: wrapWidth = 0,
    } = wrapEl || {}

    wrapEl!.scrollTop = (offset.y * wrapHeight) / offsetHeight + origin.top
    wrapEl?.scrollTo({
      left: (offset.x * wrapWidth) / offsetWidth + origin.left,
      top: (offset.y * wrapHeight) / offsetHeight + origin.top,
    })
  }

  function handleUp() {
    window.removeEventListener('mousemove', handleMove)
    window.removeEventListener('mouseup', handleUp)
  }

  function resize() {
    executeThumbYHeight()
    executeThumbXWidth()
    executeThumbYTop()
    executeThumbXLeft()
  }

  // 监听 wrap 大小变化，重新计算滑块大小
  useResizeObserver(wrap, resize)

  // 监听 wrap 子元素变化，重新计算滑块大小
  useMutationObserver(wrap, resize, { subtree: true, childList: true })

  const thumbYStyle = computed<CSSProperties>(() => ({
    height: `${thumbYHeight.value}px`,
    transform: `translateY(${thumbYTop.value}px)`,
  }))

  const thumbXStyle = computed<CSSProperties>(() => ({
    width: `${thumbXWidth.value}px`,
    transform: `translateX(${thumbXLeft.value}px)`,
  }))

  return {
    thumbYStyle,
    thumbXStyle,
    barXRef,
    barYRef,
    thumbXRef,
    thumbYRef,
  }
}
