import * as yup from 'yup';

export const orderValidator = yup.object({
  from: yup.string().required(),
  menuUrl: yup
    .string()
    .required()
    .test('validURL', 'This URL is not valid', (number) => {
      if (number) {
        return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)|www\.\w+\..+$/.test(
          number.toString()
        );
      }

      return false;
    }),
  shippingCents: yup
    .string()
    .test(
      'maxDigitsAfterDecimal',
      'number field must have 2 digits after decimal or less',
      (number: string | undefined) => {
        if (number) {
          return /^\d+(\.|,\d{1,2})?$/.test(number);
        }

        return true;
      }
    ),
});
