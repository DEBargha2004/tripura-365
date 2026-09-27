import {
  DateOrDateArray,
  EventCountdown,
  EventStage,
  EventStatus,
  EventYearSchedule,
} from "./event";

export * from "./event";

export type DurgaPujaStage = EventStage;
export type DurgaPujaCountdown = EventCountdown;
export type DurgaPujaStatus = EventStatus;

export interface DurgaPujaYearSchedule extends EventYearSchedule {
  year: number;
  mahalaya?: DateOrDateArray;
  panchami: DateOrDateArray;
  shashthi?: DateOrDateArray;
  saptami?: DateOrDateArray;
  ashtami?: DateOrDateArray;
  navami?: DateOrDateArray;
  dashami: DateOrDateArray;
}
