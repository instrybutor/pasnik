import * as yup from 'yup';

export const markAsOrderedValidator = yup.object({
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
