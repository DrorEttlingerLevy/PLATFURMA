"use client";

import { useMemo, useState } from "react";
import { Activity, BoardState, Mom } from "@/app/types";
import { parseDDMMYYYY, formatDateHeIL } from "@/app/lib/dates";

const DAY_NAMES = [0, 1, 2, 3, 4, 5, 6].map((i) =>
  new Intl.DateTimeFormat("he-IL", { weekday: "short" }).format(new Date(2023, 0, 1 + i))
);

const COLORS = [
  { bg: "bg-violet-100 dark:bg-violet-950/40", text: "text-violet-800 dark:text-violet-200", border: "border-violet-300 dark:border-violet-700", header: "bg-violet-200 dark:bg-violet-800" },
  { bg: "bg-sky-100 dark:bg-sky-950/40", text: "text-sky-800 dark:text-sky-200", border: "border-sky-300 dark:border-sky-700", header: "bg-sky-200 dark:bg-sky-800" },
  { bg: "bg-teal-100 dark:bg-teal-950/40", text: "text-teal-800 dark:text-teal-200", border: "border-teal-300 dark:border-teal-700", header: "bg-teal-200 dark:bg-teal-800" },
  { bg: "bg-amber-100 dark:bg-amber-950/40", text: "text-amber-900 dark:text-amber-200", border: "border-amber-300 dark:border-amber-700", header: "bg-amber-200 dark:bg-amber-800" },
  { bg: "bg-rose-100 dark:bg-rose-950/40", text: "text-rose-800 dark:text-rose-200", border: "border-rose-300 dark:border-rose-700", header: "bg-rose-200 dark:bg-rose-800" },
  { bg: "bg-cyan-100 dark:bg-cyan-950/40", text: "text-cyan-800 dark:text-cyan-200", border: "border-cyan-300 dark:border-cyan-700", header: "bg-cyan-200 dark:bg-cyan-800" },
];

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86_400_000);
}

interface Props {
  board: BoardState;
}

export default function CalendarView({ board }: Props) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Activity | null>(null);

  const monthTitle = useMemo(
    () => new Intl.DateTimeFormat("he-IL", { month: "long", year: "numeric" }).format(viewDate),
    [viewDate]
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: Array<{ date: Date; current: boolean }> = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - firstDayOfMonth + 1 + i), current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), current: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ date: new Date(year, month + 1, cells.length - firstDayOfMonth - daysInMonth + 1), current: false });
  }

  const activityColorMap = new Map(board.activities.map((a, i) => [a.id, COLORS[i % COLORS.length]]));
  const momById = new Map(board.moms.map((m) => [m.id, m]));

  function activitiesStartingOn(date: Date) {
    return board.activities.filter((a) => {
      const sd = parseDDMMYYYY(a.startDate);
      return sd && sameDay(sd, date);
    });
  }

  function activitiesOngoingOn(date: Date) {
    return board.activities.filter((a) => {
      if (a.isOneTime) return false;
      const sd = parseDDMMYYYY(a.startDate);
      if (!sd || sameDay(sd, date)) return false;
      const end = addDays(sd, a.totalWeeks * 7);
      return date > sd && date < end;
    });
  }

  function enrolledMoms(activityId: string): Mom[] {
    return (board.enrollments[activityId] ?? [])
      .map((id) => momById.get(id))
      .filter(Boolean) as Mom[];
  }

  function toggleSelected(activity: Activity) {
    setSelected((prev) => (prev?.id === activity.id ? null : activity));
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-surface-muted text-stone-500 font-bold text-xl focus-app"
          aria-label="חודש קודם"
        >
          ‹
        </button>
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 capitalize">
          {monthTitle}
        </h2>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-surface-muted text-stone-500 font-bold text-xl focus-app"
          aria-label="חודש הבא"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-stone-400 py-1 tracking-wide">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-s border-t border-border-subtle rounded-xl overflow-hidden shadow-sm">
        {cells.map(({ date, current }, idx) => {
          const isToday = sameDay(date, today);
          const starting = activitiesStartingOn(date);
          const ongoing = activitiesOngoingOn(date);

          return (
            <div
              key={idx}
              className={`min-h-[100px] border-e border-b border-border-subtle p-1.5 ${
                current ? "bg-surface" : "bg-surface-muted/60"
              }`}
            >
              <div className={`text-xs font-semibold mb-1 w-7 h-7 flex items-center justify-center rounded-full ${
                isToday
                  ? "bg-accent text-white"
                  : current
                  ? "text-stone-700 dark:text-stone-200"
                  : "text-stone-300"
              }`}>
                {date.getDate()}
              </div>

              {starting.map((a) => {
                const c = activityColorMap.get(a.id)!;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => toggleSelected(a)}
                    title={a.name}
                    className={`w-full text-start text-xs px-1.5 py-0.5 rounded-md mb-0.5 border truncate font-semibold transition-all motion-reduce:transition-none ${c.bg} ${c.text} ${c.border} ${
                      selected?.id === a.id ? "ring-2 ring-[var(--ring-focus)]" : "hover:opacity-85"
                    } focus-app`}
                  >
                    {a.name}
                  </button>
                );
              })}

              {ongoing.map((a) => {
                const c = activityColorMap.get(a.id)!;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => toggleSelected(a)}
                    title={a.name}
                    className={`w-full h-1.5 rounded-full mb-0.5 opacity-40 hover:opacity-70 transition-opacity motion-reduce:transition-none focus-app ${c.header}`}
                    aria-label={a.name}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        {board.activities.map((a) => {
          const c = activityColorMap.get(a.id)!;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggleSelected(a)}
              className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border font-medium transition-all motion-reduce:transition-none ${c.bg} ${c.text} ${c.border} ${
                selected?.id === a.id ? "ring-2 ring-[var(--ring-focus)]" : "hover:opacity-85"
              } focus-app`}
            >
              <span className={`w-2 h-2 rounded-full ${c.header}`} />
              {a.name}
            </button>
          );
        })}
      </div>

      {selected && (() => {
        const c = activityColorMap.get(selected.id)!;
        const moms = enrolledMoms(selected.id);
        const startDate = parseDDMMYYYY(selected.startDate);
        const endDate = !selected.isOneTime && startDate
          ? addDays(startDate, selected.totalWeeks * 7)
          : null;

        return (
          <div className={`mt-5 rounded-2xl border p-5 ${c.bg} ${c.border}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className={`font-bold text-lg ${c.text}`}>{selected.name}</h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 mt-0.5">{selected.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-stone-400 hover:text-stone-600 text-xl leading-none ms-4 shrink-0 focus-app rounded"
                aria-label="סגירה"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-stone-600 dark:text-stone-300 mb-4">
              {selected.ageRangeMonths && (
                <span><span className="font-medium">גיל תינוק/ת:</span> {selected.ageRangeMonths.min}–{selected.ageRangeMonths.max} ח׳</span>
              )}
              <span><span className="font-medium">התחלה:</span> {formatDateHeIL(selected.startDate)}</span>
              {selected.isOneTime ? (
                <span className="font-semibold text-amber-700 dark:text-amber-400">אירוע חד-פעמי</span>
              ) : (
                <>
                  <span><span className="font-medium">מערכת:</span> {selected.sessionsPerWeek} פעמים בשבוע לאורך {selected.totalWeeks} שבועות</span>
                  {endDate && (
                    <span><span className="font-medium">סיום:</span> {endDate.toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "numeric" })}</span>
                  )}
                </>
              )}
            </div>

            <p className="text-xs font-semibold text-stone-500 mb-2 tracking-wide">
              {moms.length} אמהות רשומות
            </p>
            <div className="flex flex-wrap gap-2">
              {moms.map((mom) => (
                <div key={mom.id} className="bg-surface rounded-xl px-3 py-2 text-xs border border-border-subtle shadow-sm">
                  <p className="font-semibold text-stone-800 dark:text-stone-100">{mom.name}</p>
                  <p className="text-stone-500">תינוק/ת: {mom.babyName} · גיל: {mom.babyAgeMonths} ח׳</p>
                </div>
              ))}
              {moms.length === 0 && <p className="text-xs text-stone-400 italic">אין אמהות רשומות עדיין.</p>}
            </div>
          </div>
        );
      })()}
    </div>
  );
}