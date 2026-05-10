/**
 * Parses a comma-separated amenity string entered by the user into a clean array.
 * Returns undefined when the input is blank so callers can omit the field.
 */
export function parseAmenities(raw: string): string[] | undefined {
  const list = raw.split(',').map((s) => s.trim()).filter(Boolean);
  return list.length ? list : undefined;
}
