import { useCallback, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/outline';
import { PopoverPanelProps, UserInfo } from '@pasnik/components';
import { UserAddIcon } from '@heroicons/react/solid';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import {
  AddMembersToWorkspaceDto,
  addMembersToWorkspaceValidator,
  emailValidator,
} from '@pasnik/api/data-transfer';
import {
  useWorkspaceAddMembersMutation,
  useWorkspaceRequestAccesses,
} from '@pasnik/features/workspaces';
import { WorkspaceUserInviteItem } from '../workspace-user-invite-item/workspace-user-invite-item';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export interface WorkspaceUserInvitePopoverProps extends PopoverPanelProps {
  slug: string;
}

interface EmailForm {
  email: string;
}

export function WorkspaceUserInvitePopover({
  open,
  slug,
  close,
}: WorkspaceUserInvitePopoverProps) {
  const { t } = useTranslation();
  const { data: requestAccesses } = useWorkspaceRequestAccesses(slug);
  const addMembersMutation = useWorkspaceAddMembersMutation(slug);

  const { register, handleSubmit, reset, formState } = useForm<EmailForm>({
    resolver: yupResolver(
      yup.object().shape({
        email: emailValidator,
      })
    ),
  });

  const {
    control,
    getValues,
    reset: resetMembers,
  } = useForm<AddMembersToWorkspaceDto>({
    resolver: yupResolver(addMembersToWorkspaceValidator),
  });

  const { fields, insert, remove } = useFieldArray({
    control,
    name: 'members',
  });

  const onSubmitButtonClick = useCallback(() => {
    const values = getValues();
    if (values.members?.length > 0) {
      addMembersMutation.mutate(values);
      close();
    }
  }, [close, getValues, addMembersMutation]);

  const onSubmit = useCallback(
    (data: EmailForm) => {
      if (data.email.length > 0) {
        insert(0, data);
        reset();
      } else {
        onSubmitButtonClick();
      }
    },
    [insert, reset, onSubmitButtonClick]
  );

  useEffect(() => {
    if (open) {
      reset();
      resetMembers();
    }
  }, [open, reset, resetMembers]);

  return (
    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 flex flex-wrap p-4 gap-2 flex-col w-96">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex relative rounded-md shadow-sm">
          <div className="relative flex flex-grow focus-within:z-10">
            <label
              htmlFor="invite-user-email"
              className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
            >
              {t('forms.email')}
            </label>
            <input
              {...register('email')}
              autoFocus={true}
              type="text"
              id="invite-user-email"
              className={classNames(
                'block w-full rounded-none rounded-l-md sm:text-sm',
                {
                  'focus:ring-cyan-500 focus:border-cyan-500 border-gray-300':
                    !formState.errors.email,
                  'border-red-300 focus:ring-red-500 focus:border-red-500':
                    formState.errors.email,
                }
              )}
              placeholder="example@example.com"
            />
          </div>
          <button
            type="submit"
            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          >
            <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span>{t('actions.add')}</span>
          </button>
        </div>
      </form>
      {fields.length > 0 || (requestAccesses && requestAccesses.length > 0) ? (
        <ul className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
          {requestAccesses?.map(({ id, user }) => (
            <li key={id} className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <UserInfo size="sm" user={user} />
              </div>
              <button
                type="button"
                onClick={() => {
                  addMembersMutation.mutateAsync({
                    members: [{ email: user.email }],
                  });
                }}
                className="ml-6 bg-white rounded-md text-sm font-medium text-cyan-600 hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Zatwierdź
              </button>
            </li>
          ))}
          {fields.map((field, index) => (
            <WorkspaceUserInviteItem
              key={index}
              remove={() => remove(index)}
              control={control}
              name={`members.${index}.email`}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center bg-white py-6 flex flex-col items-center">
          <UserAddIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {t('workspace.inviteUsers')}
            </h3>
          </div>
        </div>
      )}
      <button
        disabled={fields.length === 0}
        onClick={onSubmitButtonClick}
        type="button"
        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      >
        {t('actions.add')}
      </button>
    </div>
  );
}
