declare module 'promise-window' {
  interface PromiseWindowConfig {
    width?: number;
    height?: number;
    onPostMessage?: (event?: MessageEvent<any>) => void;
    watcherDelay?: number;
    windowName?: string;
    window?: Object;
    onClose?: () => void;
    originRegexp?: RegExp;
  }
  export default class {
    open<T = unknown>(url: string, config?: PromiseWindowConfig): Promise<T>;
    close(): void;
    isOpen(): boolean;
    static open<T = unknown>(
      url: string,
      config?: PromiseWindowConfig
    ): Promise<T>;
  }
}
