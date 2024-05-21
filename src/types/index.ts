export type PageProps = {
  messages: IntlMessages;
  now: number;
};

// Exclude keys from model
export function Exclude<T, Key extends keyof T>(
  model: T,
  keys: Key[]
): Omit<T, Key> {
  for (const key of keys) {
    delete model[key];
  }
  return model;
}

export type ObjectValues<T> = T[keyof T];
