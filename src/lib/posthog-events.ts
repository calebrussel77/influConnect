import { isProd } from '@/constants';
import posthog, { type Properties } from 'posthog-js';

export type EventActions =
  | 'user subscribe on wainting list'
  | 'user send feedback';
export type EventCategories = 'Contact' | 'CTA';

type Options = Properties & {
  message: string;
};

const capture = (
  eventName: EventActions,
  properties?: Options | null | undefined
) => {
  if (!isProd) return null;
  posthog.capture(eventName, properties);
};

const init = (identifier: string) => {
  if (!isProd) return null;
  posthog.init(identifier);
};

export const analytics = Object.assign(
  {},
  {
    capture,
    init,
  }
);
