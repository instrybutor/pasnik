import * as yup from 'yup';

export const addMembersToWorkspaceValidator = yup.object().shape({
  members: yup.array().of(
    yup.object().shape({
      email: yup.string().email().required(),
    })
  ),
});
