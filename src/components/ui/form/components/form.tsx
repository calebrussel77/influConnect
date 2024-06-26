/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react';
import {
  type FieldValues,
  FormProvider,
  type Path,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormReturn,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { type z } from 'zod';
import { LoadingOverlay } from '../../loading-overlay';

type FormProps<TFieldValues extends FieldValues> = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  form: UseFormReturn<TFieldValues>;
  children?: React.ReactNode;
  onSubmit?: SubmitHandler<TFieldValues>;
  onError?: SubmitErrorHandler<TFieldValues>;
  loading?: boolean;
};

export function Form<TFieldValues extends FieldValues = FieldValues>({
  id,
  form,
  className,
  style,
  children,
  onSubmit,
  onError,
  loading = false,
}: FormProps<TFieldValues>) {
  const handleError: SubmitErrorHandler<TFieldValues> = (errors, e) => {
    onError?.(errors, e);
    Object.entries(errors).forEach(([key, value]) =>
      console.warn(`${key}: Form validation: ${value?.message}`, { value })
    );
  };

  const handleSubmit = onSubmit
    ? form.handleSubmit(onSubmit, handleError)
    : (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <FormProvider {...form}>
      <form
        id={id}
        onSubmit={handleSubmit}
        className={className}
        style={{ position: 'relative', ...style }}
      >
        <LoadingOverlay visible={loading} />
        {children}
      </form>
    </FormProvider>
  );
}

export function PersistentForm<
  TFieldValues extends FieldValues,
  TSchema extends z.AnyZodObject,
>({
  name,
  storage,
  exclude,
  schema,
  children,
  ...formProps
}: PersistProps<TFieldValues, TSchema> & FormProps<TFieldValues>) {
  return (
    <Form {...formProps}>
      <PersistWrapper
        name={name}
        storage={storage}
        exclude={exclude}
        schema={schema}
      >
        {children}
      </PersistWrapper>
    </Form>
  );
}

type PersistProps<
  TFieldValues extends FieldValues,
  TSchema extends z.AnyZodObject,
> = {
  name: string;
  storage?: Storage;
  exclude?: Path<TFieldValues>[];
  schema?: TSchema;
  children: React.ReactNode;
  shouldValidate?: boolean;
  shouldDirty?: boolean;
  shouldTouch?: boolean;
};

function PersistWrapper<
  TFieldValues extends FieldValues,
  TSchema extends z.AnyZodObject,
>({
  children,
  name,
  storage,
  exclude = [],
  schema,
  shouldValidate,
  shouldDirty,
  shouldTouch,
}: PersistProps<TFieldValues, TSchema>) {
  const [isRestored, setIsRestored] = useState(false);
  const watchedValues = useWatch();
  const { setValue } = useFormContext();

  const getStorage = () =>
    typeof window !== 'undefined'
      ? storage ?? window.sessionStorage
      : undefined;

  const parseStoredData = (values: never) => {
    if (!schema) return values;
    console.log({ values });
    const result = schema.safeParse(values);
    if (!result.success) console.log({ error: result.error });
    return result.success ? result.data : {};
  };

  useEffect(() => {
    const str = getStorage()?.getItem(name);

    if (str) {
      const values = JSON.parse(str) as never;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const toUpdate = Object.keys(values)
        .filter(key => !exclude.includes(key as never))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .reduce((acc, key) => ({ ...acc, [key]: values[key] }), {} as any);

      const parsed = parseStoredData(toUpdate as never);

      Object.keys(parsed).forEach(key => {
        setValue(key as any, parsed[key], {
          shouldValidate,
          shouldDirty,
          shouldTouch,
        });
      });
    }
    setIsRestored(true);
  }, [name]); // eslint-disable-line

  useEffect(() => {
    if (!isRestored) return;
    const values = exclude.length
      ? Object.entries(watchedValues)
          .filter(([key]) => !exclude.includes(key as never))
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})
      : Object.assign({}, watchedValues);

    if (Object.entries(values).length) {
      getStorage()?.setItem(name, JSON.stringify(values));
    }
  }, [watchedValues, isRestored]); //eslint-disable-line

  return <>{children}</>;
}
