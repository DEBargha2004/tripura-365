export type DateOrDateArray = string | string[];

export type EventStage = "COUNTDOWN" | "PASSED" | string;

export interface EventDayConfig {
  key: string;
  name?: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
}

export interface EventYearSchedule {
  year: number;
  [dayKey: string]: number | DateOrDateArray | undefined;
}

export interface EventCountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export interface EventStatus {
  stage: EventStage;
  title: string;
  subtitle: string;
  badgeText: string;
  isFestivalActive: boolean;
  festivalDayName?: string;
  countdown: EventCountdown;
  targetDate: Date;
  year: number;
}

export interface EventConfig<TSchedule extends EventYearSchedule = EventYearSchedule> {
  id: string;
  name: string;
  defaultImagePath?: string;
  imageAlt?: string;
  countdownSubtitle?: string;
  festivalGreetingSubtitle?: string;
  countdownTargetKey: string;
  eventEndKey: string;
  days: EventDayConfig[];
  schedules: TSchedule[];
  formatCountdownTitle?: (daysBengali: string, daysNumber: number) => string;
}
