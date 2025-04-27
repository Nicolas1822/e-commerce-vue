<template>
  <div class="form-wrapper">
    <h1 class="form-title">Registro de Producto</h1>
    <p class="form-subtitle">Complete el formulario para registrar un nuevo producto</p>
    <Form
      :validation-schema="ValidationFormProductsSchema"
      @submit="addProduct"
      class="form-container"
    >
      <div class="form-group">
        <label for="name">Nombre del Producto</label>
        <Field
          type="text"
          id="name"
          name="name"
          v-model="name"
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
        <select id="categories" name="categories" class="form-input">
          <option value="" disabled selected>Seleccione una categoría</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <ErrorMessage name="categories" class="error-message" />
      </div>
      <button type="submit" class="form-button">Registrar Producto</button>
    </Form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, ErrorMessage, Field } from 'vee-validate'
import { ValidationFormProductsSchema } from '@/validations/ValidationFormProducts'
import { getCategoriesWithProducts } from '@/helpers/UseCategory'
import { createProduct } from '@/helpers/UseProducts'

let categories = ref([])
let router = useRouter()
let name = ref('')
let price = ref('')
let description = ref('')

const addProduct = async () => {
  let category_id = document.querySelector('select[name="categories"]').value
  let product = {
    name: name.value,
    price: price.value,
    description: description.value,
    categoryId: category_id,
  }
  let response = await createProduct(product)
  if (response.status === 201) {
    router.push({ name: 'products' })
  } else {
    console.log(response.data)
  }
}

onMounted(async () => {
  let response = await getCategoriesWithProducts()
  categories.value = response
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
