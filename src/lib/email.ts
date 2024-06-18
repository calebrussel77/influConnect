import { env } from '@/env';
import { isArray } from '@/utils/type-guards';
import { type JSXElementConstructor, type ReactElement } from 'react';
import { Resend } from 'resend';

const shouldConnect =
  env.EMAIL_HOST &&
  env.EMAIL_PORT &&
  env.EMAIL_USER &&
  env.EMAIL_PASS &&
  env.EMAIL_FROM;

const client = shouldConnect ? new Resend(env.RESEND_API_KEY) : null;

export async function sendEmail({
  to,
  from,
  component,
  ...rest
}: {
  to: string | string[] | null;
  from?: string;
  subject: string;
  component: ReactElement<any, string | JSXElementConstructor<any>>;
}) {
  if (!client || !to) return;

  const toEmails = isArray(to) ? to.join(', ') : to;

  const { error } = await client.emails.send({
    to: toEmails,
    from: from ?? env.EMAIL_FROM,
    react: component,
    ...rest,
  });
  if (error) {
    throw new Error(`Email(s) to (${toEmails}) could not be sent`);
  }
}
