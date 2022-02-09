import * as yup from 'yup';

export const addDishValidator = yup.object({
  name: yup.string().required(),
  priceCents: yup
    .number()
    .transform((_, value) => {
      if (value && `${value}`.includes('.')) {
        return +value;
      }
      return +`${value}`.replace(/,/, '.');
    })
    .positive()
    .required()
    .test(
      'maxDigitsAfterDecimal',
      'number field must have 2 digits after decimal or less',
      (number: number | undefined) => /^\d+(\.\d{1,2})?$/.test(String(number))
    ),
  userId: yup.number().required(),
});
