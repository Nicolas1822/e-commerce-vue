<template>
  <div class="orders-container">
    <h1 class="orders-title">Mis Órdenes</h1>
    <div class="orders-grid">
      <div class="order-card" v-for="order in ordersCustomer" :key="order.id">
        <h2 class="order-id">Orden #{{ order.id }}</h2>
        <div class="order-items">
          <div class="order-item" v-for="items in order.items" :key="items.id">
            <p class="item-name"><span class="label">Producto:</span> {{ items.name }}</p>
            <p class="item-description">
              <span class="label">Descripción:</span> {{ items.description }}
            </p>
            <p class="item-price"><span class="label">Precio:</span> ${{ items.price }}</p>
            <p class="item-amount">
              <span class="label">Cantidad:</span> {{ items.OrderProduct.amount }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { myOrders } from '@/helpers/UseOrders'

let ordersCustomer = ref([])

onMounted(async () => {
  const orders = await myOrders()
  ordersCustomer.value = orders
  console.log(orders)
})
</script>

<style scoped>
.orders-container {
  padding: 1rem;
  background-color: #232033; /* Fondo oscuro */
  color: #ffffff; /* Texto blanco */
}

.orders-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Diseño responsivo */
  gap: 1rem; /* Espaciado entre las cartas */
}

.order-card {
  background-color: #1a1a2e; /* Fondo de las cartas */
  border: 1px solid #333; /* Borde sutil */
  border-radius: 8px; /* Bordes redondeados */
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para dar profundidad */
}

.order-id {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #6c63ff; /* Morado para destacar el ID */
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Espaciado entre los productos */
}

.order-item {
  background-color: #2e2e4d; /* Fondo para cada producto */
  padding: 0.8rem;
  border-radius: 4px;
}

.item-name,
.item-description,
.item-price,
.item-amount {
  font-size: 0.9rem;
  margin: 0.2rem 0;
}

.label {
  font-weight: bold;
  color: #cccccc; /* Texto gris claro */
}
</style>
