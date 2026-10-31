export type ParsedCommand = { name: string; args: string[]; error?: string };

/** Tokenize a small command language; shell operators have no special meaning. */
export function parseCommand(input: string): ParsedCommand {
  if (input.length > 256) return { name: "", args: [], error: "Keep commands under 256 characters." };
  const tokens: string[] = []; let token = "", quote = "", escaped = false, started = false;
  for (const char of input.trim()) {
    if (escaped) { token += char; escaped = false; started = true; continue; }
    if (char === "\\") { escaped = true; started = true; continue; }
    if (quote) { if (char === quote) quote = ""; else token += char; continue; }
    if (char === '"' || char === "'") { quote = char; started = true; continue; }
    if (/\s/.test(char)) { if (started) tokens.push(token); token = ""; started = false; }
    else { token += char; started = true; }
  }
  if (quote || escaped) return { name: "", args: [], error: "Finish the quote or escaped character, then try again." };
  if (started) tokens.push(token);
  return { name: (tokens.shift() ?? "").toLowerCase(), args: tokens };
}
