"use client";

import { useState } from "react";
import { Activity, BoardState, Mom } from "@/app/types";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const COLORS = [
  { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300", header: "bg-purple-200" },
  { bg: "bg-blue-100",   text: "text-blue-700",   border: "border-blue-300",   header: "bg-blue-200"   },
  { bg: "bg-emerald-100",text: "text-emerald-700",border: "border-emerald-300",header: "bg-emerald-200"},
  { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300", header: "bg-orange-200" },
  { bg: "bg-pink-100",   text: "text-pink-700",   border: "border-pink-300",   header: "bg-pink-200"   },
  { bg: "bg-cyan-100",   text: "text-cyan-700",   border: "border-cyan-300",   header: "bg-cyan-200"   },
];

function parseDDMMYYYY(s: string): Date | null {
  if (!s || s.length !== 8) return null;
  const d = parseInt(s.slice(0, 2), 10);
  const m = parseInt(s.slice(2, 4), 10) - 1;
  const y = parseInt(s.slice(4, 8), 10);
  if (isNaN(d) || isNaN(m) || isNaN(y)) return null;
  return new Date(y, m, d);
}

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

function formatDDMMYYYY(s: string) {
  if (s.length !== 8) return s;
  return `${s.slice(0, 2)}/${s.slice(2, 4)}/${s.slice(4)}`;
}

interface Props {
  board: BoardState;
}

export default function CalendarView({ board }: Props) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Activity | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Build calendar cells (always complete weeks)
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
    // Recurring activities spanning across this date (but not starting today — those are handled above)
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
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 font-bold text-xl"
        >
          ‹
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {MONTH_NAMES[month]} {year}
        </h2>
        <button
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 font-bold text-xl"
        >
          ›
        </button>
      </div>

      {/* Day-of-week header */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1 uppercase tracking-wide">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 border-l border-t border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {cells.map(({ date, current }, idx) => {
          const isToday = sameDay(date, today);
          const starting = activitiesStartingOn(date);
          const ongoing = activitiesOngoingOn(date);

          return (
            <div
              key={idx}
              className={`min-h-[100px] border-r border-b border-gray-200 p-1.5 ${
                current ? "bg-white" : "bg-gray-50/60"
              }`}
            >
              {/* Date number */}
              <div className={`text-xs font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                isToday
                  ? "bg-purple-600 text-white"
                  : current
                  ? "text-gray-700"
                  : "text-gray-300"
              }`}>
                {date.getDate()}
              </div>

              {/* Activities starting this day */}
              {starting.map((a) => {
                const c = activityColorMap.get(a.id)!;
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleSelected(a)}
                    title={a.name}
                    className={`w-full text-left text-xs px-1.5 py-0.5 rounded-md mb-0.5 border truncate font-semibold transition-all ${c.bg} ${c.text} ${c.border} ${
                      selected?.id === a.id ? "ring-1 ring-purple-500" : "hover:opacity-80"
                    }`}
                  >
                    {a.name}
                  </button>
                );
              })}

              {/* Ongoing activity spans (thin bar) */}
              {ongoing.map((a) => {
                const c = activityColorMap.get(a.id)!;
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleSelected(a)}
                    title={a.name}
                    className={`w-full h-1.5 rounded-full mb-0.5 opacity-40 hover:opacity-70 transition-opacity ${c.header}`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4">
        {board.activities.map((a) => {
          const c = activityColorMap.get(a.id)!;
          return (
            <button
              key={a.id}
              onClick={() => toggleSelected(a)}
              className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border font-medium transition-all ${c.bg} ${c.text} ${c.border} ${
                selected?.id === a.id ? "ring-1 ring-purple-500" : "hover:opacity-80"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${c.header}`} />
              {a.name}
            </button>
          );
        })}
      </div>

      {/* Activity detail panel */}
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
                <p className="text-sm text-gray-600 mt-0.5">{selected.description}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none ml-4 shrink-0">✕</button>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-600 mb-4">
              {selected.ageRangeMonths && (
                <span><span className="font-medium">Baby age:</span> {selected.ageRangeMonths.min}–{selected.ageRangeMonths.max}m</span>
              )}
              <span><span className="font-medium">Starts:</span> {formatDDMMYYYY(selected.startDate)}</span>
              {selected.isOneTime ? (
                <span className="font-semibold text-amber-600">One-time event</span>
              ) : (
                <>
                  <span><span className="font-medium">Schedule:</span> {selected.sessionsPerWeek}x/week for {selected.totalWeeks} weeks</span>
                  {endDate && (
                    <span><span className="font-medium">Ends:</span> {endDate.toLocaleDateString("en-GB")}</span>
                  )}
                </>
              )}
            </div>

            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              {moms.length} enrolled mom{moms.length !== 1 ? "s" : ""}
            </p>
            <div className="flex flex-wrap gap-2">
              {moms.map((mom) => (
                <div key={mom.id} className="bg-white rounded-xl px-3 py-2 text-xs border border-gray-200 shadow-sm">
                  <p className="font-semibold text-gray-800">{mom.name}</p>
                  <p className="text-gray-400">Baby: {mom.babyName} · Age: {mom.babyAgeMonths}m</p>
                </div>
              ))}
              {moms.length === 0 && <p className="text-xs text-gray-400 italic">No moms enrolled yet.</p>}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
