import * as yup from 'yup';

export const createOrderValidator = yup.object({
  from: yup.string().required('validation.required'),
  menuUrl: yup.string().test('validURL', 'validation.invalid', (url) => {
    if (url) {
      return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$$/.test(
        url.toString()
      );
    }

    return true;
  }),
  shippingCents: yup
    .string()
    .test(
      'maxDigitsAfterDecimal',
      'validation.invalid',
      (number: string | undefined) => {
        if (number) {
          return /^\d+(\.|,\d{1,2})?$/.test(number);
        }

        return true;
      }
    ),
});
