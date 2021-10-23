declare namespace google.accounts {
  export interface IUseGoogleOneTapLogin {
    disabled?: boolean;
    googleAccountConfigs: google.accounts.IGoogleOneTapLoginProps;
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
    native_callback?: (
      response: google.accounts.IGoogleCallbackResponse
    ) => void;
  }

  interface RevocationResponse {
    successful: boolean;
    error?: string;
  }

  interface GsiButtonConfiguration {
    type?: string;
    theme?: string;
    size?: string;
    text?: string;
    shape?: string;
    logo_alignment?: string;
    width?: string;
    locale?: string;
  }

  interface IdConfiguration {
    client_id: string;
    auto_select?: boolean;
    callback?: (response: IGoogleCallbackResponse) => void;
    native_callback?: (response: IGoogleCallbackResponse) => void;
    login_uri?: string;
    cancel_on_tap_outside?: boolean;
    prompt_parent_id?: string;
    nonce?: string;
    context?: unknown;
    state_cookie_domain?: string;
    ux_mode?: string;
    allowed_parent_origin?: string;
    intermediate_iframe_close_callback?: () => void;
  }

  export interface IGoogleCallbackResponse {
    credential: string;
  }

  export class id {
    initialize(options: IdConfiguration): void;
    renderButton(
      parent: HTMLElement,
      options?: GsiButtonConfiguration,
      clickHandler?: () => void
    ): void;
    revoke(
      hint?: string,
      callback?: (response: RevocationResponse) => void
    ): void;
  }
}
