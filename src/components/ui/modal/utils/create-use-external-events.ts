/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useLayoutEffect } from 'react';

function dispatchEvent<T>(type: string, detail?: T) {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}

const useIsomorphicEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function createUseExternalEvents<
  Handlers extends Record<string, (detail: any) => void>,
>(prefix: string) {
  function _useExternalEvents(events: Handlers) {
    const handlers = Object.keys(events).reduce<any>((acc, eventKey) => {
      acc[`${prefix}:${eventKey}`] = (event: CustomEvent) =>
        //@ts-ignore
        events[eventKey](event.detail);
      return acc;
    }, {});

    useIsomorphicEffect(() => {
      Object.keys(handlers).forEach(eventKey => {
        window.removeEventListener(eventKey, handlers[eventKey]);
        window.addEventListener(eventKey, handlers[eventKey]);
      });

      return () =>
        Object.keys(handlers).forEach(eventKey => {
          window.removeEventListener(eventKey, handlers[eventKey]);
        });
    }, [handlers]);
  }

  function createEvent<EventKey extends keyof Handlers>(event: EventKey) {
    type Parameter = Parameters<Handlers[EventKey]>[0];

    return (
      ...payload: Parameter extends undefined ? [undefined?] : [Parameter]
    ) => dispatchEvent(`${prefix}:${String(event)}`, payload[0]);
  }

  return [_useExternalEvents, createEvent] as const;
}
