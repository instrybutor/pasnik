import { FunctionComponent, useEffect, useRef } from 'react';
import { useGoogleLibrary } from '@pasnik/shared/utils-auth';
import { GoogleButtonLoginProps } from './types';

export const GoogleButtonLogin: FunctionComponent<GoogleButtonLoginProps> = ({
  children = null,
  className,
  ...props
}) => {
  const ref = useRef(null);
  const gapi = useGoogleLibrary();

  useEffect(() => {
    gapi.initialize(props.googleAccountConfigs);
    const element = ref.current;
    if (element !== null && element !== undefined) {
      gapi.renderButton(element, {
        theme: 'filled_black',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
      });
    }
  }, [gapi, props.googleAccountConfigs, ref]);

  return <div className={className} ref={ref} />;
};
