<template>
  <div class="products-container">
    <h1>Productos</h1>
    <div class="categories-grid">
      <div class="category-section" v-for="category in productsWithCategories" :key="category.id">
        <!-- Título de la categoría -->
        <h2 class="category-title">{{ category.name }}</h2>
        <div class="products-grid">
          <!-- Productos dentro de la categoría -->
          <div class="product-card" v-for="product in category.products" :key="product.id">
            <h2 class="product-title">{{ product.name }}</h2>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">${{ product.price }}</p>
            <button
              class="product-button"
              v-if="role === 'customer'"
              @click="order(product.id, product.name, product.description, product.price)"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getCategoriesWithProducts } from '@/helpers/UseCategory'
import { createOrder } from '@/helpers/UseOrders'
import { useRouter } from 'vue-router'

let productsWithCategories = ref([])
let role = ref('')
const router = useRouter()

const order = async (id, name, description, price) => {
  localStorage.setItem('product_id', id)
  localStorage.setItem('product_name', name)
  localStorage.setItem('product_description', description)
  localStorage.setItem('product_price', price)
  let response = await createOrder()
  localStorage.setItem('order_id', response.id)
  router.push({ name: 'createOrders' })
}

onMounted(async () => {
  let response = await getCategoriesWithProducts()
  productsWithCategories.value = response
  console.log(response)
  role.value = localStorage.getItem('role')
})
</script>

<style scoped>
.products-container {
  padding: 1rem;
  background-color: #232033; /* Fondo oscuro */
  color: #ffffff; /* Texto blanco */
}

.products-container h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.categories-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Espaciado entre categorías */
}

.category-section {
  background-color: #1a1a2e; /* Fondo de la categoría */
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra */
}

.category-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #6c63ff; /* Morado para el título de la categoría */
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Diseño responsivo */
  gap: 1rem; /* Espaciado entre las cartas */
}

.product-card {
  background-color: #2e2e4d; /* Fondo de las cartas */
  border: 1px solid #333; /* Borde sutil */
  border-radius: 8px; /* Bordes redondeados */
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para dar profundidad */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.product-description {
  font-size: 0.9rem;
  color: #cccccc;
  margin-bottom: 1rem;
}

.product-price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #6c63ff; /* Color morado para el precio */
  margin-bottom: 1rem;
}

.product-button {
  background-color: #6c63ff; /* Botón morado */
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.product-button:hover {
  background-color: #574bff; /* Color más oscuro al pasar el mouse */
}
</style>
