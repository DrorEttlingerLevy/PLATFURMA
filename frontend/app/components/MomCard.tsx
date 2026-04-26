"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Draggable } from "@hello-pangea/dnd";
import { Mom } from "@/app/types";

interface Props {
  draggableId: string; // composite "momId::activityId" — unique per column
  mom: Mom;
  index: number;
  onRemoveFromActivity: (momId: string) => void;
}

export default function MomCard({ draggableId, mom, index, onRemoveFromActivity }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => {
        const card = (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-white rounded-xl shadow-sm border p-3 mb-2 cursor-grab select-none transition-shadow ${
              snapshot.isDragging
                ? "shadow-lg ring-2 ring-purple-400 opacity-95"
                : "hover:shadow-md"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 truncate">{mom.name}</p>
                <p className="text-sm text-gray-500 truncate">
                  <span className="font-medium text-gray-600">Baby:</span> {mom.babyName}&ensp;
                  <span className="font-medium text-gray-600">Age:</span> {mom.babyAgeMonths}m
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
                className="shrink-0 text-xs text-purple-600 hover:text-purple-800 font-medium"
              >
                {expanded ? "Less" : "More"}
              </button>
            </div>

            {expanded && (
              <div className="mt-2 pt-2 border-t text-xs text-gray-600 space-y-1">
                <p><span className="font-medium">Phone:</span> {mom.phone}</p>
                <p><span className="font-medium">Email:</span> {mom.email}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); onRemoveFromActivity(mom.id); }}
                  className="mt-1 text-red-500 hover:text-red-700 font-medium"
                >
                  Remove from activity
                </button>
              </div>
            )}
          </div>
        );

        // Portal renders the dragged card at document.body, bypassing overflow-x offset
        if (snapshot.isDragging && typeof document !== "undefined") {
          return createPortal(card, document.body);
        }
        return card;
      }}
    </Draggable>
  );
}
