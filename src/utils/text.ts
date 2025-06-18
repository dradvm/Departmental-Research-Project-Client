export function getInitials(str: string): string {
  if (!str) return "";
  const words = str.trim().split(/\s+/);
  const len = words.length;
  if (len === 0) return "";
  if (len === 1) return words[0][0] || "";
  return words[len - 2][0] + words[len - 1][0];
}
