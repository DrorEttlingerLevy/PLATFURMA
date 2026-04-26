"use client";

import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Activity, Mom } from "@/app/types";
import MomCard from "./MomCard";

interface Props {
  activity: Activity;
  moms: Mom[];
  allMoms: Mom[];
  onRemoveMomFromActivity: (momId: string, activityId: string) => void;
  onEnrollMom: (momId: string, activityId: string) => void;
  onDeleteActivity: (activityId: string) => void;
}

function formatDate(ddmmyyyy: string) {
  if (ddmmyyyy.length !== 8) return ddmmyyyy;
  return `${ddmmyyyy.slice(0, 2)}/${ddmmyyyy.slice(2, 4)}/${ddmmyyyy.slice(4)}`;
}

export default function ActivityColumn({ activity, moms, allMoms, onRemoveMomFromActivity, onEnrollMom, onDeleteActivity }: Props) {
  const [showEnroll, setShowEnroll] = useState(false);

  const enrolledIds = new Set(moms.map((m) => m.id));
  const enrollable = allMoms.filter((m) => !enrolledIds.has(m.id));

  return (
    <div className="flex flex-col w-64 shrink-0 bg-gray-50 rounded-2xl border border-gray-200 p-3">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div className="min-w-0">
          <h3 className="font-bold text-gray-800 text-sm leading-tight">{activity.name}</h3>
          {activity.ageRangeMonths && (
            <span className="text-xs text-purple-600 font-medium">
              Age {activity.ageRangeMonths.min}–{activity.ageRangeMonths.max}m
            </span>
          )}
        </div>
        <button
          onClick={() => onDeleteActivity(activity.id)}
          title="Delete activity"
          className="ml-2 shrink-0 text-gray-300 hover:text-red-400 text-lg leading-none"
        >
          &times;
        </button>
      </div>

      <p className="text-xs text-gray-400 mb-1 line-clamp-2">{activity.description}</p>

      <div className="text-xs text-gray-400 mb-2 space-y-0.5">
        <div><span className="font-medium text-gray-500">Starts:</span> {formatDate(activity.startDate)}</div>
        {activity.isOneTime
          ? <div className="text-amber-600 font-medium">One-time event</div>
          : <div>{activity.sessionsPerWeek}x/wk · {activity.totalWeeks} wks</div>}
        <div className="font-medium text-gray-600">{moms.length} enrolled</div>
      </div>

      {/* Drop zone */}
      <Droppable droppableId={activity.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[60px] rounded-xl transition-colors ${
              snapshot.isDraggingOver ? "bg-purple-50" : "bg-transparent"
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

      {/* Enroll mom */}
      <div className="mt-2 border-t pt-2">
        {!showEnroll ? (
          <button
            onClick={() => setShowEnroll(true)}
            disabled={enrollable.length === 0}
            className="w-full text-xs text-purple-600 hover:text-purple-800 font-medium disabled:text-gray-300 disabled:cursor-not-allowed text-left"
          >
            + Enroll mom
          </button>
        ) : (
          <div className="flex gap-1">
            <select
              autoFocus
              className="flex-1 text-xs border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-400"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  onEnrollMom(e.target.value, activity.id);
                  setShowEnroll(false);
                }
              }}
            >
              <option value="" disabled>Select mom…</option>
              {enrollable.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (Baby: {m.babyName}, Age: {m.babyAgeMonths}m)
                </option>
              ))}
            </select>
            <button onClick={() => setShowEnroll(false)} className="text-gray-400 hover:text-gray-600 text-sm px-1">✕</button>
          </div>
        )}
      </div>
    </div>
  );
}
