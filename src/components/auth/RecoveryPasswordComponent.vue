<template>
  <div class="form-wrapper">
    <h1 class="form-title">Recuperar Contraseña</h1>
    <p class="form-subtitle">
      Por favor ingrese el token enviado al correo electrónico de la cuenta
    </p>
    <Form :validation-schema="ValidationFormRecoveryPasswordSchema" class="form-container">
      <div class="form-group">
        <label for="token" class="form-label">Token</label>
        <Field
          v-model="token"
          as="textarea"
          id="token"
          name="token"
          class="form-input"
          placeholder="Ingrese el token"
          required
        />
        <ErrorMessage name="token" class="error-message" />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Nueva Contraseña</label>
        <Field
          type="password"
          id="password"
          name="password"
          v-model="password"
          class="form-input"
          placeholder="Ingrese su nueva contraseña"
          required
        />
        <ErrorMessage name="password" class="error-message" />
      </div>
      <div class="form-group">
        <label for="repeatPassword" class="form-label">Repetir Contraseña</label>
        <Field
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          v-model="repeatPassword"
          class="form-input"
          placeholder="Repita su nueva contraseña"
          required
        />
        <ErrorMessage name="repeatPassword" class="error-message" />
      </div>
      <button @click="recoveryPassword" class="form-button">Enviar</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p class="form-note">
        Si no ha recibido el token, por favor revise su bandeja de entrada o carpeta de spam.
      </p>
    </Form>
  </div>
</template>

<script setup>
import { useResetPassword } from '@/helpers/UseLogin'
import { ref } from 'vue'
import { ValidationFormRecoveryPasswordSchema } from '@/validations/ValidationFormRecoveryPassword'
import { Form, ErrorMessage, Field } from 'vee-validate'
import { useRouter } from 'vue-router'

const errorMessage = ref('')
const token = ref('')
const password = ref('')
const repeatPassword = ref('')
const router = useRouter()

const recoveryPassword = async () => {
  if (password.value !== repeatPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden'
    return
  }

  const response = await useResetPassword(token.value, password.value)
  if (response.status !== 200) {
    errorMessage.value = 'Error al recuperar la contraseña'
  } else {
    router.push({ name: 'login' })
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
  width: 95%;
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

/* Nota adicional */
.form-note {
  font-size: 0.8rem;
  color: #aaa;
  margin-top: 10px;
}
</style>
