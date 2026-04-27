export function normalizeForWhatsApp(phone: string): string | null {
  const d = phone.replace(/\D/g, "");
  if (!d) return null;
  let n = d;
  if (n.startsWith("0")) n = "972" + n.slice(1);
  else if (!n.startsWith("972") && n.length === 9) n = "972" + n;
  return n.length >= 10 ? n : null;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}