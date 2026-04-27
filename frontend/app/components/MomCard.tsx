"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Draggable } from "@hello-pangea/dnd";
import { Phone, Mail, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Mom } from "@/app/types";
import { normalizeForWhatsApp, telHref } from "@/app/lib/phone";

interface Props {
  draggableId: string;
  mom: Mom;
  index: number;
  onRemoveFromActivity: (momId: string) => void;
}

type MomCardLinkAction = {
  id: string;
  label: string;
  ariaLabel: string;
  icon: LucideIcon;
  href: string;
  external?: boolean;
};

function buildLinkActions(mom: Mom): MomCardLinkAction[] {
  const waDigits = normalizeForWhatsApp(mom.phone);
  const hasEmail = Boolean(mom.email?.trim());
  const actions: MomCardLinkAction[] = [
    {
      id: "call",
      label: "התקשרי",
      ariaLabel: `התקשרות אל ${mom.name}`,
      icon: Phone,
      href: telHref(mom.phone),
    },
  ];
  if (waDigits) {
    actions.push({
      id: "whatsapp",
      label: "ווטסאפ",
      ariaLabel: `ווטסאפ ל${mom.name}`,
      icon: MessageCircle,
      href: `https://wa.me/${waDigits}`,
      external: true,
    });
  }
  if (hasEmail) {
    actions.push({
      id: "email",
      label: "מייל",
      ariaLabel: `מייל ל${mom.name}`,
      icon: Mail,
      href: `mailto:${mom.email.trim()}`,
    });
  }
  return actions;
}

export default function MomCard({ draggableId, mom, index, onRemoveFromActivity }: Props) {
  const [expanded, setExpanded] = useState(false);
  const linkActions = useMemo(() => buildLinkActions(mom), [mom]);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => {
        const card = (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-surface rounded-xl shadow-sm border border-border-subtle p-3 mb-2 cursor-grab select-none transition-shadow motion-reduce:transition-none ${
              snapshot.isDragging
                ? "shadow-lg ring-2 ring-[var(--ring-focus)] opacity-95"
                : "hover:shadow-md"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-stone-800 dark:text-stone-100 truncate">{mom.name}</p>
                <p className="text-sm text-stone-500 truncate">
                  <span className="font-medium text-stone-600 dark:text-stone-300">תינוק/ת:</span> {mom.babyName}
                  <span className="mx-1 text-stone-300">·</span>
                  <span className="font-medium text-stone-600 dark:text-stone-300">גיל:</span> {mom.babyAgeMonths} ח׳
                </p>
                <p
                  className="text-xs text-stone-600 dark:text-stone-300 mt-1 font-mono truncate"
                  title={mom.phone}
                >
                  {mom.phone}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
                onMouseDown={(e) => e.stopPropagation()}
                className="shrink-0 flex items-center gap-0.5 text-xs text-accent hover:text-accent-hover font-medium focus-app rounded-lg px-1 py-1"
                aria-expanded={expanded}
              >
                {expanded ? (
                  <>
                    <span>פחות</span>
                    <ChevronUp className="w-3.5 h-3.5" aria-hidden />
                  </>
                ) : (
                  <>
                    <span>עוד</span>
                    <ChevronDown className="w-3.5 h-3.5" aria-hidden />
                  </>
                )}
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {linkActions.map((a) => {
                const Icon = a.icon;
                return (
                  <a
                    key={a.id}
                    href={a.href}
                    {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    aria-label={a.ariaLabel}
                    className="inline-flex items-center justify-center gap-1 min-h-11 px-2 rounded-lg bg-surface-muted border border-border-subtle text-stone-700 dark:text-stone-200 hover:bg-accent-muted/60 text-xs font-medium transition-colors motion-reduce:transition-none focus-app"
                  >
                    <Icon className="w-4 h-4 shrink-0" aria-hidden />
                    <span>{a.label}</span>
                  </a>
                );
              })}
            </div>

            {expanded && (
              <div className="mt-2 pt-2 border-t border-border-subtle text-xs text-stone-600 dark:text-stone-300 space-y-2">
                {mom.email?.trim() && (
                  <p className="break-all"><span className="font-medium">אימייל:</span> {mom.email}</p>
                )}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onRemoveFromActivity(mom.id); }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 font-medium focus-app rounded"
                >
                  הסרה מהפעילות
                </button>
              </div>
            )}
          </div>
        );

        if (snapshot.isDragging && typeof document !== "undefined") {
          return createPortal(card, document.body);
        }
        return card;
      }}
    </Draggable>
  );
}