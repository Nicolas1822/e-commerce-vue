<template>
  <button class="btn delete-btn" @click="handleDelete">Eliminar</button>
</template>

<script setup>
import { deleteCategory } from '@/helpers/UseCategory'
import { defineProps, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

let props = defineProps(['category_id'])
let categoryId = ref(props.category_id)
let router = useRouter()

watch(
  () => props.category_id,
  (newValue) => {
    categoryId.value = newValue
  },
)

const categoryDelete = async (id) => {
  let response = await deleteCategory(id)
  router.go(0)
  console.log(response)
}

const handleDelete = async () => {
  const confirmed = confirm('¿Estás seguro de eliminar esta categoría?')
  if (confirmed) {
    categoryDelete(categoryId.value)
  }
}
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.delete-btn {
  background-color: #ff4d4d;
  color: #fff;
}
</style>
