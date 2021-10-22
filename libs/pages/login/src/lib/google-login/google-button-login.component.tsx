import { FunctionComponent, useEffect, useRef } from 'react';

import { useGoogleLibLoader } from '@pasnik/shared/utils-auth';

export interface GoogleButtonLoginProps
  extends google.accounts.IUseGoogleOneTapLogin {
  width?: string;
  className?: string;
}

export const GoogleButtonLogin: FunctionComponent<GoogleButtonLoginProps> = ({
  children = null,
  className,
  width,
  ...props
}) => {
  const ref = useRef(null);
  const { gapi } = useGoogleLibLoader();

  useEffect(() => {
    if (!gapi) {
      return;
    }

    gapi.initialize(props.googleAccountConfigs);
    const element = ref.current;
    if (element !== null && element !== undefined) {
      gapi.renderButton(element, {
        theme: 'filled_black',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
        width,
      });
    }
  }, [gapi, props.googleAccountConfigs, ref, width]);

  return <div className={className} ref={ref} />;
};
