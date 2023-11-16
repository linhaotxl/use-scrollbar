<template>
  <h2 style="color: #000000">Nested Scroll Bar</h2>
  <scroll-bar style="height: 300px; border: 1px solid #000000">
    <div class="list" style="color: #000000">
      <div v-for="item in 15" :key="item">
        <div>{{ item }}</div>
      </div>
      <scroll-bar style="height: 100px; border: 1px solid #ff9999">
        <div class="inner">
          <div v-for="item in 10" :key="item">{{ item }}</div>
        </div>
      </scroll-bar>
      <div v-for="item in 16" :key="item">
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

//
<style scoped></style>
