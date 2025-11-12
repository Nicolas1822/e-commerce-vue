import * as Yup from 'yup';

export const ValidationFormRecoveryPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Email invalido').required('El email es obligatorio'),
  token: Yup.string().required('El campo descripción es requerido').min(10, 'Token inválido'),
  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
  repeatPassword: Yup.string()
    .required('este campo es obligatorio')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});
