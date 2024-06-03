/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { isDev } from '@/constants';
import chalk from 'chalk';
import { env } from '@/env';
import { db } from '../db';

export async function logToDb(event: string, details: object) {
  if (isDev) return; // Don't log in dev
  try {
    await db.log.createMany({
      data: {
        event,
        details,
      },
    });
  } catch (e) {
    console.error('Failed to log', e);
  }
}

type ChalkColor =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright';

export function createLogger(name: string, color: ChalkColor = 'green') {
  const shouldLog = (env.LOGGING ?? []).includes(name);
  if (!shouldLog) return () => {}; //eslint-disable-line

  return (...args: any[]) => {
    //eslint-disable-line
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    console.log(chalk[color](name), ...args);
  };
}
