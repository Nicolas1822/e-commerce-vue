<template>
  <div class="navbar-container">
    <nav>
      <div class="user-info">
        <p class="user-name">{{ email }}</p>
        <p class="user-role">{{ role }}</p>
      </div>
      <div class="navbar-section">
        <ul>
          <li>
            <router-link to="/dashboard" @click="getProducts">Inicio</router-link>
          </li>
        </ul>
      </div>
      <!-- Productos -->
      <div class="navbar-section">
        <h2 @click="toggleSection('productos')" :class="{ active: isSectionOpen('productos') }">
          Productos
        </h2>
        <ul v-if="isSectionOpen('productos')">
          <li>
            <router-link to="/products" @click="getProducts">Productos</router-link>
          </li>
          <div v-if="role === 'admin'">
            <li>
              <router-link to="/products/create">Crear Producto</router-link>
            </li>
            <li>
              <router-link to="/products/manage">Gestionar Producto</router-link>
            </li>
          </div>
        </ul>
      </div>

      <!-- Categorías -->
      <div class="navbar-section" v-if="role === 'admin'">
        <h2 @click="toggleSection('categorias')" :class="{ active: isSectionOpen('categorias') }">
          Categorías
        </h2>
        <ul v-if="isSectionOpen('categorias')">
          <div>
            <li>
              <router-link to="/categories/">Gestionar Categorías</router-link>
            </li>
          </div>
        </ul>
      </div>

      <!-- Órdenes -->
      <!-- <div class="navbar-section">
        <h2 @click="toggleSection('ordenes')" :class="{ active: isSectionOpen('ordenes') }">
          Órdenes
        </h2>
        <ul v-if="isSectionOpen('ordenes')">
          <li>
            <router-link to="/ordenes">Mis órdenes de compra</router-link>
          </li>
          <li>
            <router-link to="/ordenes/agregar-producto">Agregar producto</router-link>
          </li>
          <li>
            <router-link to="/ordenes/crear">Crear orden</router-link>
          </li>
          <div v-if="role === 'admin'">
            <li>
              <router-link to="/ordenes/crear-categoria">Crear Categoría</router-link>
            </li>
            <li>
              <router-link to="/ordenes/editar-categoria">Editar Categoría</router-link>
            </li>
            <li>
              <router-link to="/ordenes/eliminar-categoria">Eliminar Categoría</router-link>
            </li>
          </div>
        </ul>
      </div> -->
    </nav>
    <!-- Logout -->
    <LogoutComponent />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LogoutComponent from '@/components/auth/LogoutComponent.vue'

const email = ref('')
email.value = localStorage.getItem('email')

let role = localStorage.getItem('role')

// Estado para controlar qué secciones están abiertas
const openSections = ref([])

// Función para alternar el estado de una sección
const toggleSection = (section) => {
  if (openSections.value.includes(section)) {
    openSections.value = openSections.value.filter((s) => s !== section)
  } else {
    openSections.value.push(section)
  }
}

// Función para verificar si una sección está abierta
const isSectionOpen = (section) => {
  return openSections.value.includes(section)
}

const getProducts = () => {}
</script>

<style scoped>
.navbar-container {
  width: 250px;
  height: 100vh;
  background-color: #09090b; /* Fondo oscuro */
  color: #ffffff; /* Texto blanco */
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
}

.user-info {
  margin-bottom: 1rem;
}

.user-name {
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0px;
}

.user-role {
  font-size: 0.9rem;
  color: #cccccc; /* Texto gris claro */
  margin-top: 0px;
  margin-bottom: 4rem;
}

.navbar-section {
  margin-bottom: 2rem;
}

.navbar-section h2 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #cccccc;
  cursor: pointer;
  transition: color 0.3s ease;
}

.navbar-section h2:hover {
  color: #ffffff;
}

.navbar-section h2.active {
  color: #6c63ff; /* Morado para la sección activa */
}

.navbar-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar-section li {
  margin-bottom: 0.5rem;
}

.navbar-section li a {
  text-decoration: none;
  color: #ffffff;
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.navbar-section li a:hover {
  background-color: #1a1a2e; /* Fondo más claro al pasar el mouse */
}

.navbar-section li a.router-link-active {
  background-color: #6c63ff; /* Fondo morado para la ruta activa */
  color: #ffffff;
}
</style>
