<template>
  <div class="main-layout">
    <NavBarComponent />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import NavBarComponent from '@/components/utils/NavBarComponent.vue'
</script>

<style scoped>
.main-layout {
  display: flex;
  height: auto;
}

.main-layout > * {
  flex-shrink: 0;
}

.content {
  flex: 1;
  overflow-y: auto;
  background-color: #232033;
  color: #ffffff;
  padding: 1rem;
}
</style>
