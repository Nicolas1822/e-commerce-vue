<template>
  <div class="form-wrapper">
    <h1 class="form-title">Recuperar Contraseña</h1>
    <p class="form-subtitle">Digite el email asociado a la cuenta</p>
    <Form :validation-schema="ValidationFormRecoveryPasswordSchema" class="form-container">
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <Field
          type="email"
          id="email"
          name="email"
          v-model="email"
          class="form-input"
          placeholder="Ingrese su email"
        />
        <ErrorMessage name="email" class="error-message" />
      </div>
      <button @click="recovery" class="form-button">Enviar</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </Form>
  </div>
</template>

<script setup>
import { useForgotPassword } from '@/helpers/UseLogin'
import { ref } from 'vue'
import { Form, ErrorMessage, Field } from 'vee-validate'
import { ValidationFormRecoveryPasswordSchema } from '@/validations/ValidationFormRecoveryPassword'
import { useRouter } from 'vue-router'

const errorMessage = ref('')
const email = ref('')
const router = useRouter()

const recovery = async () => {
  const response = await useForgotPassword(email.value)
  if (response.status !== 200) {
    errorMessage.value = 'Email no encontrado'
  } else {
    router.push({ name: 'recovery-password' })
  }
}
</script>

<style scoped>
/* Contenedor principal del formulario */
.form-wrapper {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1a1a2e; /* Fondo oscuro */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Título del formulario */
.form-title {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 10px;
}

/* Subtítulo del formulario */
.form-subtitle {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 20px;
}

/* Contenedor del formulario */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Grupo de formulario */
.form-group {
  text-align: left;
}

/* Etiqueta del formulario */
.form-label {
  font-size: 0.9rem;
  color: #fff;
  margin-bottom: 5px;
  display: block;
}

/* Campo de entrada */
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

/* Botón de envío */
.form-button {
  background-color: #574bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #4639d3;
}

/* Mensaje de error */
.error-message {
  font-size: 0.9rem;
  color: #ff4d4d;
  margin-top: 5px;
}
</style>
