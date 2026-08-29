export interface IsoDateParts {
  year: number;
  month: number;
  day: number;
}

const ISO_DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInMonth(year: number, month: number): number {
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month - 1] ?? 0;
}

function readIsoDateParts(value: unknown): IsoDateParts | null {
  if (typeof value !== "string") return null;

  const match = ISO_DATE_ONLY_PATTERN.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (year < 1 || month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
    return null;
  }

  return { year, month, day };
}

function partsToSortableNumber({ year, month, day }: IsoDateParts): number {
  return year * 10_000 + month * 100 + day;
}

function localDateToSortableNumber(date: Date): number | null {
  if (Number.isNaN(date.getTime())) return null;
  return date.getFullYear() * 10_000 + (date.getMonth() + 1) * 100 + date.getDate();
}

function toUtcFormattingDate({ year, month, day }: IsoDateParts): Date {
  const date = new Date(0);
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCFullYear(year, month - 1, day);
  return date;
}

export function isValidIsoDateOnly(value: unknown): value is string {
  return readIsoDateParts(value) !== null;
}

/** Construit la date dans le calendrier local, sans interprétation UTC implicite. */
export function parseIsoDateOnly(value: unknown): Date | null {
  const parts = readIsoDateParts(value);
  if (!parts) return null;

  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setFullYear(parts.year, parts.month - 1, parts.day);
  return date;
}

export function isIsoDatePast(value: unknown, today: Date = new Date()): boolean {
  const parts = readIsoDateParts(value);
  const todayNumber = localDateToSortableNumber(today);

  if (!parts || todayNumber === null) return false;
  return partsToSortableNumber(parts) < todayNumber;
}

export function isIsoDateTodayOrFuture(value: unknown, today: Date = new Date()): boolean {
  const parts = readIsoDateParts(value);
  const todayNumber = localDateToSortableNumber(today);

  if (!parts || todayNumber === null) return false;
  return partsToSortableNumber(parts) >= todayNumber;
}

/** Place les valeurs invalides à la fin d'un tri croissant. */
export function compareIsoDates(left: unknown, right: unknown): number {
  const leftParts = readIsoDateParts(left);
  const rightParts = readIsoDateParts(right);

  if (!leftParts && !rightParts) return 0;
  if (!leftParts) return 1;
  if (!rightParts) return -1;

  return partsToSortableNumber(leftParts) - partsToSortableNumber(rightParts);
}

/** Trie une copie du tableau et préserve l'ordre relatif des dates identiques. */
export function sortByIsoDate<T>(
  values: readonly T[],
  getDate: (value: T) => unknown,
): T[] {
  return values
    .map((value, index) => ({ value, index }))
    .sort((left, right) => {
      const comparison = compareIsoDates(getDate(left.value), getDate(right.value));
      return comparison || left.index - right.index;
    })
    .map(({ value }) => value);
}

export function formatIsoDate(
  value: unknown,
  locale: string = "fr-FR",
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_FORMAT,
): string | null {
  const parts = readIsoDateParts(value);
  if (!parts) return null;

  try {
    return new Intl.DateTimeFormat(locale, { ...options, timeZone: "UTC" }).format(
      toUtcFormattingDate(parts),
    );
  } catch {
    return null;
  }
}
