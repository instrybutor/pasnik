import { useCallback, useState } from 'react';
import { LoginError } from '../login.error';

export const useAuthPopup = () => {
  const [windowRef, setWindowRef] = useState<Window | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [rejectPromise, setRejectPromise] = useState<CallableFunction | null>(
    null
  );
  const [receiveMessageFn, setReceiveMessageFn] = useState<
    ((event: MessageEvent<any>) => void) | null
  >(null);

  const cleanUp = useCallback(() => {
    if (receiveMessageFn) {
      window.removeEventListener('message', receiveMessageFn);
      setReceiveMessageFn(null);
    }

    if (rejectPromise) {
      rejectPromise();
      setRejectPromise(null);
    }
  }, [setReceiveMessageFn, setRejectPromise, rejectPromise, receiveMessageFn]);

  const openPopup = useCallback(
    (url, name) => {
      // window features
      const strWindowFeatures =
        'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

      if (windowRef === null || windowRef.closed) {
        /* if the pointer to the window object in memory does not exist
       or if such pointer exists but the window was closed */
        setWindowRef(window.open(url, name, strWindowFeatures));
      } else if (previousUrl !== url) {
        /* if the resource to load is different,
       then we load it in the already opened secondary window and then
       we bring such window back on top/in front of its parent window. */
        setWindowRef(window.open(url, name, strWindowFeatures));
        windowRef.focus();
      } else {
        /* else the window reference must exist and the window
       is not closed; therefore, we can bring it back on top of any other
       window with the focus() method. There would be no need to re-create
       the window or to reload the referenced resource. */
        windowRef.focus();
      }
      // assign the previous URL
      setPreviousUrl(url);
    },
    [windowRef, setWindowRef, previousUrl, setPreviousUrl]
  );

  const openSignInWindow = useCallback(
    (url, name) => {
      cleanUp();

      return new Promise((resolve, reject) => {
        setRejectPromise(() => reject);
        // remove any existing event listeners
        setReceiveMessageFn(() => (event: MessageEvent<any>) => {
          // Do we trust the sender of this message? (might be
          // different from what we originally opened, for example).
          if (event.origin !== process.env.NX_BASE_URL) {
            return;
          }
          const { data } = event;
          // if we trust the sender and the source is our popup
          if (data.status === 'success') {
            resolve(data);
          } else {
            reject(new LoginError(data.status, data.requestToken));
          }
          setRejectPromise(null);
          window.removeEventListener('message', receiveMessageFn!);
        });

        // window features
        const strWindowFeatures =
          'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

        if (windowRef === null || windowRef.closed) {
          /* if the pointer to the window object in memory does not exist
         or if such pointer exists but the window was closed */
          setWindowRef(window.open(url, name, strWindowFeatures));
        } else if (previousUrl !== url) {
          /* if the resource to load is different,
         then we load it in the already opened secondary window and then
         we bring such window back on top/in front of its parent window. */
          setWindowRef(window.open(url, name, strWindowFeatures));
          windowRef.focus();
        } else {
          /* else the window reference must exist and the window
         is not closed; therefore, we can bring it back on top of any other
         window with the focus() method. There would be no need to re-create
         the window or to reload the referenced resource. */
          windowRef.focus();
        }

        // assign the previous URL
        setPreviousUrl(url);

        // add the listener for receiving a message from the popup
        window.addEventListener('message', receiveMessageFn!, false);
      });
    },
    [
      windowRef,
      previousUrl,
      setRejectPromise,
      rejectPromise,
      receiveMessageFn,
      setReceiveMessageFn,
      cleanUp,
    ]
  );

  return {
    openSignInWindow,
  };
};
