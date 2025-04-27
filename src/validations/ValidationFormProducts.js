import * as Yup from 'yup';

export const ValidationFormProductsSchema = Yup.object().shape({
  name: Yup.string().required('El campo nombre es requerido').max(15, 'El nombre no puede tener más de 15 caracteres'),
  description: Yup.string().required('El campo descripción es requerido').min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: Yup.number()
    .required('El campo precio es requerido')
    .positive('El precio debe ser un número positivo')
    .min(0, 'El precio no puede ser menor a 0'),
});
