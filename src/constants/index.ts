import { env } from '@/env';

export const SOCKET_API_BASE_URL = '/api/socket';
export const USER_PROFILES_LIMIT_COUNT = 2;
export const SOCKET_IO_PATH = `${SOCKET_API_BASE_URL}/io`;

// Server Env
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

// Client Env
export const APP_URL = env.NEXT_PUBLIC_APP_URL;
export const APP_NAME = env.NEXT_PUBLIC_APP_NAME || 'Influconnect.com';
