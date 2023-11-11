import { PropsWithChildren } from 'react';

export function ModalFooter({ children }: PropsWithChildren) {
  return (
    <>
      <div className="block flex-grow sm:hidden" />
      <div className="flex flex-col mt-5 sm:mt-4 sm:flex-row-reverse gap-3">
        {children}
      </div>
    </>
  );
}
