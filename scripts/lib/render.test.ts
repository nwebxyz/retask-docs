import { describe, it, expect } from 'vitest';
import { groupKey, groupTitle, renderAll, type Manifest } from './render';

const manifest: Manifest = {
  cli: 'retask',
  version: 'test',
  auth: { required_env: [], optional_env: [] },
  commands: [
    {
      command: 'retask auth login',
      description: 'Log in',
      example: 'retask auth login',
    },
    {
      command: 'retask auth pat create',
      description: 'Create PAT',
      flags: ['--name'],
      example: 'retask auth pat create --name x',
    },
    {
      command: 'retask task list',
      description: 'List tasks',
      example: 'retask task list',
    },
    {
      command: 'retask project-config get',
      description: 'Get config',
      example: 'retask project-config get <id>',
    },
  ],
};

describe('groupKey', () => {
  it('extracts the command group (token after retask)', () => {
    expect(groupKey('retask auth login')).toBe('auth');
    expect(groupKey('retask project-config get')).toBe('project-config');
    expect(groupKey('retask upgrade')).toBe('upgrade');
    expect(groupKey('retask')).toBe('misc');
  });
});

describe('groupTitle', () => {
  it('humanizes a group key', () => {
    expect(groupTitle('project-config')).toBe('Project config');
    expect(groupTitle('auth')).toBe('Auth');
  });
});

describe('renderAll', () => {
  it('groups commands by their group key', () => {
    const pages = renderAll(manifest);
    expect([...pages.keys()].sort()).toEqual([
      'auth',
      'project-config',
      'task',
    ]);
  });

  it('renders frontmatter, command heading, flags, and an example block', () => {
    const page = renderAll(manifest).get('auth')!;
    expect(page).toContain('title: Auth');
    expect(page).toContain('description: Auth commands for the Retask CLI.');
    expect(page).toContain('## `retask auth login`');
    expect(page).toContain('**Flags:** `--name`');
    expect(page).toContain('```bash');
    expect(page).toContain('retask auth pat create --name x');
  });

  it('marks each page as auto-generated', () => {
    const page = renderAll(manifest).get('task')!;
    expect(page).toContain('AUTO-GENERATED');
  });

  it('preserves manifest order of groups', () => {
    expect([...renderAll(manifest).keys()]).toEqual([
      'auth',
      'task',
      'project-config',
    ]);
  });

  it('omits the Flags line when a command has no flags', () => {
    const page = renderAll(manifest).get('task')!;
    expect(page).not.toContain('**Flags:**');
  });
});
