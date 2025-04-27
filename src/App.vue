<script setup>
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()

watch(
  () => route.name,
  (newRouteName) => {
    if (newRouteName === 'login' || newRouteName === 'register') {
      document.body.classList.add('login-background')
    } else {
      document.body.classList.remove('login-background')
    }
  },
  { immediate: true },
)
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
