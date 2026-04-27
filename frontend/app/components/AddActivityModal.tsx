"use client";

import { useState } from "react";
import { Activity } from "@/app/types";

interface Props {
  onAdd: (activity: Activity) => void;
  onClose: () => void;
}

function generateId() {
  return "ACT-" + Date.now().toString(36).toUpperCase();
}

function toDDMMYYYY(isoDate: string) {
  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d) return "";
  return `${d}${m}${y}`;
}

export default function AddActivityModal({ onAdd, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    hasAgeRange: false,
    ageMin: "",
    ageMax: "",
    isOneTime: false,
    sessionsPerWeek: "1",
    totalWeeks: "8",
    startDate: "",
  });

  const valid =
    form.name.trim() &&
    form.startDate &&
    (!form.hasAgeRange || (form.ageMin !== "" && form.ageMax !== "" && Number(form.ageMax) >= Number(form.ageMin))) &&
    (form.isOneTime || (Number(form.sessionsPerWeek) >= 1 && Number(form.totalWeeks) >= 1));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    onAdd({
      id: generateId(),
      name: form.name.trim(),
      description: form.description.trim(),
      ageRangeMonths: form.hasAgeRange
        ? { min: Number(form.ageMin), max: Number(form.ageMax) }
        : null,
      startDate: toDDMMYYYY(form.startDate),
      isOneTime: form.isOneTime,
      sessionsPerWeek: form.isOneTime ? 0 : Number(form.sessionsPerWeek),
      totalWeeks: form.isOneTime ? 0 : Number(form.totalWeeks),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="presentation" onClick={onClose}>
      <div
        className="bg-surface rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto border border-border-subtle"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-act-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="add-act-title" className="text-lg font-bold mb-4 text-stone-800 dark:text-stone-100">הוספת פעילות</h2>
        <form onSubmit={handleSubmit} className="space-y-3">

          <Field label="שם הפעילות *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />

          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-300 mb-1">תיאור</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full border border-border-subtle rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-300 mb-1">תאריך התחלה *</label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="w-full border border-border-subtle rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)]"
            />
            {form.startDate && (
              <p className="text-xs text-stone-400 mt-0.5">נשמר כ־{toDDMMYYYY(form.startDate)} (פורמט DDMMYYYY)</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isOneTime"
              type="checkbox"
              checked={form.isOneTime}
              onChange={(e) => setForm({ ...form, isOneTime: e.target.checked })}
              className="w-4 h-4 accent-[var(--accent)]"
            />
            <label htmlFor="isOneTime" className="text-sm text-stone-600 dark:text-stone-300">אירוע חד-פעמי (ללא מחזוריות)</label>
          </div>

          {!form.isOneTime && (
            <div className="flex gap-3">
              <NumField
                label="מפגשים בשבוע *"
                value={form.sessionsPerWeek}
                onChange={(v) => setForm({ ...form, sessionsPerWeek: v })}
              />
              <NumField
                label="סה״כ שבועות *"
                value={form.totalWeeks}
                onChange={(v) => setForm({ ...form, totalWeeks: v })}
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              id="hasAge"
              type="checkbox"
              checked={form.hasAgeRange}
              onChange={(e) => setForm({ ...form, hasAgeRange: e.target.checked })}
              className="w-4 h-4 accent-[var(--accent)]"
            />
            <label htmlFor="hasAge" className="text-sm text-stone-600 dark:text-stone-300">טווח גילאים לתינוק/ת (בחודשים)</label>
          </div>

          {form.hasAgeRange && (
            <div className="flex gap-3">
              <NumField label="גיל מינ׳ (חודשים)" value={form.ageMin} onChange={(v) => setForm({ ...form, ageMin: v })} />
              <NumField label="גיל מקס׳ (חודשים)" value={form.ageMax} onChange={(v) => setForm({ ...form, ageMax: v })} />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={!valid}
              className="flex-1 bg-accent text-white rounded-lg py-2 font-semibold disabled:opacity-40 hover:bg-accent-hover transition-colors motion-reduce:transition-none focus-app"
            >
              הוספה
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-border-subtle rounded-lg py-2 font-semibold text-stone-600 dark:text-stone-300 hover:bg-surface-muted transition-colors motion-reduce:transition-none focus-app"
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-stone-600 dark:text-stone-300 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border-subtle rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)]"
      />
    </div>
  );
}

function NumField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex-1">
      <label className="block text-xs font-medium text-stone-600 dark:text-stone-300 mb-1">{label}</label>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border-subtle rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)]"
      />
    </div>
  );
}