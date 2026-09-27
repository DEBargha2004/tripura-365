import { DurgaPujaYearSchedule, EventConfig } from "@/types/durga-puja";

/**
 * Durga Puja calendar schedules for consecutive years according to Bengali Panjika.
 * Dates are represented in YYYY-MM-DD.
 */
export const DURGA_PUJA_SCHEDULES: DurgaPujaYearSchedule[] = [
  {
    year: 2026,
    mahalaya: "2026-10-10",
    panchami: "2026-10-15",
    shashthi: "2026-10-16",
    saptami: "2026-10-17",
    ashtami: "2026-10-18",
    navami: "2026-10-19",
    dashami: ["2026-10-20", "2026-10-21"],
  },
  // {
  //   year: 2027,
  //   mahalaya: "2027-09-29",
  //   panchami: "2027-10-05",
  //   shashthi: "2027-10-06",
  //   saptami: "2027-10-07",
  //   ashtami: "2027-10-08",
  //   navami: "2027-10-09",
  //   dashami: "2027-10-10",
  // },
  // {
  //   year: 2028,
  //   mahalaya: "2028-09-18",
  //   panchami: "2028-09-24",
  //   shashthi: "2028-09-25",
  //   saptami: "2028-09-26",
  //   ashtami: "2028-09-27",
  //   navami: "2028-09-28",
  //   dashami: "2028-09-29",
  // },
  // {
  //   year: 2029,
  //   mahalaya: "2029-10-07",
  //   panchami: "2029-10-13",
  //   shashthi: "2029-10-14",
  //   saptami: "2029-10-15",
  //   ashtami: "2029-10-16",
  //   navami: "2029-10-17",
  //   dashami: "2029-10-18",
  // },
  // {
  //   year: 2030,
  //   mahalaya: "2030-09-26",
  //   panchami: "2030-10-02",
  //   shashthi: "2030-10-03",
  //   saptami: "2030-10-04",
  //   ashtami: "2030-10-05",
  //   navami: "2030-10-06",
  //   dashami: "2030-10-07",
  // },
];

export const DURGA_PUJA_CONFIG = {
  defaultImagePath: "/images/durga-stock.webp",
  imageAlt: "মা দুর্গা প্রতিমা",
  festivalGreetingSubtitle: "সার্বজনীন শারদোৎসবের আন্তরিক প্রীতি ও শুভেচ্ছা",
  mahalayaGreetingSubtitle: "দেবীপক্ষের পুণ্য সূচনায় সকলকে জানাই শুভ মহালয়ার আন্তরিক প্রীতি ও শুভেচ্ছা",
  bijoyaGreetingSubtitle: "সকলকে জানাই শুভ বিজয়ার আন্তরিক প্রীতি, শুভেচ্ছা ও অভিনন্দন",
  countdownSubtitle: "মা আসছেন ধরণীতে, ঢাকের কাঠি বাজলো বলে...",
  mantraShort: "॥ যা দেবী সর্বভূতেষু মাতৃরূপেণ সংস্থিতা নমস্তস্যৈ নমস্তস্যৈ নমস্তস্যৈ নমো নমঃ ॥",
  labels: {
    daysRemainingSuffix: "বাকি",
    daysToGo: "দিন বাকি",
    days: "দিন",
    hours: "ঘণ্টা",
    minutes: "মিনিট",
    seconds: "সেকেন্ড",
    closeBanner: "ব্যানার বন্ধ করুন",
    openBanner: "শারদোৎসব",
    durgaPuja: "দুর্গাপূজা",
    sharadUtsav: "শারদোৎসব",
  },
  days: {
    mahalaya: {
      title: "শুভ মহালয়া",
      name: "পবিত্র মহালয়া",
    },
    panchami: {
      title: "শুভ পঞ্চমী",
      name: "মহা পঞ্চমী",
    },
    shashthi: {
      title: "শুভ মহাষষ্ঠী",
      name: "মহা ষষ্ঠী",
    },
    saptami: {
      title: "শুভ মহাসপ্তমী",
      name: "মহা সপ্তমী",
    },
    ashtami: {
      title: "শুভ মহাঅষ্টমী",
      name: "মহা অষ্টমী",
    },
    navami: {
      title: "শুভ মহানবমী",
      name: "মহা নবমী",
    },
    dashami: {
      title: "শুভ বিজয়া দশমী",
      name: "বিজয়া দশমী",
    },
    bijoya: {
      title: "শুভ বিজয়া",
      name: "বিজয়া দশমী পরবর্তী শুভেচ্ছা",
    },
  },
} as const;

export const BENGALI_DIGITS: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

/**
 * Event-agnostic configuration object for Durga Puja.
 */
export const DURGA_PUJA_EVENT: EventConfig<DurgaPujaYearSchedule> = {
  id: "durga-puja",
  name: "দুর্গাপূজা",
  defaultImagePath: DURGA_PUJA_CONFIG.defaultImagePath,
  imageAlt: DURGA_PUJA_CONFIG.imageAlt,
  countdownSubtitle: DURGA_PUJA_CONFIG.countdownSubtitle,
  festivalGreetingSubtitle: DURGA_PUJA_CONFIG.festivalGreetingSubtitle,
  countdownTargetKey: "panchami",
  eventEndKey: "dashami",
  schedules: DURGA_PUJA_SCHEDULES,
  days: [
    {
      key: "mahalaya",
      name: DURGA_PUJA_CONFIG.days.mahalaya.name,
      title: DURGA_PUJA_CONFIG.days.mahalaya.title,
      subtitle: DURGA_PUJA_CONFIG.mahalayaGreetingSubtitle,
    },
    {
      key: "panchami",
      name: DURGA_PUJA_CONFIG.days.panchami.name,
      title: DURGA_PUJA_CONFIG.days.panchami.title,
    },
    {
      key: "shashthi",
      name: DURGA_PUJA_CONFIG.days.shashthi.name,
      title: DURGA_PUJA_CONFIG.days.shashthi.title,
    },
    {
      key: "saptami",
      name: DURGA_PUJA_CONFIG.days.saptami.name,
      title: DURGA_PUJA_CONFIG.days.saptami.title,
    },
    {
      key: "ashtami",
      name: DURGA_PUJA_CONFIG.days.ashtami.name,
      title: DURGA_PUJA_CONFIG.days.ashtami.title,
    },
    {
      key: "navami",
      name: DURGA_PUJA_CONFIG.days.navami.name,
      title: DURGA_PUJA_CONFIG.days.navami.title,
    },
    {
      key: "dashami",
      name: DURGA_PUJA_CONFIG.days.dashami.name,
      title: DURGA_PUJA_CONFIG.days.dashami.title,
      subtitle: DURGA_PUJA_CONFIG.bijoyaGreetingSubtitle,
    },
  ],
  formatCountdownTitle: (bengaliDays) => `দুর্গাপূজা আসতে আর মাত্র ${bengaliDays} দিন`,
};

