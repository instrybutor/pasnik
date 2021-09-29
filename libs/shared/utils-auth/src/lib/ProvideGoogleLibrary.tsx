import makeAsyncScriptLoader from 'react-async-script';
import React, { PropsWithChildren } from 'react';

const GoogleLibraryContext = React.createContext<google.accounts.id>(
  {} as google.accounts.id
);

function ProvideGoogleLibrary({ google, children }: PropsWithChildren<any>) {
  if (!google) {
    return <div>loading</div>;
  }
  return (
    <GoogleLibraryContext.Provider value={google.accounts.id}>
      {children}
    </GoogleLibraryContext.Provider>
  );
}

export function useGoogleLibrary() {
  return React.useContext(GoogleLibraryContext);
}

export default makeAsyncScriptLoader('https://accounts.google.com/gsi/client', {
  globalName: 'google',
  callbackName: 'onGoogleLibraryLoad',
})(ProvideGoogleLibrary);
