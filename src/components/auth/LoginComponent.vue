<template>
  <div class="login-container">
    <h1>Login</h1>
    <Form :validation-schema="validateFormLoginSchema" @submit="login">
      <div>
        <label for="username">Email:</label>
        <Field type="email" name="email" v-model="email" />
        <ErrorMessage name="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <Field type="password" name="password" v-model="password" />
        <ErrorMessage name="password" />
      </div>
      <button type="submit">Login</button>
      <p>{{ errorMessage }}</p>
    </Form>
    <router-link to="/"><a>Create account</a></router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validateFormLoginSchema } from '@/validations/ValidationFormLogin'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useLogin } from '@/helpers/UseLogin'
import { useRouter } from 'vue-router'

const router = useRouter()

let email = ref('')
let password = ref('')
let errorMessage = ref('')

const login = async () => {
  let response = await useLogin(email.value, password.value)

  if (response.status !== 200) {
    errorMessage.value = 'Email o contraseña incorrectos'
  } else {
    localStorage.setItem('access_token', response.access_token)
    localStorage.setItem('role', response.role)
    localStorage.setItem('email', response.email)
    router.push({ name: 'dashboard' })
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'roboto';
  src: url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0b0b0f; /* Fondo oscuro */
  color: #ffffff; /* Texto blanco */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 2rem auto;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  font-family: 'roboto', sans-serif;
  color: #ffffff;
  margin-bottom: 1rem;
}

label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #cccccc;
  font-family: 'roboto', sans-serif;
}

input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #2e2e4d;
  color: #ffffff;
  font-size: 1rem;
}

input[type='email']::placeholder,
input[type='password']::placeholder {
  color: #888;
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #6c63ff; /* Botón morado */
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #574bff; /* Color más oscuro al pasar el mouse */
}

p {
  font-size: 0.9rem;
  color: #cccccc;
  margin-top: 1rem;
}

a {
  color: #6c63ff;
  text-decoration: none;
  font-weight: bold;
  font-family: 'roboto', sans-serif;
}

a:hover {
  text-decoration: underline;
}

.router-link {
  margin-top: 1rem;
  text-align: center;
}

.error-message {
  color: #ff4d4d; /* Rojo para mensajes de error */
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.checkbox-container input[type='checkbox'] {
  margin-right: 0.5rem;
}

.checkbox-container label {
  font-size: 0.9rem;
  color: #cccccc;
}

.social-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.social-buttons button {
  flex: 1;
  margin: 0 0.5rem;
  padding: 0.8rem;
  background-color: #2e2e4d;
  color: #ffffff;
  border: 1px solid #444;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.social-buttons button:hover {
  background-color: #444;
}

.social-buttons button:first-child {
  margin-left: 0;
}

.social-buttons button:last-child {
  margin-right: 0;
}
</style>
