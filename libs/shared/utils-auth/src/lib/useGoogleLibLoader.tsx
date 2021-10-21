import { useEffect, useState } from 'react';

const API_URL = 'https://accounts.google.com/gsi/client';

export const useGoogleLibLoader = () => {
  const [pending, setPending] = useState<boolean>(true);
  const [gapi, setGoogleAPI] = useState<google.accounts.id>();

  const script = document.createElement('script');

  useEffect(() => {
    if ((window as any).google?.accounts?.id) {
      setGoogleAPI((window as any).google.accounts.id);
      return;
    }

    const onLoad = () => {
      setPending(false);
      setGoogleAPI((window as any).google.accounts.id);
    };

    script.addEventListener('load', onLoad);

    script.src = API_URL;
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', onLoad);
      script.remove();
    };
  }, [script]);

  return {
    pending,
    gapi,
  };
};
