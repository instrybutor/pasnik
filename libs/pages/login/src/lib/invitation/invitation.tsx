import { RequestAccessModal } from '../request-access-modal/request-access-modal';
import { SuccessModal } from '@pasnik/components';
import { useCallback, useEffect, useState } from 'react';
import { useRequestAccessMutation } from '@pasnik/auth';

export interface InvitationsProps {
  requestToken: string | null;
  onError: (error: Error) => void;
}

export function Invitation({ requestToken, onError }: InvitationsProps) {
  const { mutateAsync: requestAccess } = useRequestAccessMutation();
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [requestAccessModalOpen, setRequestAccessModalOpen] = useState(false);

  const requestAccessSubmit = useCallback(() => {
    return requestAccess(requestToken!)
      .then(() => setSuccessModalOpen(true))
      .catch(onError);
  }, [requestToken, requestAccess, onError]);

  const requestAccessCancel = useCallback(() => {
    setRequestAccessModalOpen(false);
  }, []);

  useEffect(() => {
    setRequestAccessModalOpen(!!requestToken);
  }, [requestToken]);

  return (
    <>
      <RequestAccessModal
        isOpen={requestAccessModalOpen}
        cancelHandler={requestAccessCancel}
        submitHandler={requestAccessSubmit}
      />
      <SuccessModal
        title="Zapytanie wysłane"
        buttonText="Wróć na stronę logowania"
        open={successModalOpen}
        setOpen={setSuccessModalOpen}
      />
    </>
  );
}
