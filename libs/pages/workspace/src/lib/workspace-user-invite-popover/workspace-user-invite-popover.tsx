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
import { useWorkspaceRequestAccesses } from '@pasnik/features/workspaces';

export interface WorkspaceUserInvitePopoverProps extends PopoverPanelProps {
  slug: string;
}

export function WorkspaceUserInvitePopover({
  open,
  slug,
}: WorkspaceUserInvitePopoverProps) {
  const { data: requestAccesses } = useWorkspaceRequestAccesses(slug);

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: emailValidator.required(),
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

  const onSubmit = useCallback(
    (data) => {
      insert(0, data);
      reset();
    },
    [insert, reset]
  );

  const onSubmitButtonClick = useCallback(() => {
    const values = getValues();
    console.log(values);
  }, [getValues]);

  useEffect(() => {
    if (!open) {
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
              Email
            </label>
            <input
              {...register('email')}
              type="text"
              id="invite-user-email"
              className="focus:ring-cyan-500 focus:border-cyan-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
              placeholder="example@example.com"
            />
          </div>
          <button
            type="submit"
            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          >
            <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span>Dodaj</span>
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
                  insert(0, user);
                }}
                className="ml-6 bg-white rounded-md text-sm font-medium text-cyan-600 hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Zatwierdź
              </button>
            </li>
          ))}
          {fields.map((value, index) => (
            <li
              key={value.id}
              className="py-3 flex justify-between items-center"
            >
              <div className="flex items-center">
                <UserInfo size="sm" fallbackValue={value.email} />
              </div>
              <button
                onClick={() => {
                  remove(index);
                }}
                type="button"
                className="ml-6 bg-white rounded-md text-sm font-medium text-cyan-600 hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center bg-white py-6 flex flex-col items-center">
          <UserAddIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Dodaj osoby za pomocą adresu email
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
        Dodaj
      </button>
    </div>
  );
}
