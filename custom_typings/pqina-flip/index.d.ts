declare module '@pqina/flip' {
  export interface TickElement {
    value: any;
  }
  interface CreateOptions {
    value?: any;
    didInit?: (tick: TickElement) => void;
    didUpdate?: (tick: TickElement) => void;
    willRemove?: (tick: TickElement) => void;
    didRemove?: (tick: TickElement) => void;
  }
  interface DownOptions {
    format: string[];
  }
  interface TimerElement {
    stop(): void;
  }
  interface CounterElement {
    onupdate?: (value: any) => void;
    timer: TimerElement;
  }
  interface DOMInterface {
    create(element: HTMLElement, options?: CreateOptions): TickElement;
    destroy(element: TickElement): void;
  }
  interface CountInterface {
    down(
      date: Date | string | number,
      options?: DownOptions | string
    ): CounterElement;
  }
  interface HelperInterface {
    duration(value: number, ms: string): number;
  }
  export default class {
    static DOM: DOMInterface;
    static count: CountInterface;
    static helper: HelperInterface;
  }
}
