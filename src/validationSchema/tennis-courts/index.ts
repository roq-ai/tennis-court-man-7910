import * as yup from 'yup';

export const tennisCourtValidationSchema = yup.object().shape({
  name: yup.string().required(),
  availability: yup.boolean().required(),
  price: yup.number().integer().required(),
  company_id: yup.string().nullable(),
});
