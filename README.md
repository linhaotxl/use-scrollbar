## 安装

```bash
pnpm add @linh-txl/use-scrollbar
```

## 使用

```ts
// 引入样式
import '@linh-txl/use-scrollbar/index.css'
```

### 组件方式

```html
<script lang="ts" setup>
import { ScrollBar } from '@linh-txl/use-scrollbar'
</script>

<template>
  <!-- 垂直 scroll-bar 必须指定 height-->
  <h2>Comp Scroll Bar Vertical</h2>
  <scroll-bar style="height: 300px">
    <div class="list">
      <div v-for="item in 115" :key="item">{{ item }}</div>
    </div>
  </scroll-bar>

  <!-- 水平 scroll-bar 必须指定 width-->
  <h2>Comp Scroll Bar Horizontal</h2>
  <scroll-bar style="width: 500px">
    <div class="list" style="display: flex; gap: 8px;">
      <div v-for="item in 300" :key="item">{{ item }}</div>
    </div>
  </scroll-bar>
</template>
```



### 调用方法

```html
<script>
import { useScrollbar } from '@linh-txl/use-scrollbar'

const verticalRef = ref<HTMLDivElement | null>(null)
const horizontalRef = ref<HTMLDivElement | null>(null)

useScrollbar(verticalRef)
useScrollbar(horizontalRef)
</script>

<template>
  <h2>Func Scroll Bar Vertical</h2>
  <div class="wrap" style="height: 300px">
    <div ref="verticalRef" class="view">
      <div v-for="item in 115" :key="item">{{ item }}</div>
    </div>
  </div>

  <h2>Func Scroll Bar Horizontal</h2>
  <div class="wrap" style="width: 300px">
    <div ref="horizontalRef" class="view" style="display: flex; gap: 4px;">
      <div v-for="item in 115" :key="item">{{ item }}</div>
    </div>
  </div>
</template>
```


