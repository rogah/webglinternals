import { BindEventListenerOptions, UnbindEventListener } from './types';

export const defaultAddEventListenerOptions: AddEventListenerOptions = {
  capture: false,
};

export function bind<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  { type, listener, options }: BindEventListenerOptions<K>
): () => void {
  target.addEventListener(
    type,
    listener,
    options || defaultAddEventListenerOptions
  );

  return function unbind() {
    target.removeEventListener(
      type,
      listener,
      options || defaultAddEventListenerOptions
    );
  };
}

export function bindAll<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  listenersToBind: BindEventListenerOptions<K>[]
): () => void {
  const listenersToUnbind: UnbindEventListener[] = [];

  listenersToBind.forEach((bindOptions) =>
    listenersToUnbind.push(bind(target, bindOptions))
  );
  return function unbindAll() {
    listenersToUnbind.forEach((listenerToUnbind) => {
      listenerToUnbind();
    });
  };
}
