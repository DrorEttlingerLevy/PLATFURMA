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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Add New Mom</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Field label="Mom's Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Phone *" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="Baby's Name *" value={form.babyName} onChange={(v) => setForm({ ...form, babyName: v })} />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Baby Age (months) * — use 0.5 for under 1 month</label>
            <input
              type="number"
              value={form.babyAgeMonths}
              min={0}
              step={0.5}
              onChange={(e) => setForm({ ...form, babyAgeMonths: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={!valid}
              className="flex-1 bg-purple-600 text-white rounded-lg py-2 font-semibold disabled:opacity-40 hover:bg-purple-700 transition-colors"
            >
              Add Mom
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 rounded-lg py-2 font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
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
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  );
}
