<template>
  <h2 style="color: #000000">Comp Scroll Bar Vertical</h2>
  <div class="wrap" style="height: 300px">
    <div ref="verticalRef" class="view" style="color: #000000">
      <div v-for="item in 115" :key="item">
        <div>{{ item }}</div>
      </div>
    </div>
  </div>

  <br />

  <div class="wrap" style="width: 300px">
    <div
      ref="horizontalRef"
      class="view"
      style="display: flex; gap: 4px; color: #000000"
    >
      <div v-for="item in 115" :key="item" style="border: 1px solid">
        <div>{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { useScrollbar } from '~/index'

defineOptions({ name: 'TestPage' })

const verticalRef = ref<HTMLDivElement | null>(null)
const horizontalRef = ref<HTMLDivElement | null>(null)

useScrollbar(verticalRef)
useScrollbar(horizontalRef)
</script>

<style scoped></style>
