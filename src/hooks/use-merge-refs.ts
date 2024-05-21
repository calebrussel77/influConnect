/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useMemo } from 'react';

export type ReactRef<T> = React.RefCallback<T> | React.MutableRefObject<T>;

export function assignRef<T = unknown>(
  ref: ReactRef<T> | null | undefined,
  value: T
) {
  if (ref == null) return;

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  try {
    ref.current = value;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}

function mergeRefs<T>(...refs: (ReactRef<T> | null | undefined)[]) {
  return (node: T | null) => {
    refs.forEach(ref => {
      assignRef(ref, node);
    });
  };
}

export function useMergeRefs<T>(...refs: (ReactRef<T> | null | undefined)[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => mergeRefs(...refs), refs);
}
