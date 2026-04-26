"use client";

import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Activity, BoardState, Mom } from "@/app/types";
import { buildInitialBoardState } from "@/app/data/seed";
import ActivityColumn from "./ActivityColumn";
import AddMomModal from "./AddMomModal";
import AddActivityModal from "./AddActivityModal";
import CalendarView from "./CalendarView";

const STORAGE_KEY = "platfurma_board_v3";

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

  useEffect(() => { setBoard(loadState()); }, []);
  useEffect(() => { saveState(board); }, [board]);

  const momById = new Map(board.moms.map((m) => [m.id, m]));

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // draggableId is "momId::activityId" — extract just the momId
    const momId = draggableId.split("::")[0];
    const srcId = source.droppableId;
    const dstId = destination.droppableId;

    // Within same column: reorder
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

    // Cross-column: move (abort if already enrolled in destination)
    setBoard((prev) => {
      const next = structuredClone(prev);
      const destList = next.enrollments[dstId] ?? [];
      if (destList.includes(momId)) return prev; // already there — no-op

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

  // Moms not enrolled in any activity
  const enrolledAny = new Set(Object.values(board.enrollments).flat());
  const unenrolledCount = board.moms.filter((m) => !enrolledAny.has(m.id)).length;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-10 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">PLATFURMA</h1>
          <p className="text-xs text-gray-400">Post-birth activity manager</p>
        </div>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm font-medium">
            <button
              onClick={() => setView("kanban")}
              className={`px-3 py-1.5 transition-colors ${view === "kanban" ? "bg-purple-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
            >
              Kanban
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`px-3 py-1.5 transition-colors ${view === "calendar" ? "bg-purple-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
            >
              Calendar
            </button>
          </div>

          <button onClick={() => setShowAddMom(true)} className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            + Mom
          </button>
          <button onClick={() => setShowAddActivity(true)} className="bg-white border border-purple-600 text-purple-600 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
            + Activity
          </button>
          {unenrolledCount > 0 && (
            <span className="text-xs text-amber-600 font-medium">{unenrolledCount} not enrolled</span>
          )}
          <button onClick={() => { setBoard(buildInitialBoardState()); }} className="text-xs text-gray-400 hover:text-gray-600" title="Reset to seed data">
            Reset
          </button>
        </div>
      </div>

      {/* Views */}
      {view === "calendar" ? (
        <CalendarView board={board} />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 p-6 overflow-x-auto min-h-[calc(100vh-65px)] items-start">
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
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm py-24">
                No activities yet — click <span className="mx-1 font-semibold text-purple-600">+ Activity</span> to add one.
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
