"use client";

import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Activity, BoardState, Mom } from "@/app/types";
import { buildInitialBoardState } from "@/app/data/seed";
import ActivityColumn from "./ActivityColumn";
import AddMomModal from "./AddMomModal";
import AddActivityModal from "./AddActivityModal";
import CalendarView from "./CalendarView";

const STORAGE_KEY = "platfurma_board_v4";

type View = "kanban" | "calendar";

function loadState(): BoardState {
  if (typeof window === "undefined") return buildInitialBoardState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as BoardState;
  } catch { /* ignore */ }
  return buildInitialBoardState();
}

function saveState(state: BoardState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

export default function KanbanBoard() {
  const [board, setBoard] = useState<BoardState>(buildInitialBoardState);
  const [view, setView] = useState<View>("kanban");
  const [showAddMom, setShowAddMom] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);

  useEffect(() => {
    // Hydration: server uses seed; client loads localStorage (platfurma_board_v4).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount read
    setBoard(loadState());
  }, []);
  useEffect(() => { saveState(board); }, [board]);

  const momById = new Map(board.moms.map((m) => [m.id, m]));

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const momId = draggableId.split("::")[0];
    const srcId = source.droppableId;
    const dstId = destination.droppableId;

    if (srcId === dstId) {
      if (source.index === destination.index) return;
      setBoard((prev) => {
        const next = structuredClone(prev);
        const list = next.enrollments[srcId];
        list.splice(source.index, 1);
        list.splice(destination.index, 0, momId);
        return next;
      });
      return;
    }

    setBoard((prev) => {
      const next = structuredClone(prev);
      const destList = next.enrollments[dstId] ?? [];
      if (destList.includes(momId)) return prev;

      next.enrollments[srcId] = next.enrollments[srcId].filter((id) => id !== momId);
      if (!next.enrollments[dstId]) next.enrollments[dstId] = [];
      next.enrollments[dstId].splice(destination.index, 0, momId);
      return next;
    });
  }

  function handleAddMom(mom: Mom) {
    setBoard((prev) => ({ ...prev, moms: [...prev.moms, mom] }));
    setShowAddMom(false);
  }

  function handleAddActivity(activity: Activity) {
    setBoard((prev) => ({
      ...prev,
      activities: [...prev.activities, activity],
      enrollments: { ...prev.enrollments, [activity.id]: [] },
    }));
    setShowAddActivity(false);
  }

  function handleRemoveMomFromActivity(momId: string, activityId: string) {
    setBoard((prev) => {
      const next = structuredClone(prev);
      next.enrollments[activityId] = next.enrollments[activityId].filter((id) => id !== momId);
      return next;
    });
  }

  function handleEnrollMom(momId: string, activityId: string) {
    setBoard((prev) => {
      const next = structuredClone(prev);
      if (!next.enrollments[activityId]) next.enrollments[activityId] = [];
      if (!next.enrollments[activityId].includes(momId)) {
        next.enrollments[activityId].push(momId);
      }
      return next;
    });
  }

  function handleDeleteActivity(activityId: string) {
    setBoard((prev) => {
      const next = structuredClone(prev);
      next.activities = next.activities.filter((a) => a.id !== activityId);
      delete next.enrollments[activityId];
      return next;
    });
  }

  const enrolledAny = new Set(Object.values(board.enrollments).flat());
  const unenrolledCount = board.moms.filter((m) => !enrolledAny.has(m.id)).length;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-border-subtle bg-surface sticky top-0 z-10 shadow-sm motion-reduce:transition-none">
        <div>
          <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">PLATFURMA</h1>
          <p className="text-xs text-stone-500">ניהול פעילויות לאחר לידה</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg border border-border-subtle overflow-hidden text-sm font-medium bg-surface-muted">
            <button
              type="button"
              onClick={() => setView("kanban")}
              className={`px-3 py-1.5 transition-colors motion-reduce:transition-none focus-app ${view === "kanban" ? "bg-accent text-white" : "text-stone-600 hover:bg-surface"}`}
            >
              לוח עבודה
            </button>
            <button
              type="button"
              onClick={() => setView("calendar")}
              className={`px-3 py-1.5 transition-colors motion-reduce:transition-none focus-app ${view === "calendar" ? "bg-accent text-white" : "text-stone-600 hover:bg-surface"}`}
            >
              לוח שנה
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAddMom(true)}
            className="bg-accent text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors motion-reduce:transition-none focus-app"
          >
            + אם חדשה
          </button>
          <button
            type="button"
            onClick={() => setShowAddActivity(true)}
            className="bg-surface border border-accent text-accent text-sm font-semibold px-4 py-2 rounded-lg hover:bg-accent-muted/40 transition-colors motion-reduce:transition-none focus-app"
          >
            + פעילות
          </button>
          {unenrolledCount > 0 && (
            <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">
              {unenrolledCount} ללא שיבוץ
            </span>
          )}
          <button
            type="button"
            onClick={() => { setBoard(buildInitialBoardState()); }}
            className="text-xs text-stone-400 hover:text-stone-600 focus-app rounded px-1"
            title="איפוס לנתוני הדגמה"
          >
            איפוס
          </button>
        </div>
      </div>

      {view === "calendar" ? (
        <CalendarView board={board} />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 p-6 overflow-x-auto min-h-[calc(100vh-65px)] items-start motion-reduce:transition-none">
            {board.activities.map((activity) => {
              const actMoms = (board.enrollments[activity.id] ?? [])
                .map((id) => momById.get(id))
                .filter(Boolean) as Mom[];
              return (
                <ActivityColumn
                  key={activity.id}
                  activity={activity}
                  moms={actMoms}
                  allMoms={board.moms}
                  onRemoveMomFromActivity={handleRemoveMomFromActivity}
                  onEnrollMom={handleEnrollMom}
                  onDeleteActivity={handleDeleteActivity}
                />
              );
            })}

            {board.activities.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-stone-500 text-sm py-24 px-4 text-center">
                אין פעילויות עדיין — לחצו <span className="mx-1 font-semibold text-accent">+ פעילות</span> כדי להוסיף.
              </div>
            )}
          </div>
        </DragDropContext>
      )}

      {showAddMom && <AddMomModal onAdd={handleAddMom} onClose={() => setShowAddMom(false)} />}
      {showAddActivity && <AddActivityModal onAdd={handleAddActivity} onClose={() => setShowAddActivity(false)} />}
    </>
  );
}