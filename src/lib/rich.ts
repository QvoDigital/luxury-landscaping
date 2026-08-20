export const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** "[text](href)" reduced to its text, for meta and structured data. */
export function plain(text: string): string {
  return text.replace(LINK, '$1');
}
