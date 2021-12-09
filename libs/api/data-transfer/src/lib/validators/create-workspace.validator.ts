import * as yup from 'yup';

export const createWorkspaceValidator = yup.object({
  name: yup.string().required(),
  privacy: yup.string().required(),
});
