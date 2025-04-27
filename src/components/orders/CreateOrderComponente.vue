<template>
  <div class="order-container">
    <h1 class="order-title">Orden</h1>
    <div class="order-details">
      <p><span class="label">Nombre:</span> {{ productName }}</p>
      <p><span class="label">Descripción:</span> {{ productDescription }}</p>
      <p><span class="label">Precio:</span> ${{ productPrice }}</p>
      <p><span class="label">Total:</span> ${{ total }}</p>
    </div>

    <div class="order-quantity">
      <label for="amount" class="label">Cantidad:</label>
      <input type="number" id="amount" v-model="amount" min="1" />
    </div>

    <button class="order-button" @click="addItem">Comprar</button><br />
    <button class="cancel-button" @click="cancelOrder">Cancelar</button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import { addItemToOrder, deleteOrder } from '@/helpers/UseOrders'
import { useRouter } from 'vue-router'

let productId = ref('')
let productName = ref('')
let productDescription = ref('')
let productPrice = ref('')
let amount = ref(1)

let total = computed(() => productPrice.value * amount.value)

const router = useRouter()

const addItem = async () => {
  let orderId = localStorage.getItem('order_id')
  let response = await addItemToOrder(orderId, productId.value, amount.value)
  localStorage.removeItem('product_id')
  localStorage.removeItem('product_name')
  localStorage.removeItem('product_description')
  localStorage.removeItem('product_price')
  localStorage.removeItem('order_id')
  router.push({ name: 'dashboard' })
}

const cancelOrder = async () => {
  let response = await deleteOrder(localStorage.getItem('order_id'))
  localStorage.removeItem('product_id')
  localStorage.removeItem('product_name')
  localStorage.removeItem('product_description')
  localStorage.removeItem('product_price')
  localStorage.removeItem('order_id')
  console.log(response)
  router.push({ name: 'products' })
}

onMounted(() => {
  productId.value = localStorage.getItem('product_id')
  productName.value = localStorage.getItem('product_name')
  productDescription.value = localStorage.getItem('product_description')
  productPrice.value = localStorage.getItem('product_price')
})
</script>

<style scoped>
.order-container {
  background-color: #1a1a2e; /* Fondo oscuro */
  color: #ffffff; /* Texto blanco */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra */
  max-width: 400px;
  margin: 2rem auto;
}

.order-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.order-details {
  margin-bottom: 1.5rem;
}

.order-details p {
  font-size: 1rem;
  margin: 0.5rem 0;
}

.label {
  font-weight: bold;
  color: #cccccc; /* Texto gris claro */
}

.order-quantity {
  margin-bottom: 1.5rem;
}

.order-quantity label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type='number'] {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #2e2e4d; /* Fondo del input */
  color: #ffffff;
  font-size: 1rem;
}

input[type='number']::placeholder {
  color: #888; /* Placeholder gris */
}

.order-button {
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

.cancel-button {
  width: 100%;
  padding: 1rem;
  background-color: #cf1515;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.order-button:hover {
  background-color: #574bff; /* Color más oscuro al pasar el mouse */
}
</style>
