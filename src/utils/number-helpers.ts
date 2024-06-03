/**
 * @see https://gist.github.com/zentala/1e6f72438796d74531803cc3833c039c
 * @returns The file size in human-readable format
 */
export const KB = 1024;

export function bytesToKB(bytes: number): number {
  return bytes / KB;
}

export const formatKBytes = (kb: number, decimals = 2) =>
  formatBytes(kb * KB, decimals);

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes <= 0) return '0 Bytes';

  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(KB));

  return (
    parseFloat((bytes / Math.pow(KB, i)).toFixed(decimals)) + ' ' + sizes[i]
  );
}

export function formatToLeastDecimals(value: number, decimals = 2) {
  return parseFloat(value.toFixed(decimals));
}

export function formatSeconds(totalSeconds: number) {
  if (totalSeconds === 0) return '0 seconds';

  const units = [
    { name: 'year', limit: 31536000 },
    { name: 'month', limit: 2592000 },
    { name: 'week', limit: 604800 },
    { name: 'day', limit: 86400 },
    { name: 'hour', limit: 3600 },
    { name: 'minute', limit: 60 },
    { name: 'second', limit: 1 },
  ];

  let output = '';
  let unit: (typeof units)[number];
  let count: number;

  for (const unit of units) {
    count = Math.floor(totalSeconds / unit.limit);
    if (count >= 1) {
      output += ` ${count} ${unit.name}${count > 1 ? 's' : ''}`;
      totalSeconds %= unit.limit;
    }
  }

  return output.trim();
}

export function abbreviateNumber(
  value: number,
  opts?: { decimals?: number; isFloor?: boolean }
): string {
  if (!value) return '0';

  const { decimals, isFloor } = opts ?? { decimals: 1 };
  const suffixes = ['', 'k', 'm', 'b', 't'];
  let index = 0;

  while (value >= 1000 && index < suffixes.length - 1) {
    value /= 1000;
    index++;
  }

  if (isFloor) {
    value = Math.floor(value);
  }

  const formattedValue = value.toFixed(value < 10 && index > 0 ? decimals : 0);

  return `${formattedValue}${suffixes[index]}`;
}

export function getRandomInt(min: number, max: number) {
  const intMin = Math.ceil(min);
  const intMax = Math.floor(max);
  return Math.floor(Math.random() * (intMax - intMin + 1)) + intMin;
}

export function numberWithCommas(value: number | string | undefined) {
  return value != null &&
    !Number.isNaN(typeof value === 'string' ? parseFloat(value) : value)
    ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '';
}

export function isNumeric(value?: unknown) {
  return !isNaN(Number(value));
}

export const findClosest = (array: number[], target: number) => {
  return array.reduce((a, b) => {
    return Math.abs(b - target) < Math.abs(a - target) ? b : a;
  });
};
