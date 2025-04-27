import * as yup from 'yup';

export const validateFormLoginSchema = yup.object().shape({
  email: yup.string().email().required('El email es obligatoria'),
  password: yup.string().required('La constraseña es obligatoria').min(8, 'La contraseña debe tener al menos 8 caracteres'),
})
