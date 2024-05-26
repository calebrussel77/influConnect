import { env } from '@/env';
import { isArray } from '@/utils/type-guards';
import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import {
  type JSXElementConstructor,
  type ReactElement,
  type ReactNode,
} from 'react';

const shouldConnect =
  env.EMAIL_HOST &&
  env.EMAIL_PORT &&
  env.EMAIL_USER &&
  env.EMAIL_PASS &&
  env.EMAIL_FROM;

const client = shouldConnect
  ? nodemailer.createTransport({
      service: 'gmail',
      host: env.EMAIL_HOST,
      port: Number(env.EMAIL_PORT),
      secure: env.EMAIL_SECURE,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    })
  : null;

export async function sendEmail({
  to,
  from,
  component,
  ...data
}: {
  to: string | string[] | null;
  from?: string;
  subject: string;
  component: ReactElement<any, string | JSXElementConstructor<any>>;
}) {
  if (!client || !to) return;
  const info = await client.sendMail({
    to: isArray(to) ? to.join(', ') : to,
    from: from ?? env.EMAIL_FROM,
    html: render(component),
    ...data,
  });
  const failed = info.rejected.filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
  }
}
