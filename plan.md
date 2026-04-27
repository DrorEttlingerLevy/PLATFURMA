# PLATFURMA — phased delivery plan

Living document for the Next.js dashboard (`frontend/`): Hebrew-first UX, RTL, richer **Mom card** (contact without relying on “More”), and room for future actions (e.g. WhatsApp).

## Decisions (locked)

| Topic | Choice |
|--------|--------|
| Plan file | This file: repo root [`plan.md`](plan.md) |
| Seed data | **Full Hebrew** — activity titles/descriptions and mom/baby names in Hebrew; phones/emails realistic |
| Mom card | Primary contact **on the card**; “עוד” for email repeat + **הסרה מהפעילות** |
| Phasing | Prefer stopping after each phase for your confirmation; **Phases 1–4 were implemented in one pass** on 2026-04-27 per your request to proceed in Agent mode |

## Product goals

- **Easy to use**: clear hierarchy, ≥44px-style action targets on Mom card, Hebrew labels, RTL.
- **Mom card**: phone line always visible; row of **התקשרי / ווטסאפ / מייל** (Lucide SVGs); extensible via `buildLinkActions` in [`MomCard.tsx`](frontend/app/components/MomCard.tsx).
- **Design**: warm surfaces + **accent** tokens in [`globals.css`](frontend/app/globals.css); `motion-reduce` and focus rings on primary controls.

## How we work (Cursor)

- **Plan mode** can block non-markdown edits; use **Agent mode** for code.
- **Remote agents** see the repo only — keep shared skills under [`.agents/skills/`](.agents/skills/).

---

## Phase 1 — RTL foundation, Hebrew metadata, fonts, tokens

**Status:** Done (2026-04-27).

**Shipped**

- [`frontend/app/layout.tsx`](frontend/app/layout.tsx): `lang="he"`, `dir="rtl"`, Rubik (`latin` + `hebrew`), Hebrew metadata, `body` `bg-background text-foreground`.
- [`frontend/app/globals.css`](frontend/app/globals.css): semantic tokens, `@theme` colors + `--font-sans`, `.focus-app`, reduced-motion for `scroll-behavior`.
- [`frontend/app/lib/dates.ts`](frontend/app/lib/dates.ts), [`frontend/app/lib/phone.ts`](frontend/app/lib/phone.ts): shared helpers.
- RTL-oriented borders/text: [`ActivityColumn.tsx`](frontend/app/components/ActivityColumn.tsx), [`CalendarView.tsx`](frontend/app/components/CalendarView.tsx).

---

## Phase 2 — Hebrew UI + seed + calendar locale

**Status:** Done (2026-04-27).

**Shipped**

- Hebrew UI: [`KanbanBoard.tsx`](frontend/app/components/KanbanBoard.tsx), [`ActivityColumn.tsx`](frontend/app/components/ActivityColumn.tsx), [`CalendarView.tsx`](frontend/app/components/CalendarView.tsx), [`MomCard.tsx`](frontend/app/components/MomCard.tsx), [`AddMomModal.tsx`](frontend/app/components/AddMomModal.tsx), [`AddActivityModal.tsx`](frontend/app/components/AddActivityModal.tsx), [`page.tsx`](frontend/app/page.tsx).
- [`frontend/app/data/seed.ts`](frontend/app/data/seed.ts): Hebrew activities and moms.
- Calendar: `Intl` + `he-IL` for month/weekday labels and detail dates.
- **localStorage** key bumped to `platfurma_board_v4` in [`KanbanBoard.tsx`](frontend/app/components/KanbanBoard.tsx).

---

## Phase 3 — Mom card UX + actions

**Status:** Done (2026-04-27).

**Shipped**

- [`MomCard.tsx`](frontend/app/components/MomCard.tsx): visible phone, `tel` / `wa.me` / `mailto`, `lucide-react` icons, Hebrew `aria-label`s, “עוד” for email + remove.
- Column width [`w-72`](frontend/app/components/ActivityColumn.tsx) for card breathing room.

---

## Phase 4 — Visual polish

**Status:** Done (2026-04-27).

**Shipped**

- Terracotta **accent** palette (light/dark), `stone` neutrals, `motion-reduce:transition-none` on key UI, `focus-app` / `focus-visible:ring` patterns.
- Header and controls use `accent` instead of generic purple.

**Checks run:** `npm run build`, `npm run lint` in `frontend/`.

---

## Phase log

| Phase | Completed on | Notes |
|-------|----------------|-------|
| 1 | 2026-04-27 | Rubik RTL, tokens, lib helpers |
| 2 | 2026-04-27 | Full Hebrew copy + seed + `he-IL` + `v4` storage |
| 3 | 2026-04-27 | Mom card actions + Lucide |
| 4 | 2026-04-27 | Accent polish + motion/focus |

## Follow-ups (optional)

- Replace `eslint-disable` for `setState` in `useEffect` with `useSyncExternalStore` for `localStorage` if you want stricter React 19 patterns.
- Fine-tune inclusive language on call-to-action labels (e.g. התקשרי vs neutral).
- Add more `MomCard` actions by extending `buildLinkActions`.
