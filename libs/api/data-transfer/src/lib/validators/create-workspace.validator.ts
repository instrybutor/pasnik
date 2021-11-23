import * as yup from 'yup';

export const createWorkspaceValidator = yup.object({
  name: yup.string().required(),
  members: yup
    .array()
    .optional()
    .of(
      yup.object().shape({
        userId: yup.number(),
        role: yup.string(),
        // .oneOf([WorkspaceUserRole.User, WorkspaceUserRole.Admin]),
      })
    ),
});
