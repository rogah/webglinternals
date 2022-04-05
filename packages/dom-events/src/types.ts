export interface UnbindEventListener {
  (): void;
}

export interface BindEventListenerOptions<K extends keyof HTMLElementEventMap> {
  type: K;
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any;
  options?: boolean | AddEventListenerOptions;
}
