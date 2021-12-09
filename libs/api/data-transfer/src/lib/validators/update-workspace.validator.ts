import * as yup from 'yup';

export const updateWorkspaceValidator = yup.object({
  name: yup.string().required(),
  privacy: yup.string().required(),
});
