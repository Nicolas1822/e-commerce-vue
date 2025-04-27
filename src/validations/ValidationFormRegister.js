import * as yup from 'yup';

export const validateFormRegisterSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  lastName: yup.string().required('El apellido es obligatorio'),
  phone: yup.string().required('El telefono es obligatorios').min(10, 'El telefono debe tener al menos 10 caracteres'),
  email: yup.string().email().required('El email es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria').min(8, 'La contraseña debe tener al menos 8 caracteres'),
})
