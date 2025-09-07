// src/utils/markdown.ts
export function ensureSafeMarkdown(text: string): string {
  // Match all occurrences of triple backticks
  const codeFenceCount = (text.match(/```/g) || []).length;

  // If the count is odd, append a closing triple backtick
  if (codeFenceCount % 2 !== 0) {
    return text + '\n```';
  }

  return text;
}