<template>
  <!-- <h1>editar producto</h1>
  <Form :validation-schema="ValidationFormProductsSchema" @submit="handleSubmit">
    <label for="">Nombre del producto</label>
    <Field name="name" type="text" v-model="nameProduct" />
    <ErrorMessage name="name" />
    <label for="">Descripción del producto</label>
    <Field name="description" type="text" v-model="description" />
    <ErrorMessage name="description" />
    <label for="">Precio del producto</label>
    <Field name="price" type="number" v-model="price" />
    <ErrorMessage name="price" />
    <label for="">Categoria del producto</label>
    <select name="categories">
      <div v-for="category in categories" :key="category.id">
        <option :value="category.id">
          {{ category.name }}
        </option>
      </div>
    </select>
    <button type="submit">Modificar</button>
  </Form> -->

  <div class="form-wrapper">
    <h1 class="form-title">Registro de Producto</h1>
    <p class="form-subtitle">Complete el formulario para registrar un nuevo producto</p>
    <Form
      :validation-schema="ValidationFormProductsSchema"
      @submit="handleSubmit"
      class="form-container"
    >
      <div class="form-group">
        <label for="name">Nombre del Producto</label>
        <Field
          type="text"
          id="name"
          name="name"
          v-model="nameProduct"
          class="form-input"
          placeholder="Ej: Smartphone"
        />
        <ErrorMessage name="name" class="error-message" />
      </div>
      <div class="form-group">
        <label for="price">Precio</label>
        <Field
          type="number"
          id="price"
          name="price"
          v-model="price"
          class="form-input"
          placeholder="0"
        />
        <small class="form-hint">Ingrese el precio sin símbolo de moneda </small>
        <ErrorMessage name="price" class="error-message" />
      </div>
      <div class="form-group">
        <label for="description">Descripción</label>
        <Field
          type="text"
          as="textarea"
          id="description"
          name="description"
          v-model="description"
          class="form-input"
          placeholder="Describa el producto..."
        />
        <ErrorMessage name="description" class="error-message" />
      </div>
      <div class="form-group">
        <label for="categories">Categoría</label>
        <select id="categories" name="categories" class="form-input" v-model="categoryId">
          <option value="" disabled selected>Seleccione una categoría</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <ErrorMessage name="categories" class="error-message" />
      </div>
      <button type="submit" class="form-button">Modificar Producto</button>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ValidationFormProductsSchema } from '@/validations/ValidationFormProducts'
import { getCategoriesWithProducts } from '@/helpers/UseCategory'
import { modifyProduct } from '@/helpers/UseProducts'

let nameProduct = ref('')
let description = ref('')
let price = ref('')
let idProduct = ref('')
let categories = ref([])
let categoryId = ref('')
const router = useRouter()

const handleSubmit = async () => {
  let category_id = document.querySelector('select[name="categories"]').value
  const data = {
    name: nameProduct.value,
    description: description.value,
    price: price.value,
    categoryId: category_id,
  }
  await modifyProduct(idProduct.value, data)
  localStorage.removeItem('name_product')
  localStorage.removeItem('description_product')
  localStorage.removeItem('price_product')
  localStorage.removeItem('product_id')
  router.push({ name: 'manageProducts' })
}

onMounted(async () => {
  const response = await getCategoriesWithProducts()
  categories.value = response
  nameProduct.value = localStorage.getItem('name_product')
  description.value = localStorage.getItem('description_product')
  price.value = localStorage.getItem('price_product')
  idProduct.value = localStorage.getItem('product_id')
  categoryId.value = localStorage.getItem('category_id')
})
</script>

<style scoped>
/* Contenedor principal del formulario */
.form-wrapper {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1a1a2e; /* Fondo oscuro */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #ffffff; /* Texto blanco */
}

/* Título del formulario */
.form-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff;
}

/* Subtítulo del formulario */
.form-subtitle {
  text-align: center;
  font-size: 14px;
  color: #b3b3b3; /* Texto gris claro */
  margin-bottom: 20px;
}

/* Contenedor del formulario */
.form-container {
  display: flex;
  flex-direction: column;
}

/* Grupos de campos */
.form-group {
  margin-bottom: 20px;
}

/* Etiquetas */
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #ffffff;
}

/* Campos de entrada */
.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #44475a; /* Borde gris oscuro */
  border-radius: 4px;
  font-size: 14px;
  background-color: #282a36; /* Fondo gris oscuro */
  color: #ffffff; /* Texto blanco */
}

.form-input::placeholder {
  color: #b3b3b3; /* Texto de placeholder gris claro */
}

.form-input:focus {
  border-color: #8be9fd; /* Azul claro */
  outline: none;
  box-shadow: 0 0 5px rgba(139, 233, 253, 0.5);
}

/* Mensajes de error */
.error-message {
  color: #ff5555; /* Rojo */
  font-size: 12px;
  margin-top: 5px;
}

/* Pistas de los campos */
.form-hint {
  font-size: 12px;
  color: #b3b3b3; /* Gris claro */
  margin-top: 5px;
}

/* Botón de envío */
.form-button {
  width: 100%;
  padding: 10px;
  background-color: #6c63ff; /* Morado */
  color: #ffffff; /* Texto blanco */
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #574bff;
}
</style>
