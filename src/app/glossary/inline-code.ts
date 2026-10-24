export interface TextPart {
  code: boolean;
  text: string;
}

/** Splits "Use `signal()` here" into text and code parts, so a template can render <code> safely. */
export function inlineCode(text: string): TextPart[] {
  return text
    .split('`')
    .map((part, index) => ({ code: index % 2 === 1, text: part }))
    .filter((part) => part.text);
}
