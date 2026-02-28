const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
};

const HTML_ESCAPE_REGEX = /[&<>"'/]/g;

export function sanitizeTextInput(input: string): string {
  return input.replace(HTML_ESCAPE_REGEX, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

export function sanitizeEmail(input: string): string {
  return input
    .normalize("NFKC")
    .toLowerCase()
    .trim();
}
