<template>
  <button class="btn delete-btn" @click="handleDelete">Eliminar</button>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { deleteProduct } from '@/helpers/UseProducts'

let props = defineProps(['id'])
let productId = ref(props.id)
let router = useRouter()

watch(
  () => props.id,
  (newValue) => {
    productId.value = newValue
  },
)

const productDelete = async (id) => {
  let response = await deleteProduct(id)
  router.go(0)
}

const handleDelete = () => {
  const confirmed = confirm('¿Estás seguro de eliminar este producto?')
  if (confirmed) {
    productDelete(productId.value)
  }
}
</script>

<style scoped>
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.delete-btn {
  background-color: #e04343;
  color: #fff;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
