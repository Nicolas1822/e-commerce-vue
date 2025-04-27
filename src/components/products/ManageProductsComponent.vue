<template>
  <div class="products-container">
    <h1>Gestionar productos</h1>
    <p>Administra los productos por categoría</p>
    <div class="categories-grid">
      <div class="category-card" v-for="product in productsWithCategory" :key="product.id">
        <h3>{{ product.name }}</h3>
        <span class="category-id">ID: {{ product.id }}</span>
        <div class="product-card" v-for="item in product.products" :key="item.id">
          <p class="product-name">{{ item.name }}</p>
          <p class="product-description">{{ item.description }}</p>
          <p class="product-price">Precio: ${{ item.price }}</p>
          <div class="product-actions">
            <button class="btn modify-btn" @click="showEditProduct(item.id)">Modificar</button>
            <DeleteProductComponent :id="item.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { getCategoriesWithProducts } from '@/helpers/UseCategory'
import { getProductsById } from '@/helpers/UseProducts'
import DeleteProductComponent from './DeleteProductComponent.vue'

const router = useRouter()
let productsWithCategory = ref([])

const showEditProduct = async (id) => {
  let response = await getProductsById(id)
  localStorage.setItem('name_product', response.data.name)
  localStorage.setItem('description_product', response.data.description)
  localStorage.setItem('price_product', response.data.price)
  localStorage.setItem('product_id', response.data.id)
  localStorage.setItem('category_id', response.data.categoryId)
  router.push({ name: 'editProduct' })
}

onMounted(async () => {
  const response = await getCategoriesWithProducts()
  productsWithCategory.value = response
})
</script>

<style scoped>
.products-container {
  background-color: #1a1a2e;
  color: #fff;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

p {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 20px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.category-card {
  background-color: #2e2e4d;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.category-card h3 {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.category-id {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 10px;
}

.product-card {
  background-color: #1a1a2e;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  text-align: left;
}

.product-name {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-description {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 5px;
}

.product-price {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 10px;
}

.product-actions {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.modify-btn {
  background-color: #6c63ff;
  color: #fff;
}

.modify-btn:hover {
  background-color: #5a54d1;
}

.delete-btn {
  background-color: #e04343;
  color: #fff;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
