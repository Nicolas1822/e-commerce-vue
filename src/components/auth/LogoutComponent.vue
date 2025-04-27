<template>
  <button @click="logOut">Cerrar Sesion</button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logOut = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('role')
  router.push({ name: 'login' })
}
</script>

<style scoped>
button {
  width: 100%;
  padding: 0.8rem;
  background-color: #6c63ff; /* Botón morado */
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #574bff; /* Color más oscuro al pasar el mouse */
}
</style>
