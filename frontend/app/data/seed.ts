import { Activity, Mom, BoardState } from "@/app/types";

export const SEED_ACTIVITIES: Activity[] = [
  {
    id: "ACT-1",
    name: "אבני דרך בהתפתחות התינוק",
    description: "מפגשים מודרכים המשלבים מיומנות מוטוריות, משחק חושי ונקודות ביקורת התפתחותיות.",
    ageRangeMonths: { min: 0, max: 3 },
    startDate: "01052026",
    isOneTime: false,
    sessionsPerWeek: 1,
    totalWeeks: 8,
  },
  {
    id: "ACT-2",
    name: "סדנת חקר חושים",
    description: "פעילויות מעשיות המעוררות מגע, ראייה ושמיעה לתינוקות צומחים.",
    ageRangeMonths: { min: 3, max: 6 },
    startDate: "05052026",
    isOneTime: false,
    sessionsPerWeek: 1,
    totalWeeks: 6,
  },
  {
    id: "ACT-3",
    name: "שחיית תינוקות ומשחק במים",
    description: "היכרות עדינה עם המים לבניית ביטחון ותיאום תנועה.",
    ageRangeMonths: { min: 4, max: 12 },
    startDate: "10052026",
    isOneTime: false,
    sessionsPerWeek: 2,
    totalWeeks: 10,
  },
  {
    id: "ACT-4",
    name: "יוגה לאם ולתינוק",
    description: "יוגה לאחר לידה המשלבת הרפיה לאמהות ומתיחות עדינות לתינוקות.",
    ageRangeMonths: { min: 6, max: 18 },
    startDate: "03052026",
    isOneTime: false,
    sessionsPerWeek: 1,
    totalWeeks: 12,
  },
  {
    id: "ACT-5",
    name: "מוזיקה ותנועה לפעוטות",
    description: "קצב, שיר ותנועה לתמיכה בשפה ובמיומנויות חברתיות.",
    ageRangeMonths: { min: 12, max: 24 },
    startDate: "15052026",
    isOneTime: false,
    sessionsPerWeek: 1,
    totalWeeks: 8,
  },
];

export const SEED_MOMS: Mom[] = [
  { id: "MOM-01", name: "נועה כהן", phone: "+972-52-111-2001", email: "noa.cohen@example.com", babyName: "אליה", babyAgeMonths: 2 },
  { id: "MOM-02", name: "תמר לוי", phone: "+972-54-222-3002", email: "tamar.levi@example.com", babyName: "מאיה", babyAgeMonths: 5 },
  { id: "MOM-03", name: "שירה מזרחי", phone: "+972-50-333-4003", email: "shira.mizrahi@example.com", babyName: "איתן", babyAgeMonths: 8 },
  { id: "MOM-04", name: "מיכל פרץ", phone: "+972-52-444-5004", email: "michal.peretz@example.com", babyName: "סופיה", babyAgeMonths: 14 },
  { id: "MOM-05", name: "יעל שפירא", phone: "+972-54-555-6005", email: "yael.shapiro@example.com", babyName: "נח", babyAgeMonths: 18 },
  { id: "MOM-06", name: "רינה כץ", phone: "+972-50-666-7006", email: "rina.katz@example.com", babyName: "אוה", babyAgeMonths: 0.5 },
  { id: "MOM-07", name: "דנה בן-דוד", phone: "+972-52-777-8007", email: "dana.bendavid@example.com", babyName: "עומר", babyAgeMonths: 4 },
  { id: "MOM-08", name: "הילה פרידמן", phone: "+972-54-888-9008", email: "hila.friedman@example.com", babyName: "אמה", babyAgeMonths: 7 },
  { id: "MOM-09", name: "גלית וייס", phone: "+972-50-999-0009", email: "galit.weiss@example.com", babyName: "איידן", babyAgeMonths: 11 },
  { id: "MOM-10", name: "סיון אזולאי", phone: "+972-52-101-1010", email: "sivan.azoulay@example.com", babyName: "איזבלה", babyAgeMonths: 16 },
  { id: "MOM-11", name: "אורלי גולדשטיין", phone: "+972-54-111-1111", email: "orly.goldstein@example.com", babyName: "לוקאס", babyAgeMonths: 3 },
  { id: "MOM-12", name: "מירי ביטון", phone: "+972-50-122-1212", email: "miri.biton@example.com", babyName: "מיה", babyAgeMonths: 6 },
  { id: "MOM-13", name: "לירון אברהם", phone: "+972-52-133-1313", email: "liron.avraham@example.com", babyName: "יונתן", babyAgeMonths: 9 },
  { id: "MOM-14", name: "קרן נחום", phone: "+972-54-144-1414", email: "keren.nachum@example.com", babyName: "שרה", babyAgeMonths: 13 },
  { id: "MOM-15", name: "טלי אוחיון", phone: "+972-50-155-1515", email: "tali.ohayon@example.com", babyName: "בנימין", babyAgeMonths: 20 },
  { id: "MOM-16", name: "איילת צור", phone: "+972-52-166-1616", email: "ayelet.tzur@example.com", babyName: "עמית", babyAgeMonths: 2 },
  { id: "MOM-17", name: "נירית הלוי", phone: "+972-54-177-1717", email: "nirit.halevi@example.com", babyName: "אליהו", babyAgeMonths: 5 },
  { id: "MOM-18", name: "סיגל מנור", phone: "+972-50-188-1818", email: "sigal.manor@example.com", babyName: "רומי", babyAgeMonths: 10 },
  { id: "MOM-19", name: "רויטל דיין", phone: "+972-52-199-1919", email: "revital.dayan@example.com", babyName: "מאור", babyAgeMonths: 15 },
  { id: "MOM-20", name: "עינת שטרן", phone: "+972-54-200-2020", email: "einat.stern@example.com", babyName: "נועם", babyAgeMonths: 22 },
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