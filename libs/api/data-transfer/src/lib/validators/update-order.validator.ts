import * as yup from 'yup';
import { isNumber, toNumber } from 'lodash';

export const updateOrderValidator = yup.object({
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
      'number',
      'Value must be a number (integer or float)',
      (number: string | undefined) => {
        if (number) {
          return isNumber(toNumber(number));
        }

        return true;
      }
    ),
});
