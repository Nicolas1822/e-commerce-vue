<template>
  <div class="categories-container">
    <h1>Categorías</h1>
    <p>Administra las categorías de productos</p>
    <div class="categories-grid">
      <div class="category-card" v-for="category in categories" :key="category.id">
        <div class="category-header">
          <h2>{{ category.name }}</h2>
          <span class="category-id">ID: {{ category.id }}</span>
        </div>
        <div class="category-actions">
          <button class="btn modify-btn" @click="getByIdCategory(category.id)">Modificar</button>
          <DeleteCategoriesComponent :category_id="category.id" />
        </div>
      </div>
    </div>
    <button class="btn new-category-btn" @click="addCategory">Nueva Categoría</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getCategoriesWithProducts, getCategoryById } from '@/helpers/UseCategory'
import { useRouter } from 'vue-router'
import DeleteCategoriesComponent from './DeleteCategoriesComponent.vue'

let categories = ref([])

let router = useRouter()

const getByIdCategory = async (id) => {
  let categoryName = await getCategoryById(id)
  localStorage.setItem('name_category', categoryName.name_category)
  localStorage.setItem('category_id', id)
  router.push({ name: 'editCategory' })
}

const addCategory = () => {
  router.push({ name: 'createCategories' })
}

onMounted(async () => {
  let response = await getCategoriesWithProducts()
  categories.value = response
})
</script>

<style scoped>
.categories-container {
  text-align: center;
  color: #fff;
  background-color: #1a1a2e;
  padding: 20px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.category-card {
  background-color: #2e2e4d;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.category-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.category-id {
  font-size: 0.9rem;
  color: #aaa;
}

.category-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.btn {
  padding: 10px 15px;
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

.delete-btn:hover {
  background-color: #e04343;
}

.new-category-btn {
  margin-top: 20px;
  background-color: #6200ea;
  color: #fff;
}

.new-category-btn:hover {
  background-color: #5a00d1;
}
</style>
