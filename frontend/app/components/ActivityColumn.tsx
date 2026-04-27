"use client";

import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Activity, Mom } from "@/app/types";
import { formatDateHeIL } from "@/app/lib/dates";
import MomCard from "./MomCard";

interface Props {
  activity: Activity;
  moms: Mom[];
  allMoms: Mom[];
  onRemoveMomFromActivity: (momId: string, activityId: string) => void;
  onEnrollMom: (momId: string, activityId: string) => void;
  onDeleteActivity: (activityId: string) => void;
}

export default function ActivityColumn({ activity, moms, allMoms, onRemoveMomFromActivity, onEnrollMom, onDeleteActivity }: Props) {
  const [showEnroll, setShowEnroll] = useState(false);

  const enrolledIds = new Set(moms.map((m) => m.id));
  const enrollable = allMoms.filter((m) => !enrolledIds.has(m.id));

  return (
    <div className="flex flex-col w-72 shrink-0 bg-surface-muted rounded-2xl border border-border-subtle p-3">
      <div className="flex items-start justify-between mb-1">
        <div className="min-w-0">
          <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm leading-tight">{activity.name}</h3>
          {activity.ageRangeMonths && (
            <span className="text-xs text-accent font-medium">
              גיל {activity.ageRangeMonths.min}–{activity.ageRangeMonths.max} ח׳
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onDeleteActivity(activity.id)}
          title="מחיקת פעילות"
          aria-label="מחיקת פעילות"
          className="me-2 shrink-0 text-stone-300 hover:text-red-500 text-lg leading-none focus-app rounded"
        >
          &times;
        </button>
      </div>

      <p className="text-xs text-stone-500 mb-1 line-clamp-2">{activity.description}</p>

      <div className="text-xs text-stone-500 mb-2 space-y-0.5">
        <div><span className="font-medium text-stone-600">התחלה:</span> {formatDateHeIL(activity.startDate)}</div>
        {activity.isOneTime
          ? <div className="text-amber-700 dark:text-amber-400 font-medium">אירוע חד-פעמי</div>
          : <div>{activity.sessionsPerWeek} בשבוע · {activity.totalWeeks} שבועות</div>}
        <div className="font-medium text-stone-700 dark:text-stone-200">{moms.length} רשומות</div>
      </div>

      <Droppable droppableId={activity.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[60px] rounded-xl transition-colors motion-reduce:transition-none ${
              snapshot.isDraggingOver ? "bg-accent-muted/50" : "bg-transparent"
            }`}
          >
            {moms.map((mom, i) => (
              <MomCard
                key={`${mom.id}::${activity.id}`}
                draggableId={`${mom.id}::${activity.id}`}
                mom={mom}
                index={i}
                onRemoveFromActivity={(momId) => onRemoveMomFromActivity(momId, activity.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="mt-2 border-t border-border-subtle pt-2">
        {!showEnroll ? (
          <button
            type="button"
            onClick={() => setShowEnroll(true)}
            disabled={enrollable.length === 0}
            className="w-full text-xs text-accent hover:text-accent-hover font-medium disabled:text-stone-300 disabled:cursor-not-allowed text-start focus-app rounded py-1"
          >
            + שיבוץ אם
          </button>
        ) : (
          <div className="flex gap-1">
            <select
              autoFocus
              className="flex-1 text-xs border border-border-subtle rounded-lg px-2 py-1 bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)]"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  onEnrollMom(e.target.value, activity.id);
                  setShowEnroll(false);
                }
              }}
            >
              <option value="" disabled>בחרי אם…</option>
              {enrollable.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (תינוק/ת: {m.babyName}, גיל: {m.babyAgeMonths} ח׳)
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setShowEnroll(false)} className="text-stone-400 hover:text-stone-600 text-sm px-2 focus-app rounded" aria-label="סגירה">✕</button>
          </div>
        )}
      </div>
    </div>
  );
}