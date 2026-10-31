export const stampIds = ["star", "heart", "bolt"] as const;
export type StampId = typeof stampIds[number];
export type ContactFields = { name: string; email: string; message: string; stamp: StampId };
export type ContactPayload = ContactFields & { website: string; startedAt: number; requestId: string };
export type FieldErrors = Partial<Record<keyof ContactFields, string>>;
export const contactLimits = { name: 80, email: 254, message: 4000, bodyBytes: 18000 };
export function fieldErrors(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  if (fields.name.trim().length < 2 || fields.name.trim().length > contactLimits.name || /[\r\n\x00-\x1f\x7f]/.test(fields.name)) errors.name = "Use a name between 2 and 80 characters.";
  if (fields.email.length > contactLimits.email || !/^[^\s<>@\x00-\x1f\x7f]+@[^\s<>@\x00-\x1f\x7f]+\.[^\s<>@\x00-\x1f\x7f]+$/.test(fields.email.trim())) errors.email = "Enter a valid email address.";
  if (fields.message.trim().length < 10 || fields.message.length > contactLimits.message || /\x00/.test(fields.message)) errors.message = "Write between 10 and 4,000 characters.";
  if (!stampIds.includes(fields.stamp)) errors.stamp = "Choose one of the three stamps.";
  return errors;
}
export function validatePayload(value: unknown, now = Date.now()): { data?: ContactPayload; errors?: FieldErrors } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const v = value as Record<string, unknown>;
  if (typeof v.name !== "string" || typeof v.email !== "string" || typeof v.message !== "string" || typeof v.stamp !== "string" || typeof v.website !== "string" || typeof v.startedAt !== "number" || typeof v.requestId !== "string") return {};
  if (v.website !== "" || !Number.isFinite(v.startedAt) || now - v.startedAt < 1500 || now - v.startedAt > 86400000 || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v.requestId)) return {};
  const data: ContactPayload = { name:v.name.trim(), email:v.email.trim(), message:v.message, stamp:v.stamp as StampId, website:"", startedAt:v.startedAt, requestId:v.requestId };
  const errors = fieldErrors(data);
  return Object.keys(errors).length ? { errors } : { data };
}
