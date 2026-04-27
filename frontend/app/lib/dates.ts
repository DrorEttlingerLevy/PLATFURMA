export function parseDDMMYYYY(s: string): Date | null {
  if (!s || s.length !== 8) return null;
  const d = parseInt(s.slice(0, 2), 10);
  const m = parseInt(s.slice(2, 4), 10) - 1;
  const y = parseInt(s.slice(4, 8), 10);
  if (isNaN(d) || isNaN(m) || isNaN(y)) return null;
  return new Date(y, m, d);
}

export function formatDateHeIL(ddmmyyyy: string): string {
  const d = parseDDMMYYYY(ddmmyyyy);
  if (!d) return ddmmyyyy;
  return d.toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "numeric" });
}