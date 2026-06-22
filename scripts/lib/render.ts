export interface CommandEntry {
  command: string;
  description: string;
  flags?: string[];
  example: string;
}

export interface Manifest {
  cli: string;
  version: string;
  auth: { required_env: string[]; optional_env: string[] };
  commands: CommandEntry[];
}

/** Group key = the token after "retask": "retask auth login" -> "auth". */
export function groupKey(command: string): string {
  const parts = command.trim().split(/\s+/);
  return parts[1] ?? 'misc';
}

/** "project-config" -> "Project config"; "auth" -> "Auth". */
export function groupTitle(key: string): string {
  const spaced = key.replace(/-/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function renderCommand(entry: CommandEntry): string {
  const lines: string[] = [`## \`${entry.command}\``, '', entry.description, ''];
  if (entry.flags && entry.flags.length > 0) {
    lines.push(`**Flags:** ${entry.flags.map((f) => `\`${f}\``).join(', ')}`, '');
  }
  lines.push('```bash', entry.example, '```');
  return lines.join('\n');
}

function renderPage(key: string, entries: CommandEntry[]): string {
  const title = groupTitle(key);
  const frontmatter = [
    '---',
    `title: ${title}`,
    `description: ${title} commands for the Retask CLI.`,
    '---',
    '',
    '<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `yarn gen:cli`. -->',
    '',
  ].join('\n');
  const body = entries.map(renderCommand).join('\n\n');
  return `${frontmatter}${body}\n`;
}

/** Build one markdown page per command group, preserving manifest order. */
export function renderAll(manifest: Manifest): Map<string, string> {
  const groups = new Map<string, CommandEntry[]>();
  for (const cmd of manifest.commands) {
    const key = groupKey(cmd.command);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(cmd);
  }
  const pages = new Map<string, string>();
  for (const [key, entries] of groups) {
    pages.set(key, renderPage(key, entries));
  }
  return pages;
}
