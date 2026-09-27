import {
  BENGALI_DIGITS,
  DURGA_PUJA_CONFIG,
  DURGA_PUJA_EVENT,
  DURGA_PUJA_SCHEDULES,
} from "@/constants/durga-puja";
import {
  DateOrDateArray,
  DurgaPujaCountdown,
  DurgaPujaStatus,
  DurgaPujaYearSchedule,
  EventConfig,
  EventCountdown,
  EventStatus,
  EventYearSchedule,
} from "@/types/durga-puja";

/**
 * Checks if a given date string matches a single date or any date in a date array.
 */
export function isDateMatch(dateOrArray: DateOrDateArray, dateStr: string): boolean {
  if (Array.isArray(dateOrArray)) {
    return dateOrArray.includes(dateStr);
  }
  return dateOrArray === dateStr;
}

/**
 * Gets the first date from a date or date array.
 */
export function getFirstDate(dateOrArray: DateOrDateArray): string {
  if (Array.isArray(dateOrArray)) {
    return dateOrArray[0];
  }
  return dateOrArray;
}

/**
 * Gets the last date from a date or date array.
 */
export function getLastDate(dateOrArray: DateOrDateArray): string {
  if (Array.isArray(dateOrArray)) {
    return dateOrArray[dateOrArray.length - 1];
  }
  return dateOrArray;
}

/**
 * Converts English Hindu-Arabic numerals (0-9) to Bengali numerals (০-৯).
 */
export function toBengaliNumber(value: number | string): string {
  const str = String(value);
  return str
    .split("")
    .map((char) => BENGALI_DIGITS[char] ?? char)
    .join("");
}

/**
 * Formats a single number with zero-padding (e.g. 5 -> '০৫').
 */
export function toPaddedBengaliNumber(value: number, padLength = 2): string {
  const padded = String(Math.max(0, value)).padStart(padLength, "0");
  return toBengaliNumber(padded);
}

/**
 * Parses date string in YYYY-MM-DD format as an IST Date object starting at midnight (00:00:00.000+05:30).
 */
export function parseIstDate(dateString: string): Date {
  return new Date(`${dateString}T00:00:00+05:30`);
}

/**
 * Normalizes any Date or date string to an IST-aware Date object.
 * If a date string like '2026-10-14' or a Date initialized as new Date('2026-10-14')
 * (which defaults to UTC midnight) is provided, it is normalized to IST midnight (00:00:00+05:30)
 * so that a full 24 hours remain until the next day.
 */
export function normalizeToIstDate(input: Date | string = new Date()): Date {
  if (typeof input === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      return parseIstDate(input);
    }
    if (!input.includes("Z") && !input.includes("+") && !input.includes("-", 10)) {
      return new Date(`${input}+05:30`);
    }
    return new Date(input);
  }

  if (input instanceof Date) {
    // If the Date was created with UTC midnight (e.g. new Date('2026-10-14')),
    // adjust it to IST midnight on that same calendar day
    if (
      input.getUTCHours() === 0 &&
      input.getUTCMinutes() === 0 &&
      input.getUTCSeconds() === 0 &&
      input.getUTCMilliseconds() === 0
    ) {
      const year = input.getUTCFullYear();
      const month = String(input.getUTCMonth() + 1).padStart(2, "0");
      const day = String(input.getUTCDate()).padStart(2, "0");
      return parseIstDate(`${year}-${month}-${day}`);
    }
    return input;
  }

  return new Date();
}

/**
 * Returns the current date formatted as YYYY-MM-DD in Asia/Kolkata timezone.
 */
export function getIstDateString(date: Date = new Date()): string {
  return date.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

/**
 * Calculates remaining calendar days between two YYYY-MM-DD dates in IST.
 */
export function getCalendarDaysRemaining(targetDateStr: string, currentDateStr: string): number {
  const [tY, tM, tD] = targetDateStr.split("-").map(Number);
  const [cY, cM, cD] = currentDateStr.split("-").map(Number);
  const targetUtc = Date.UTC(tY, tM - 1, tD);
  const currentUtc = Date.UTC(cY, cM - 1, cD);
  return Math.max(0, Math.round((targetUtc - currentUtc) / (1000 * 60 * 60 * 24)));
}

/**
 * Calculates countdown breakdown between target time and current time in IST.
 */
export function calculateCountdown(
  target: Date,
  current: Date = new Date(),
): EventCountdown {
  const diffMs = target.getTime() - current.getTime();
  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
  };
}

/**
 * Finds the appropriate schedule for the given reference date from any schedule list.
 * Supports overloaded arguments for both generic schedules and legacy Durga Puja usage.
 */
export function getScheduleForDate<T extends EventYearSchedule = DurgaPujaYearSchedule>(
  schedulesOrDate: T[] | Date,
  dateOrEventEndKey?: Date | string,
  eventEndKeyParam?: string,
): {
  currentSchedule: T;
  nextSchedule?: T;
} {
  let schedules: T[];
  let referenceDate: Date;
  let endKey: string | undefined;

  if (Array.isArray(schedulesOrDate)) {
    schedules = schedulesOrDate;
    referenceDate = (dateOrEventEndKey as Date) || new Date();
    endKey = eventEndKeyParam;
  } else {
    schedules = DURGA_PUJA_SCHEDULES as unknown as T[];
    referenceDate = schedulesOrDate || new Date();
    endKey = typeof dateOrEventEndKey === "string" ? dateOrEventEndKey : "dashami";
  }

  const istDateStr = getIstDateString(referenceDate);
  const currentYear = Number(istDateStr.split("-")[0]);

  let schedule = schedules.find((s) => s.year === currentYear);

  if (!schedule) {
    schedule =
      schedules.find((s) => s.year > currentYear) ||
      schedules[schedules.length - 1];
  }

  if (endKey && schedule[endKey]) {
    const eventEndDate = getLastDate(schedule[endKey] as DateOrDateArray);
    const eventEndDateTime = parseIstDate(eventEndDate);
    const postEventCutoff = new Date(eventEndDateTime.getTime() + 10 * 24 * 3600 * 1000);

    if (referenceDate > postEventCutoff) {
      const next = schedules.find((s) => s.year === currentYear + 1);
      if (next) {
        return { currentSchedule: next };
      }
    }
  }

  const nextSchedule = schedules.find((s) => s.year === schedule.year + 1);
  return { currentSchedule: schedule, nextSchedule };
}

/**
 * Event-agnostic engine that evaluates the status of any festival or event config based on date.
 */
export function getEventStatus<T extends EventYearSchedule = EventYearSchedule>(
  event: EventConfig<T>,
  currentDate: Date | string = new Date(),
  overrideDateString?: string,
): EventStatus {
  const effectiveDate = overrideDateString
    ? parseIstDate(overrideDateString)
    : normalizeToIstDate(currentDate);

  const todayStr = overrideDateString || getIstDateString(effectiveDate);
  const { currentSchedule } = getScheduleForDate(event.schedules, effectiveDate, event.eventEndKey);

  const eventStartScheduleVal = currentSchedule[event.countdownTargetKey] as DateOrDateArray;
  const eventEndScheduleVal = currentSchedule[event.eventEndKey] as DateOrDateArray;

  const eventStartDate = getFirstDate(eventStartScheduleVal);
  const eventEndDate = getLastDate(eventEndScheduleVal);
  const eventEndDateTime = parseIstDate(eventEndDate);

  // 1. Day-by-day active event checks (e.g. Mahalaya, Panchami to Dashami)
  for (const day of event.days) {
    const dayDates = currentSchedule[day.key] as DateOrDateArray | undefined;
    if (dayDates && isDateMatch(dayDates, todayStr)) {
      return {
        stage: day.key.toUpperCase(),
        title: day.title,
        subtitle: day.subtitle || event.festivalGreetingSubtitle || "",
        badgeText: day.name || day.title,
        festivalDayName: day.name,
        isFestivalActive: true,
        countdown: { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 },
        targetDate: parseIstDate(getFirstDate(dayDates)),
        year: currentSchedule.year,
      };
    }
  }

  // 2. After event end: Automatically hide banner once the last date has concluded
  if (todayStr > eventEndDate) {
    return {
      stage: "PASSED",
      title: "",
      subtitle: "",
      badgeText: "",
      isFestivalActive: false,
      countdown: { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 },
      targetDate: eventEndDateTime,
      year: currentSchedule.year,
    };
  }

  // 3. Countdown period before main event starts
  const targetEventDate = parseIstDate(eventStartDate);
  const countdown = calculateCountdown(
    targetEventDate,
    effectiveDate,
  );

  const calendarDays = getCalendarDaysRemaining(eventStartDate, todayStr);
  const bengaliDays = toBengaliNumber(calendarDays);

  const title = event.formatCountdownTitle
    ? event.formatCountdownTitle(bengaliDays, calendarDays)
    : `পূজোর প্রতীক্ষার ${bengaliDays} দিন`;

  return {
    stage: "COUNTDOWN",
    title,
    subtitle: event.countdownSubtitle || "",
    badgeText: `${bengaliDays} দিন বাকি`,
    isFestivalActive: false,
    countdown,
    targetDate: targetEventDate,
    year: currentSchedule.year,
  };
}

/**
 * Evaluates Durga Puja status by delegating to the event-agnostic engine.
 */
export function getDurgaPujaStatus(
  currentDate: Date | string = new Date(),
  overrideDateString?: string,
): EventStatus {
  return getEventStatus(DURGA_PUJA_EVENT, currentDate, overrideDateString);
}

