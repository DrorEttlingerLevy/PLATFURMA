import { Activity, Mom, BoardState } from "@/app/types";

export const SEED_ACTIVITIES: Activity[] = [
  {
    id: "ACT-1",
    name: "Baby Development Milestones",
    description: "Guided sessions covering motor skills, sensory play, and developmental checkpoints.",
    ageRangeMonths: { min: 0, max: 3 },
    startDate: "01052026",
    isOneTime: false,
    sessionsPerWeek: 1,
    totalWeeks: 8,
  },
  {
    id: "ACT-2",
    name: "Sensory Exploration Workshop",
    description: "Hands-on activities stimulating touch, sight, and sound for growing babies.",
    ageRangeMonths: { min: 3, max: 6 },
    startDate: "05052026",
    isOneTime: false,
    sessionsPerWeek: 1,
    totalWeeks: 6,
  },
  {
    id: "ACT-3",
    name: "Baby Swimming & Water Play",
    description: "Gentle water introduction to build confidence and coordination.",
    ageRangeMonths: { min: 4, max: 12 },
    startDate: "10052026",
    isOneTime: false,
    sessionsPerWeek: 2,
    totalWeeks: 10,
  },
  {
    id: "ACT-4",
    name: "Mommy & Baby Yoga",
    description: "Postpartum yoga combining relaxation for moms and gentle stretching for babies.",
    ageRangeMonths: { min: 6, max: 18 },
    startDate: "03052026",
    isOneTime: false,
    sessionsPerWeek: 1,
    totalWeeks: 12,
  },
  {
    id: "ACT-5",
    name: "Toddler Music & Movement",
    description: "Rhythm, song, and movement to support language development and social skills.",
    ageRangeMonths: { min: 12, max: 24 },
    startDate: "15052026",
    isOneTime: false,
    sessionsPerWeek: 1,
    totalWeeks: 8,
  },
];

export const SEED_MOMS: Mom[] = [
  { id: "MOM-01", name: "Noa Cohen",       phone: "+972-52-111-2001", email: "noa.cohen@example.com",      babyName: "Liam",      babyAgeMonths: 2   },
  { id: "MOM-02", name: "Tamar Levi",      phone: "+972-54-222-3002", email: "tamar.levi@example.com",     babyName: "Maya",      babyAgeMonths: 5   },
  { id: "MOM-03", name: "Shira Mizrahi",   phone: "+972-50-333-4003", email: "shira.mizrahi@example.com",  babyName: "Ethan",     babyAgeMonths: 8   },
  { id: "MOM-04", name: "Michal Peretz",   phone: "+972-52-444-5004", email: "michal.peretz@example.com",  babyName: "Sophia",    babyAgeMonths: 14  },
  { id: "MOM-05", name: "Yael Shapiro",    phone: "+972-54-555-6005", email: "yael.shapiro@example.com",   babyName: "Noah",      babyAgeMonths: 18  },
  { id: "MOM-06", name: "Rina Katz",       phone: "+972-50-666-7006", email: "rina.katz@example.com",      babyName: "Ava",       babyAgeMonths: 0.5 },
  { id: "MOM-07", name: "Dana Ben-David",  phone: "+972-52-777-8007", email: "dana.bendavid@example.com",  babyName: "Oliver",    babyAgeMonths: 4   },
  { id: "MOM-08", name: "Hila Friedman",   phone: "+972-54-888-9008", email: "hila.friedman@example.com",  babyName: "Emma",      babyAgeMonths: 7   },
  { id: "MOM-09", name: "Galit Weiss",     phone: "+972-50-999-0009", email: "galit.weiss@example.com",    babyName: "Aiden",     babyAgeMonths: 11  },
  { id: "MOM-10", name: "Sivan Azoulay",   phone: "+972-52-101-1010", email: "sivan.azoulay@example.com",  babyName: "Isabella",  babyAgeMonths: 16  },
  { id: "MOM-11", name: "Orly Goldstein",  phone: "+972-54-111-1111", email: "orly.goldstein@example.com", babyName: "Lucas",     babyAgeMonths: 3   },
  { id: "MOM-12", name: "Miri Biton",      phone: "+972-50-122-1212", email: "miri.biton@example.com",     babyName: "Mia",       babyAgeMonths: 6   },
  { id: "MOM-13", name: "Liron Avraham",   phone: "+972-52-133-1313", email: "liron.avraham@example.com",  babyName: "James",     babyAgeMonths: 9   },
  { id: "MOM-14", name: "Keren Nachum",    phone: "+972-54-144-1414", email: "keren.nachum@example.com",   babyName: "Charlotte", babyAgeMonths: 13  },
  { id: "MOM-15", name: "Tali Ohayon",     phone: "+972-50-155-1515", email: "tali.ohayon@example.com",    babyName: "Benjamin",  babyAgeMonths: 20  },
  { id: "MOM-16", name: "Ayelet Tzur",     phone: "+972-52-166-1616", email: "ayelet.tzur@example.com",    babyName: "Amelia",    babyAgeMonths: 2   },
  { id: "MOM-17", name: "Nirit Halevi",    phone: "+972-54-177-1717", email: "nirit.halevi@example.com",   babyName: "Elijah",    babyAgeMonths: 5   },
  { id: "MOM-18", name: "Sigal Manor",     phone: "+972-50-188-1818", email: "sigal.manor@example.com",    babyName: "Harper",    babyAgeMonths: 10  },
  { id: "MOM-19", name: "Revital Dayan",   phone: "+972-52-199-1919", email: "revital.dayan@example.com",  babyName: "Mason",     babyAgeMonths: 15  },
  { id: "MOM-20", name: "Einat Stern",     phone: "+972-54-200-2020", email: "einat.stern@example.com",    babyName: "Evelyn",    babyAgeMonths: 22  },
];

const SEED_ENROLLMENTS: Array<{ momId: string; activityId: string }> = [
  { momId: "MOM-01", activityId: "ACT-1" },
  { momId: "MOM-02", activityId: "ACT-2" },
  { momId: "MOM-02", activityId: "ACT-3" },
  { momId: "MOM-03", activityId: "ACT-3" },
  { momId: "MOM-03", activityId: "ACT-4" },
  { momId: "MOM-04", activityId: "ACT-4" },
  { momId: "MOM-04", activityId: "ACT-5" },
  { momId: "MOM-05", activityId: "ACT-4" },
  { momId: "MOM-05", activityId: "ACT-5" },
  { momId: "MOM-06", activityId: "ACT-1" },
  { momId: "MOM-07", activityId: "ACT-2" },
  { momId: "MOM-07", activityId: "ACT-3" },
  { momId: "MOM-08", activityId: "ACT-3" },
  { momId: "MOM-08", activityId: "ACT-4" },
  { momId: "MOM-09", activityId: "ACT-3" },
  { momId: "MOM-09", activityId: "ACT-4" },
  { momId: "MOM-10", activityId: "ACT-4" },
  { momId: "MOM-10", activityId: "ACT-5" },
  { momId: "MOM-11", activityId: "ACT-1" },
  { momId: "MOM-11", activityId: "ACT-2" },
  { momId: "MOM-12", activityId: "ACT-2" },
  { momId: "MOM-12", activityId: "ACT-4" },
  { momId: "MOM-13", activityId: "ACT-3" },
  { momId: "MOM-13", activityId: "ACT-4" },
  { momId: "MOM-14", activityId: "ACT-4" },
  { momId: "MOM-14", activityId: "ACT-5" },
  { momId: "MOM-15", activityId: "ACT-5" },
  { momId: "MOM-16", activityId: "ACT-1" },
  { momId: "MOM-17", activityId: "ACT-2" },
  { momId: "MOM-17", activityId: "ACT-3" },
  { momId: "MOM-18", activityId: "ACT-3" },
  { momId: "MOM-18", activityId: "ACT-4" },
  { momId: "MOM-19", activityId: "ACT-4" },
  { momId: "MOM-19", activityId: "ACT-5" },
  { momId: "MOM-20", activityId: "ACT-5" },
];

export function buildInitialBoardState(): BoardState {
  const enrollments: Record<string, string[]> = {};
  for (const act of SEED_ACTIVITIES) {
    enrollments[act.id] = [];
  }
  for (const e of SEED_ENROLLMENTS) {
    if (!enrollments[e.activityId]) enrollments[e.activityId] = [];
    if (!enrollments[e.activityId].includes(e.momId)) {
      enrollments[e.activityId].push(e.momId);
    }
  }
  return { activities: SEED_ACTIVITIES, moms: SEED_MOMS, enrollments };
}
