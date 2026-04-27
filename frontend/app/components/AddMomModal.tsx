"use client";

import { useState } from "react";
import { Mom } from "@/app/types";

interface Props {
  onAdd: (mom: Mom) => void;
  onClose: () => void;
}

function generateId() {
  return "MOM-" + Date.now().toString(36).toUpperCase();
}

export default function AddMomModal({ onAdd, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    babyName: "",
    babyAgeMonths: "",
  });

  const valid =
    form.name.trim() &&
    form.phone.trim() &&
    form.babyName.trim() &&
    form.babyAgeMonths !== "" &&
    Number(form.babyAgeMonths) >= 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    onAdd({
      id: generateId(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      babyName: form.babyName.trim(),
      babyAgeMonths: Number(form.babyAgeMonths),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 motion-reduce:transition-none" role="presentation" onClick={onClose}>
      <div
        className="bg-surface rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 border border-border-subtle"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-mom-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="add-mom-title" className="text-lg font-bold mb-4 text-stone-800 dark:text-stone-100">הוספת אם</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Field label="שם האם *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="טלפון *" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <Field label="אימייל" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="שם התינוק/ת *" value={form.babyName} onChange={(v) => setForm({ ...form, babyName: v })} />
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-300 mb-1">גיל התינוק/ת (בחודשים) * — 0.5 לגיל מתחת לחודש</label>
            <input
              type="number"
              value={form.babyAgeMonths}
              min={0}
              step={0.5}
              onChange={(e) => setForm({ ...form, babyAgeMonths: e.target.value })}
              className="w-full border border-border-subtle rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)]"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={!valid}
              className="flex-1 bg-accent text-white rounded-lg py-2 font-semibold disabled:opacity-40 hover:bg-accent-hover transition-colors motion-reduce:transition-none focus-app"
            >
              שמירה
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

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
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