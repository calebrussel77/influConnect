import { z, type ZodNumber, type ZodArray } from 'zod';
import {
  parseNumericString,
  parseNumericStringArray,
} from './query-string-helpers';

/** Converts a string to a number */
export function numericString<I extends ZodNumber>(schema?: I) {
  return z.preprocess(value => parseNumericString(value), schema ?? z.number());
}

/** Converts an array of strings to an array of numbers */
export function numericStringArray<I extends ZodArray<ZodNumber>>(schema?: I) {
  return z.preprocess(
    value => parseNumericStringArray(value),
    schema ?? z.number().array()
  );
}

export function stringArray<I extends ZodArray<ZodNumber>>(schema?: I) {
  return z.preprocess(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    value => (!Array.isArray(value) ? [value] : value),
    schema ?? z.string().array()
  );
}

/** Converts a comma delimited object (ex key:value,key 2:another value) */
export function commaDelimitedStringObject() {
  return z.preprocess(value => {
    if (typeof value === 'string') {
      const obj: Record<string, string> = {};
      value.split(',').forEach(x => {
        const [key, val] = x.split(':');
        if (!key) return;
        obj[key] = val ?? key;
      });
      return obj;
    }
    return value;
  }, z.record(z.string()));
}

function stringToArray(value: unknown) {
  if (!Array.isArray(value) && typeof value === 'string')
    return value.split(',').map(x => x.trim());
  return ((value ?? []) as unknown[]).map(String);
}

/** Converts a comma delimited string to an array of strings */
export function commaDelimitedStringArray() {
  return z.preprocess(stringToArray, z.array(z.string()));
}

// include=tags,category
export function commaDelimitedEnumArray<T extends [string, ...string[]]>(
  zodEnum: z.ZodEnum<T>
) {
  return z.preprocess(stringToArray, z.array(zodEnum));
}

/** Converts a comma delimited string to an array of numbers */
export function commaDelimitedNumberArray(options?: { message?: string }) {
  return z.preprocess(
    val => stringToArray(val).map(parseNumericString),
    z.array(z.number())
  );
}

// TODO - replace all with z.coerce.date()
export function stringDate() {
  return z.coerce.date().or(z.string());
}

/** Converts the string `true` to a boolean of true and everything else to false */
export function booleanString() {
  return z.preprocess(
    value =>
      typeof value === 'string'
        ? value === 'true'
        : typeof value === 'number'
          ? value === 1
          : typeof value === 'boolean'
            ? value
            : undefined,
    z.boolean()
  );
}
