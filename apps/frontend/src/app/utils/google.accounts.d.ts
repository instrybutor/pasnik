declare namespace google.accounts {
  export class id {
    initialize(options: IdConfiguration);
    renderButton(
      parent: HTMLElement,
      options?: GsiButtonConfiguration,
      clickHandler?: Function
    );
    revoke(hint?: string, callback?: (response: RevocationResponse) => void);
  }
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
  callback?: Function;
  native_callback?: Function;
  login_uri?: string;
  cancel_on_tap_outside?: boolean;
  prompt_parent_id?: string;
  nonce?: string;
  context?: Object;
  state_cookie_domain?: string;
  ux_mode?: string;
  allowed_parent_origin?: string;
  intermediate_iframe_close_callback?: Function;
}
