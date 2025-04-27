import * as yup from 'yup';

export const validateFormCategoriesSchema = yup.object().shape({
  category: yup.string().required('El nombre es obligatorio'),
});
