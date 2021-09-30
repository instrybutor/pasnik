export interface IUseGoogleOneTapLogin {
  disabled?: boolean;
  googleAccountConfigs: IGoogleOneTapLoginProps;
}

export interface IGoogleOneTapLoginProps {
  nonce?: string;
  context?: string;
  client_id: string;
  auto_select?: boolean;
  prompt_parent_id?: string;
  state_cookie_domain?: string;
  cancel_on_tap_outside?: boolean;
  callback?: (response: google.accounts.IGoogleCallbackResponse) => void;
  native_callback?: (response: google.accounts.IGoogleCallbackResponse) => void;
}

