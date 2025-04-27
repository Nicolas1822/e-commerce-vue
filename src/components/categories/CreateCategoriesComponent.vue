<template>
  <div class="form-container">
    <h2>Registro de Categoría</h2>
    <p>Complete el formulario para registrar una nueva categoría</p>
    <Form class="form" :validation-schema="validateFormCategoriesSchema" @submit="create">
      <div class="form-group">
        <label for="category">Nombre de la Categoría</label>
        <Field
          type="text"
          name="category"
          id="category"
          v-model="category"
          placeholder="Ej: Electrónicos"
          class="form-input"
        />
        <ErrorMessage name="category" class="form-error" />
      </div>
      <button type="submit" class="btn-submit">Registrar Categoría</button>
      <p class="error-message">{{ errorMessage }}</p>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createCategory } from '@/helpers/UseCategory'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { validateFormCategoriesSchema } from '@/validations/ValidationFormCategories'

const router = useRouter()
const category = ref('')
const errorMessage = ref('')

const create = async () => {
  const data = {
    name: category.value,
  }
  const response = await createCategory(data)
  if (response.status === 409) {
    errorMessage.value = 'Esta categoria ya existe'
  } else {
    router.push({ name: 'getCategories' })
  }
}
</script>

<style scoped>
.form-container {
  background-color: #1a1a2e;
  color: #fff;
  padding: 30px;
  border-radius: 10px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

p {
  font-size: 0.9rem;
  margin-bottom: 20px;
  color: #aaa;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  text-align: left;
}

label {
  font-size: 0.9rem;
  margin-bottom: 5px;
  display: block;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #2e2e4d;
  color: #fff;
  font-size: 0.9rem;
}

.form-input::placeholder {
  color: #aaa;
}

.form-input:focus {
  outline: none;
  border-color: #574bff;
}

.form-error {
  font-size: 0.8rem;
  color: #ff4d4d;
  margin-top: 5px;
}

.btn-submit {
  background-color: #574bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #4639d3;
}

.error-message {
  font-size: 0.9rem;
  color: #ff4d4d;
  margin-top: 10px;
}
</style>
