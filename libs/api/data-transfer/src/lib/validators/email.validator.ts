import * as yup from 'yup';

export const emailValidator = yup.string().email();
