import { ReactElement } from 'react';

export interface IUseGoogleOneTapLogin {
  disabled?: boolean;
  googleAccountConfigs: IGoogleOneTapLoginProps;
}

export interface IGoogleOneTapLogin extends IUseGoogleOneTapLogin {
  children?: ReactElement | null;
}

export interface IGoogleOneTapLoginProps {
  nonce?: string;
  context?: string;
  client_id: string;
  auto_select?: boolean;
  prompt_parent_id?: string;
  state_cookie_domain?: string;
  cancel_on_tap_outside?: boolean;
  callback?: (response: IGoogleCallbackResponse) => void;
  native_callback?: (response: IGoogleCallbackResponse) => void;
}

export interface IGoogleCallbackResponse {
  credential?: string;
}
