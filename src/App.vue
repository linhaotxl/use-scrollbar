<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = router.getRoutes()
</script>

<template>
  <div class="app">
    <div>
      <button v-for="route in routes" :key="route.path">
        <router-link :to="route.path">
          {{ route.name }}
        </router-link>
      </button>
    </div>

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  overflow: auto;
  padding: 16px;
  height: 100%;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
}

.content {
  overflow: auto;
  height: 100%;
  flex: 1;
}
</style>
