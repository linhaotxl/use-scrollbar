<template>
  <h2 style="color: #000000">Comp Scroll Bar Vertical</h2>
  <scroll-bar style="height: 300px">
    <div class="list" style="color: #000000">
      <div v-for="item in 115" :key="item">
        <div>{{ item }}</div>
      </div>
    </div>
  </scroll-bar>

  <h2 style="color: #000000">Comp Scroll Bar Horizontal</h2>
  <scroll-bar style="width: 500px">
    <div class="list" style="display: flex; gap: 8px; color: #000000">
      <div v-for="item in 300" :key="item">
        <div>{{ item }}</div>
      </div>
    </div>
  </scroll-bar>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'

import { ScrollBar } from '~/index'
// import Thumb from '~/Thumb.vue'
defineOptions({ name: 'TestPage' })

// const container = ref<HTMLDivElement | null>(null)

// const { execute } = useScrollbar(container)

// execute()
</script>

<style scoped></style>
