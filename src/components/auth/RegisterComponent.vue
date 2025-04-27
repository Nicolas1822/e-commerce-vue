<template>
  <div class="register-container">
    <h1>Register</h1>
    <Form :validation-schema="validateFormRegisterSchema" @submit="register">
      <div>
        <label for="">name</label>
        <Field type="text" name="name" id="" v-model="name" />
        <ErrorMessage name="name" />
      </div>
      <div>
        <label for="">last name</label>
        <Field type="text" name="lastName" id="" v-model="lastName" />
        <ErrorMessage name="lastName" />
      </div>
      <div>
        <label for="">phone</label>
        <Field type="number" name="phone" id="" v-model="phone" />
        <ErrorMessage name="phone" />
      </div>
      <div>
        <label for="">email</label>
        <Field type="email" name="email" id="" v-model="email" />
        <ErrorMessage name="email" />
      </div>
      <div>
        <label for="">password</label>
        <Field type="password" name="password" id="" v-model="password" />
        <ErrorMessage name="password" />
      </div>
      <div>
        <button type="submit">Register</button>
        <p>{{ errorMessage }}</p>
      </div>
    </Form>

    <router-link to="/login"><a>Sign in</a></router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { validateFormRegisterSchema } from '../../validations/ValidationFormRegister'
import { useRegister } from '@/helpers/UseRegister'

const name = ref('')
const lastName = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

const register = async () => {
  let response = await useRegister(
    name.value,
    lastName.value,
    phone.value.toString(),
    email.value,
    password.value,
  )

  if (response.status !== 201) {
    errorMessage.value = response.message
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

.register-container {
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
  font-family: 'roboto', sans-serif;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #cccccc;
  font-family: 'roboto', sans-serif;
}

input[type='text'],
input[type='number'],
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

input[type='text']::placeholder,
input[type='number']::placeholder,
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
  color: #ff4d4d; /* Rojo para mensajes de error */
  margin-top: 0.5rem;
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
</style>
